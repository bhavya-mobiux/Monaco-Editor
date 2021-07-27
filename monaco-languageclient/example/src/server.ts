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
const server = app.listen(8000);
// create the web socket
const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});

let numberOfConnections = 0;
let language: string;
let enableAutoComplete: boolean = true;

server.on(
  "upgrade",
  (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
    const query: any = request.url ? url.parse(request.url).query : undefined;
    const pathname = request.url ? url.parse(request.url).pathname : undefined;
    console.log(`------------------------------------------- ${query}`);
    if (query) {
      const queryStringParameters = new url.URLSearchParams(query);
      if (String(queryStringParameters.get("language")).length > 0) {
        language = String(queryStringParameters.get("language"));
        console.log("Lanugage here: ", language);
      }
      if (
        Boolean(queryStringParameters.get("enableAutoComplete")) === true ||
        Boolean(queryStringParameters.get("enableAutoComplete")) === false
      ) {
        enableAutoComplete =
          Boolean(queryStringParameters.get("enableAutoComplete")) === true;
      }
    }

    if (pathname === "/sampleServer") {
      wss.handleUpgrade(request, socket, head, (webSocket) => {
        const socket: rpc.IWebSocket = {
          send: (content) => {
            // console.log("Response from language server: ", content);
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
            `Web socket is already started, number of connection after adding: ${++numberOfConnections}`
          );
          launch(socket, language, enableAutoComplete);
        } else {
          webSocket.on("open", () =>
            launch(socket, language, enableAutoComplete)
          );
        }
      });
    }
  }
);
