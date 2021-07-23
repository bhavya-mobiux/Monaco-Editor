import * as rpc from "@codingame/monaco-jsonrpc";
import * as server from "@codingame/monaco-jsonrpc/lib/server";
import * as lsp from "vscode-languageserver";
import * as fs from "fs";
import config from "./config";

var count = 0;
const ENABLE_LOGGING: boolean = false;

export function launch(socket: rpc.IWebSocket, languageId: string) {
  const languageDetails = config[languageId];

  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);

  const socketConnection = server.createConnection(reader, writer, () =>
    socket.dispose()
  );

  const serverConnection = server.createServerProcess(
    languageDetails.languageId,
    languageDetails.startLSCommand,
    []
  );

  server.forward(socketConnection, serverConnection, (message) => {
    // console.log("Message from client here: ", message);
    if (rpc.isRequestMessage(message)) {
      if (ENABLE_LOGGING) {
        if (count === 0) {
          if (fs.existsSync(languageDetails.logFile)) {
            fs.unlinkSync(languageDetails.logFile);
            count += 1;
          }
        }
        fs.appendFileSync(
          languageDetails.logFile,
          JSON.stringify(message) + "\n\n"
        );
      }

      if (message.method === lsp.InitializeRequest.type.method) {
        let initializeParams = message.params as lsp.InitializeParams;

        if (
          languageDetails.languageId === config.java.languageId ||
          languageDetails.languageId === config.c.languageId ||
          languageDetails.languageId === config.cpp.languageId
        ) {
          initializeParams.workspaceFolders = [config.java.workspace];
          initializeParams.rootUri = config.java.rootUri;
        }
        initializeParams.processId = process.pid;
      }
    }
    return message;
  });
}
