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

// register Monaco languages
monaco.languages.register({
  id: "python",
  extensions: [".python"],
  mimetypes: ["application/x-python-code"],
});

// create Monaco editor
const value = `a = 10`;
const a = monaco.editor.create(document.getElementById("container")!, {
  model: monaco.editor.createModel(
    value,
    "python",
    monaco.Uri.parse("immemory://model.python")
  ),
  glyphMargin: true,
  lightbulb: {
    enabled: true,
  },
});

// a.onDidChangeModelContent((event: any) => {
//   console.log(JSON.stringify(event.changes));
//   console.log("Text: ", event.changes[0].text);

//   let action = null;
//   if (event.changes[0].text === "\n") {
//     // Insert new line
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
//   console.log(
//     JSON.stringify({
//       action,
//       delta: {
//         lines:
//           event.changes[0].text.length > 0
//             ? event.changes[0].text.split("\n")
//             : event.changes[0].text,
//         start: {
//           row: event.changes[0].range.startLineNumber,
//           column: event.changes[0].range.startColumn,
//         },
//         end: {
//           row: event.changes[0].range.endLineNumber,
//           column: event.changes[0].range.endColumn,
//         },
//       },
//     })
//   );
// });

// var line = a.getPosition();

console.log(a);

// install Monaco language client services
MonacoServices.install(monaco);

// create the web socket
const url = createUrl("/sampleServer");

console.log("URL here: ", url);
const webSocket = createWebSocket(url);

// listen when the web socket is opened
listen({
  webSocket,
  onConnection: (connection) => {
    // create and start the language client
    const languageClient = createLanguageClient(connection);
    const disposable = languageClient.start();
    connection.onClose(() => disposable.dispose());
  },
});

function createLanguageClient(
  connection: MessageConnection
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ["python"],
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
