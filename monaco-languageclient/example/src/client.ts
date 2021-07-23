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

//declare gobal
declare global {
  interface Window {
    __monaco: any;
    __monacoInstanceCreated: any;
    __selectedLanguage?: string;
    __loadEditor: any;
  }
}

let monacoInstance: any;
let LANGUAGE_ID: string;

//assigning __monaco key in window
window.__monaco = window.__monaco || monaco || null;

let webSocket: WebSocket | null = null;

const createEditorInstanse = (selectedLanguage: string) =>
  new Promise<string>((resolve, reject) => {
    console.log(`selectedLanguage ${selectedLanguage}`);
    if (!selectedLanguage) {
      reject("Please providde language");
    }

    window.__selectedLanguage === selectedLanguage
      ? reject("Language Id already selected")
      : (window.__selectedLanguage = selectedLanguage);

    let languageDetails = CONFIG[selectedLanguage];
    console.log("Language details here: ", languageDetails);

    // register Monaco languages
    LANGUAGE_ID = languageDetails.languageId;
    let FILE_NAME = languageDetails.file;

    monaco.languages.register({
      id: LANGUAGE_ID,
      extensions: languageDetails.extensions,
      mimetypes: languageDetails.mimetypes,
    });

    // create Monaco editor
    const value = languageDetails.snippet;
    const editorModel: monaco.editor.ITextModel = monaco.editor.createModel(
      value,
      LANGUAGE_ID, //java||python||c||cpp||go||js
      monaco.Uri.parse(FILE_NAME) // file for monaco editor
    );

    // If the monacoInstance is not present create a new monaco instance else set the new model with new language details
    if (!monacoInstance) {
      monacoInstance = monaco.editor.create(
        document.getElementById("container")!,
        {
          model: editorModel,
          glyphMargin: true,
          lightbulb: {
            enabled: true,
          },
        }
      );
    } else {
      monacoInstance.setModel(editorModel);
    }

    //assigning __monacoInstanceCreated key in window
    window.__monacoInstanceCreated =
      window.__monacoInstanceCreated || monacoInstance || null;
    resolve("Instance created");
  });

const OnLoadEditor = function (selectedLanguage: string) {
  createEditorInstanse(selectedLanguage)
    .then(() => {
      // // onchange handler of Editor
      // monacoInstance.onDidChangeModelContent((event: any) => {
      //   const data = handleMonacoContentChange(event);
      //   allEvents.push(data);
      // });

      // If the websocket is present and open close the socket connection
      webSocket?.OPEN && webSocket.close();

      const url = createUrl(`/sampleServer?language=${selectedLanguage}`);
      console.log("Connecting to websocket: ", url);

      webSocket = createWebSocket(url);

      // listen when the web socket is opened
      listen({
        webSocket,
        onConnection: (connection) => {
          // create and start the language client
          const languageClient = createLanguageClient(connection, LANGUAGE_ID);
          const disposable = languageClient.start();
          connection.onClose(() => disposable.dispose());
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//assigning __monacoInstanceCreated key in window
window.__loadEditor = window.__loadEditor || OnLoadEditor || null;

//call for loading editor
window.__loadEditor("python");

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
  return normalizeUrl(
    `${protocol}://${location.host}${location.pathname}${path}`
  );

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
