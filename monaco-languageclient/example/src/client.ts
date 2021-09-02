import { listen } from "@codingame/monaco-jsonrpc";
import * as monaco from "monaco-editor-core";
import {
  MonacoLanguageClient,
  MessageConnection,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection,
} from "monaco-languageclient";
import normalizeUrl = require("normalize-url");
const ReconnectingWebSocket = require("reconnecting-websocket");
import CONFIG from "./config";
import { EDITOR_CONFIG } from "./editor-configs";

//declare gobal
declare global {
  interface Window {
    __monaco: any;
    __monacoInstanceCreated: any;
    __selectedLanguage?: string;
    __loadEditor: any;
  }
}

//assigning __monaco key in window
window.__monaco = window.__monaco || monaco || null;

interface editorConfig {
  selectedLanguage?: string;
  disableCopyPaste?: boolean | false;
  enableAutoComplete?: boolean | false;
  modifiedCodeSnippet?: string;
  disableAutocompleteHelp?: boolean | false;
}

let monacoInstance: any;
let LANGUAGE_ID: string;
let monacoModel: monaco.editor.ITextModel;
let enableEditorAutoComplete: boolean;

let webSocket: WebSocket;

const registerLanguagesWithMonaco = () => {
  const supportedLanguages = Object.keys(CONFIG);
  for (var i = 0; i < supportedLanguages.length; i++) {
    const { languageId } = CONFIG[supportedLanguages[i]];
    monaco.languages.register({
      id: languageId
    });
    monaco.languages.setLanguageConfiguration(languageId, {
      surroundingPairs: EDITOR_CONFIG.SURROUNDING_PAIRS,
      autoClosingPairs: EDITOR_CONFIG.AUTO_CLOSING_PAIRS,
    });
  }
};

const createEditorInstanse = ({
  selectedLanguage,
  disableCopyPaste,
  enableAutoComplete,
  modifiedCodeSnippet,
  disableAutocompleteHelp
}: editorConfig) =>
  new Promise<string>((resolve, reject) => {
    //console.log(`selectedLanguage ${selectedLanguage} ${disableCopyPaste} ${enableAutoComplete} ${modifiedCodeSnippet}`);
    if (!selectedLanguage) {
      monaco.editor.create(
        document.getElementById("hirepro-monaco-container")!,
        {
          theme: 'vs-dark',
          model: null,
          glyphMargin: true,
          lightbulb: {
            enabled: true,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          minimap: {
            enabled: false
          },
          overviewRulerLanes: 0,
          readOnly: false
        }
      );
      return resolve("instanse created without model");
    }
    window.__selectedLanguage === selectedLanguage
      ? reject("Language Id already selected")
      : (window.__selectedLanguage = selectedLanguage);

    let languageDetails = CONFIG[selectedLanguage];

    // register Monaco languages
    const { languageId, snippet, file } = languageDetails;

    LANGUAGE_ID = languageId;
    let FILE_NAME = file;

    const codeSnippet = modifiedCodeSnippet ? modifiedCodeSnippet : snippet;
    // If the monaco editor is already present dispose of the editor first before creating a new one
    monacoModel && monacoModel.dispose();

    // create Monaco monacoModel
    monacoModel = monaco.editor.createModel(
      codeSnippet,
      LANGUAGE_ID, //java||python||c||cpp||go||js
      monaco.Uri.parse(FILE_NAME) // file for monaco editor
    );

    // If the monacoInstance is not present create a new monaco instance else set the new model with new language details
    if (!monacoInstance) {
      monacoInstance = monaco.editor.create(
        document.getElementById("hirepro-monaco-container")!,
        {
          theme: 'vs-dark',
          model: monacoModel,
          glyphMargin: true,
          lightbulb: {
            enabled: true,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          minimap: {
            enabled: false
          },
          overviewRulerLanes: 0,
          readOnly: false
        }
      );

      if (enableAutoComplete === false) {
        const disableAutoCompleteStyle = document.createElement("style");
        disableAutoCompleteStyle.textContent = `.suggest-widget{display:none !important}`;
        document.head.append(disableAutoCompleteStyle);
      }

      if (disableCopyPaste) {
        monacoInstance.onKeyDown((event: any) => {
          const { keyCode, ctrlKey, metaKey } = event;
          if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
            event.preventDefault();
          }
        });
      }
      if (disableAutocompleteHelp) {
        monacoInstance.updateOptions({
          parameterHints: {
            enabled: false
          },
        });
      }
    } else {
      monacoInstance.setModel(monacoModel);
    }

    //assigning __monacoInstanceCreated key in window
    window.__monacoInstanceCreated =
      window.__monacoInstanceCreated || monacoInstance || null;
    resolve("Instance created");
  });

// listen when the web socket is opened
const listenToWebSocketOpening = () => {
  listen({
    webSocket,
    onConnection: (connection) => {
      // create and start the language client
      const languageClient = createLanguageClient(connection, LANGUAGE_ID);
      const disposable = languageClient.start();
      connection.onClose(() => disposable.dispose());
    },
  });
};

function createWebSocket(url: string): WebSocket {
  const socketOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  };
  return new ReconnectingWebSocket(url, [], socketOptions);
}

const OnLoadEditor = function ({
  selectedLanguage = '',
  disableCopyPaste = false,
  enableAutoComplete = true,
  modifiedCodeSnippet,
  disableAutocompleteHelp = false }: editorConfig) {
  enableEditorAutoComplete = enableAutoComplete;
  createEditorInstanse({
    selectedLanguage,
    disableCopyPaste,
    enableAutoComplete,
    modifiedCodeSnippet,
    disableAutocompleteHelp
  })
    .then(() => {

      // If the websocket is present and open close the socket connection
      if (selectedLanguage) {
        const url = createUrl(`/sampleServer`);
        webSocket = createWebSocket(url);
        listenToWebSocketOpening();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//assigning __loadEditor key in window
window.__loadEditor = window.__loadEditor || OnLoadEditor || null;

// install Monaco language client services
MonacoServices.install(monaco);

function createLanguageClient(
  connection: MessageConnection,
  LANGUAGE_ID: string
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",

    clientOptions: {
      // use a language id as a document selector
      documentSelector: [LANGUAGE_ID],
      // disable the default error handler
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart,
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        return Promise.resolve(
          createConnection(connection, errorHandler, closeHandler)
        );
      },
    },
  });
}

function createUrl(path: string): string {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  let socketUrl: string;
  socketUrl = normalizeUrl(
    `${protocol}://${location.host}${location.pathname}${path}?language=${LANGUAGE_ID}&enableAutoComplete=${enableEditorAutoComplete}`
  );

  //for local ngnix
  // const port = 8000;
  // socketUrl = normalizeUrl(`${protocol}://${location.host}:${port}${path}?language=${LANGUAGE_ID}&enableAutoComplete=${enableEditorAutoComplete}`);
  // console.log("URL here: ", socketUrl);
  return socketUrl;
}


const init = () => {
  registerLanguagesWithMonaco();
  //createEditorInstanse({ selectedLanguage: "python", enableAutoComplete: true }).then(() => { });
  window.__loadEditor({});
};

init();
