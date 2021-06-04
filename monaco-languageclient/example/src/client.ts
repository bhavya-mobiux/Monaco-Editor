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

let allEvents: AssessEvent[] = [
  {
    action: "insert",
    delta: {
      lines: ["\n"],
      start: { row: 1, column: 7 },
      end: { row: 1, column: 7 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["p"],
      start: { row: 2, column: 1 },
      end: { row: 2, column: 1 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["r"],
      start: { row: 2, column: 2 },
      end: { row: 2, column: 2 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["i"],
      start: { row: 2, column: 3 },
      end: { row: 2, column: 3 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["n"],
      start: { row: 2, column: 4 },
      end: { row: 2, column: 4 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["t"],
      start: { row: 2, column: 5 },
      end: { row: 2, column: 5 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["("],
      start: { row: 2, column: 6 },
      end: { row: 2, column: 6 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [")"],
      start: { row: 2, column: 7 },
      end: { row: 2, column: 7 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ['"'],
      start: { row: 2, column: 7 },
      end: { row: 2, column: 7 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ['"'],
      start: { row: 2, column: 8 },
      end: { row: 2, column: 8 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["H"],
      start: { row: 2, column: 8 },
      end: { row: 2, column: 8 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["e"],
      start: { row: 2, column: 9 },
      end: { row: 2, column: 9 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["l"],
      start: { row: 2, column: 10 },
      end: { row: 2, column: 10 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["l"],
      start: { row: 2, column: 11 },
      end: { row: 2, column: 11 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["o"],
      start: { row: 2, column: 12 },
      end: { row: 2, column: 12 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [" "],
      start: { row: 2, column: 13 },
      end: { row: 2, column: 13 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["B"],
      start: { row: 2, column: 14 },
      end: { row: 2, column: 14 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["h"],
      start: { row: 2, column: 15 },
      end: { row: 2, column: 15 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["a"],
      start: { row: 2, column: 16 },
      end: { row: 2, column: 16 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["v"],
      start: { row: 2, column: 17 },
      end: { row: 2, column: 17 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["y"],
      start: { row: 2, column: 18 },
      end: { row: 2, column: 18 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["a"],
      start: { row: 2, column: 19 },
      end: { row: 2, column: 19 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 2, column: 21 },
      end: { row: 2, column: 22 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 2, column: 20 },
      end: { row: 2, column: 21 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 2, column: 19 },
      end: { row: 2, column: 20 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 2, column: 18 },
      end: { row: 2, column: 19 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["y"],
      start: { row: 2, column: 18 },
      end: { row: 2, column: 18 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["a"],
      start: { row: 2, column: 19 },
      end: { row: 2, column: 19 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ['"'],
      start: { row: 2, column: 20 },
      end: { row: 2, column: 20 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [")"],
      start: { row: 2, column: 21 },
      end: { row: 2, column: 21 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["\n"],
      start: { row: 2, column: 22 },
      end: { row: 2, column: 22 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["\n"],
      start: { row: 3, column: 1 },
      end: { row: 3, column: 1 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["a"],
      start: { row: 4, column: 1 },
      end: { row: 4, column: 1 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [" "],
      start: { row: 4, column: 2 },
      end: { row: 4, column: 2 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["="],
      start: { row: 4, column: 3 },
      end: { row: 4, column: 3 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [" "],
      start: { row: 4, column: 4 },
      end: { row: 4, column: 4 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 4, column: 4 },
      end: { row: 4, column: 5 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 4, column: 3 },
      end: { row: 4, column: 4 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 4, column: 2 },
      end: { row: 4, column: 3 },
    },
  },
  {
    action: "remove",
    delta: {
      lines: "",
      start: { row: 4, column: 1 },
      end: { row: 4, column: 2 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["b"],
      start: { row: 4, column: 1 },
      end: { row: 4, column: 1 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [" "],
      start: { row: 4, column: 2 },
      end: { row: 4, column: 2 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["="],
      start: { row: 4, column: 3 },
      end: { row: 4, column: 3 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [" "],
      start: { row: 4, column: 4 },
      end: { row: 4, column: 4 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["2"],
      start: { row: 4, column: 5 },
      end: { row: 4, column: 5 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["0"],
      start: { row: 4, column: 6 },
      end: { row: 4, column: 6 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["\n"],
      start: { row: 4, column: 7 },
      end: { row: 4, column: 7 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["p"],
      start: { row: 5, column: 1 },
      end: { row: 5, column: 1 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["r"],
      start: { row: 5, column: 2 },
      end: { row: 5, column: 2 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["i"],
      start: { row: 5, column: 3 },
      end: { row: 5, column: 3 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["n"],
      start: { row: 5, column: 4 },
      end: { row: 5, column: 4 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["t"],
      start: { row: 5, column: 5 },
      end: { row: 5, column: 5 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["("],
      start: { row: 5, column: 6 },
      end: { row: 5, column: 6 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["b"],
      start: { row: 5, column: 7 },
      end: { row: 5, column: 7 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: [")"],
      start: { row: 5, column: 8 },
      end: { row: 5, column: 8 },
    },
  },
  {
    action: "insert",
    delta: {
      lines: ["\n"],
      start: { row: 5, column: 9 },
      end: { row: 5, column: 9 },
    },
  },
];

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

// Code to Playback Events

const setCursorPosition = (lineNumber: number, column: number) =>
  a.setPosition({
    lineNumber,
    column,
  });

const playbackEvent = (i: number) => {
  const { action, delta } = allEvents[i];
  const { start, end, lines } = delta;

  i === 0 && setCursorPosition(start.row, start.column);

  if (action === "insert" && lines.join("") === "\n") {
    a.trigger(null, "type", { text: "\n" });
  } else if (action === "remove") {
    let lineContent = editorModel.getLineContent(start.row);
    console.log(`Content at line ${end.row}: ${lineContent}`);
    lineContent = lineContent.substring(0, lineContent.length - 1);
    console.log(`New Content at line ${end.row}:  ${lineContent}`);
    a.executeEdits("my-source", [
      {
        range: new monaco.Range(
          start.row,
          1,
          start.row,
          lineContent.length + 1
        ),
        text: lineContent,
      },
    ]);
  } else {
    setCursorPosition(start.row, start.column);
    a.trigger("keyboard", "type", {
      text: lines.join(""),
    });
  }
};

for (var i = 0; i < allEvents.length; i++) {
  playbackEvent(i);
}

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
