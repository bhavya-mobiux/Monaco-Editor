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
import { TEST_CONFIG } from "./test-config";

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

let monacoInstance: any;
let LANGUAGE_ID: string = "python";
let monacoModel: monaco.editor.ITextModel;

let webSocket: WebSocket;

const registerLanguagesWithMonaco = () => {
  const supportedLanguages = Object.keys(CONFIG);
  for (var i = 0; i < supportedLanguages.length; i++) {
    const { languageId, extensions, mimetypes } = CONFIG[supportedLanguages[i]];
    monaco.languages.register({
      id: languageId,
      extensions,
      mimetypes,
    });
  }
};

const createEditorInstanse = (selectedLanguage: string) =>
  new Promise<string>((resolve, reject) => {
    !selectedLanguage && reject("Please providde language");

    window.__selectedLanguage === selectedLanguage
      ? reject("Language Id already selected")
      : (window.__selectedLanguage = selectedLanguage);

    let languageDetails = CONFIG[selectedLanguage];

    // register Monaco languages
    const { languageId, snippet, file } = languageDetails;

    LANGUAGE_ID = languageId;
    let FILE_NAME = file;

    // If the monaco editor is already present dispose of the editor first before creating a new one
    monacoModel && monacoModel.dispose();

    // monaco.getMo

    // create Monaco monacoModel
    monacoModel = monaco.editor.createModel(
      snippet,
      LANGUAGE_ID, //java||python||c||cpp||go||js
      monaco.Uri.parse(FILE_NAME) // file for monaco editor
    );

    // If the monacoInstance is not present create a new monaco instance else set the new model with new language details
    if (!monacoInstance) {
      monacoInstance = monaco.editor.create(
        document.getElementById("container")!,
        {
          model: monacoModel,
          glyphMargin: true,
          lightbulb: {
            enabled: true,
          },
        }
      );

      if (TEST_CONFIG.ENABLE_AUTOCOMPLETE === false) {
        const disableAutoCompleteStyle = document.createElement("style");
        disableAutoCompleteStyle.textContent = `.suggest-widget{display:none !important}`;
        document.head.append(disableAutoCompleteStyle);
      }
      if (TEST_CONFIG.ENABLE_COPY_PASTE === false) {
        monacoInstance.onKeyDown((event: any) => {
          const { keyCode, ctrlKey, metaKey } = event;
          if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
            event.preventDefault();
          }
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

// Running the default python language server
const url = createUrl(`/sampleServer`);
webSocket = createWebSocket(url);
listenToWebSocketOpening();

function createUrl(path: string): string {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  const socketUrl = normalizeUrl(
    `${protocol}://${location.host}${location.pathname}${path}?language=${LANGUAGE_ID}&enableAutoComplete=${TEST_CONFIG.ENABLE_AUTOCOMPLETE}`
  );
  console.log("URL here: ", socketUrl);

  return socketUrl;

  //for local ngnix
  // const port = 8000;
  // return normalizeUrl(`${protocol}://${location.host}:${port}${path}`);
}

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

const OnLoadEditor = function (selectedLanguage: string) {
  createEditorInstanse(selectedLanguage)
    .then(() => {
      // If the websocket is present and open close the socket connection
      const url = createUrl(`/sampleServer`);
      webSocket = createWebSocket(url);
      listenToWebSocketOpening();
    })
    .catch((error) => {
      console.log(error);
    });
};

//assigning __monacoInstanceCreated key in window
window.__loadEditor = window.__loadEditor || OnLoadEditor || null;

//call for loading editor
// window.__loadEditor("python");

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

const init = () => {
  registerLanguagesWithMonaco();
  createEditorInstanse("python").then(() => {});
};

init();

// interface AssessEvent {
//   action: string | null;
//   delta: {
//     lines: any;
//     start: { row: any; column: any };
//     end: { row: any; column: any };
//   };
// }

//let allEvents: AssessEvent[] = [];

// const handleMonacoContentChange = (event: any) => {
//   let action = null;
//   if (event.changes[0].text === "\n") {
//     // New line inserted
//     action = "insert";
//   } else if (event.changes[0].text === "") {
//     action = "remove";
//   } else if (
//     event.changes[0].range.startColumn === event.changes[0].range.endColumn
//   ) {
//     action = "insert";
//   } else if (
//     event.changes[0].range.endColumn > event.changes[0].range.startColumn
//   ) {
//     action = "remove";
//   }
//   const retval = {
//     action,
//     delta: {
//       lines:
//         event.changes[0].text.length > 0
//           ? event.changes[0].text.split("\n")
//           : event.changes[0].text,
//       start: {
//         row: event.changes[0].range.startLineNumber,
//         column: event.changes[0].range.startColumn,
//       },
//       end: {
//         row: event.changes[0].range.endLineNumber,
//         column: event.changes[0].range.endColumn,
//       },
//     },
//   };
//   return retval;
// };
