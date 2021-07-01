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

const languageDetails = CONFIG.python;

// register Monaco languages
const LANGUAGE_ID = languageDetails.languageId;
const EXTENSIONS = languageDetails.extensions;
const MIMETYPES = languageDetails.mimetypes;
const FILE_NAME = languageDetails.file;

monaco.languages.register({
  id: LANGUAGE_ID,
  extensions: EXTENSIONS,
  mimetypes: MIMETYPES,
});

// create Monaco editor
const value = `public static void main(){}`;

const editorModel: monaco.editor.ITextModel = monaco.editor.createModel(
  value,
  LANGUAGE_ID, //java||python||c||cpp||go||js
  monaco.Uri.parse(FILE_NAME) // file for monaco editor
);

const a = monaco.editor.create(document.getElementById("container")!, {
  model: editorModel,
  glyphMargin: true,
  lightbulb: {
    enabled: true,
  },
});

interface AssessEvent {
  action: string | null;
  delta: {
    lines: any;
    start: { row: any; column: any };
    end: { row: any; column: any };
  };
}

let allEvents: AssessEvent[] = [];

const handleMonacoContentChange = (event: any) => {
  let action = null;
  if (event.changes[0].text === "\n") {
    // New line inserted
    action = "insert";
  } else if (event.changes[0].text === "") {
    action = "remove";
  } else if (
    event.changes[0].range.startColumn === event.changes[0].range.endColumn
  ) {
    action = "insert";
  } else if (
    event.changes[0].range.endColumn > event.changes[0].range.startColumn
  ) {
    action = "remove";
  }
  const retval = {
    action,
    delta: {
      lines:
        event.changes[0].text.length > 0
          ? event.changes[0].text.split("\n")
          : event.changes[0].text,
      start: {
        row: event.changes[0].range.startLineNumber,
        column: event.changes[0].range.startColumn,
      },
      end: {
        row: event.changes[0].range.endLineNumber,
        column: event.changes[0].range.endColumn,
      },
    },
  };
  return retval;
};

a.onDidChangeModelContent((event: any) => {
  const data = handleMonacoContentChange(event);
  allEvents.push(data);
});

// // Code to Playback Events

// const setCursorPosition = (lineNumber: number, column: number) =>
//   a.setPosition({
//     lineNumber,
//     column,
//   });

// const playbackEvent = (i: number) => {
//   const { action, delta } = allEvents[i];
//   const { start, end, lines } = delta;

//   i === 0 && setCursorPosition(start.row, start.column);

//   if (action === "insert" && lines.join("") === "\n") {
//     a.trigger(null, "type", { text: "\n" });
//   } else if (action === "remove") {
//     let lineContent = editorModel.getLineContent(start.row);
//     console.log(`Content at line ${end.row}: ${lineContent}`);
//     lineContent = lineContent.substring(0, lineContent.length - 1);
//     console.log(`New Content at line ${end.row}:  ${lineContent}`);
//     a.executeEdits("my-source", [
//       {
//         range: new monaco.Range(
//           start.row,
//           1,
//           start.row,
//           lineContent.length + 1
//         ),
//         text: lineContent,
//       },
//     ]);
//   } else {
//     setCursorPosition(start.row, start.column);
//     a.trigger("keyboard", "type", {
//       text: lines.join(""),
//     });
//   }
// };

// for (var i = 0; i < allEvents.length; i++) {
//   playbackEvent(i);
// }

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
