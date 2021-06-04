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
const editorModel: monaco.editor.ITextModel = monaco.editor.createModel(
  value,
  "python",
  monaco.Uri.parse("immemory://model.python")
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

function handleMonacoContentChange(event: any) {
  let action = null;
  if (event.changes[0].text === "\n") {
    // Insert new line
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
}

a.onDidChangeModelContent((event: any) => {
  const data = handleMonacoContentChange(event);
  allEvents.push(data);
});

// Code to Playback Events

// function playbackEvents(i: number) {
//   i === 0 &&
//     a.setPosition({
//       column: allEvents[i].delta.start.column,
//       lineNumber: allEvents[i].delta.start.row,
//     });
//   if (
//     allEvents[i].action === "insert" &&
//     allEvents[i].delta.lines.join("") === "\n"
//   ) {
//     a.trigger(null, "type", { text: "\n" });
//   } else if (allEvents[i].action === "remove") {
//     // a.trigger("keyboard", "deleteLeft", null);
//     let lineContent = editorModel.getLineContent(allEvents[i].delta.start.row);
//     console.log(
//       `Content at line ${allEvents[i].delta.end.row}: ${lineContent}`
//     );
//     lineContent = lineContent.substring(0, lineContent.length - 1);
//     console.log(
//       `New Content at line ${allEvents[i].delta.end.row}:  ${lineContent}`
//     );
//     a.executeEdits("my-source", [
//       {
//         range: new monaco.Range(
//           allEvents[i].delta.start.row,
//           1,
//           allEvents[i].delta.start.row,
//           lineContent.length + 1
//         ),
//         text: lineContent,
//       },
//     ]);
//   } else {
//     a.setPosition({
//       column: allEvents[i].delta.end.column,
//       lineNumber: allEvents[i].delta.end.row,
//     });
//     a.trigger("keyboard", "type", {
//       text: allEvents[i].delta.lines.join(""),
//     });
//   }
// }

// for (var i = 0; i < allEvents.length; i++) {
//   playbackEvents(i);
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
