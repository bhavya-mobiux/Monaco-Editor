/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as ws from "ws";
import * as http from "http";
import * as url from "url";
import * as net from "net";
import * as express from "express";
import * as rpc from "@codingame/monaco-jsonrpc";
import { launch } from "./json-server-launcher";

process.on("uncaughtException", function (err: any) {
  console.error("Uncaught Exception: ", err.toString());
  if (err.stack) {
    console.error(err.stack);
  }
});

// create the express application
const app = express();
// server the static content, i.e. index.html
app.use(express.static(__dirname));
// start the server
const server = app.listen(3000);
// create the web socket
const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});

let numberOfConnections = 0;

server.on(
  "upgrade",
  (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
    const pathname = request.url ? url.parse(request.url).pathname : undefined;
    if (pathname === "/sampleServer") {
      wss.handleUpgrade(request, socket, head, (webSocket) => {
        const socket: rpc.IWebSocket = {
          send: (content) => {
            console.log("Content here: ", content);
            webSocket.send(content, (error) => {
              if (error) {
                console.log("Error here: ", error);
                throw error;
              }
            });
          },
          onMessage: (cb) => webSocket.on("message", cb),
          onError: (cb) => webSocket.on("error", cb),
          onClose: (cb) => webSocket.on("close", cb),
          dispose: () => webSocket.close(),
        };
        // launch the server when the web socket is opened
        if (webSocket.readyState === webSocket.OPEN) {
          console.log(
            `Web socket is already started, number of connection after adding: ${numberOfConnections}`
          );

          numberOfConnections++;
          launch(socket);
        } else {
          webSocket.on("open", () => launch(socket));
        }
      });
    }
  }
);
