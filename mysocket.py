import socket
from lsp import Connection, NEED_DATA, DataReceived, MessageEnd
import os
import json


f = open("example.py")
file_contents = f.read()

print(file_contents)

sock = socket.socket()

sock.connect(("127.0.0.1", 3000))
conn = Connection("client")


answer = input("Send request?(y/n)")

count = 1


while answer == "y":
    # use connection send_json method to convert json object to bytes
    data = None
    if count == 1:
        data = {"jsonrpc": "2.0", "method": "initialize", "params": {"capabilities": {"textDocument": {"completion": {"completionItem": {"documentationFormat": ["plaintext"]}}}, "workspace": {
        }}, "processId": os.getpid(), "rootUri": "file:///Users/bhavyababuta/Desktop/jedi", "trace": "off"}, "id": 0}
    elif count == 3:
        data = {"jsonrpc": "2.0", "method": "textDocument/didOpen", "params": {"textDocument": {"languageId": "python","uri":"file:///Users/bhavyababuta/Desktop/jedi/example.py",
                                                                                                "text": file_contents, "version": 2}}}
    elif count == 2:
        data = {"jsonrpc": "2.0", "method": "textDocument/completion", "params": {"position": {"character": 4,
                                                                                               "line": 2}, "textDocument": {"uri": "file:///Users/bhavyababuta/Desktop/jedi/example.py"}}, "id": 43}

    request_data = conn.send_json(data)
    count += 1
    
    # then we can send data to server
    sock.sendall(request_data)

    while True:
        # and then we can get next_event of connection, it can indicate
        # that what should we do.
        event = conn.next_event()
        # we need to receive data from server
        if event is NEED_DATA:
            try:
                data = sock.recv(1024)
            except ConnectionResetError:
                print('The server connection is closed, So I will leave:)')
                conn.close()
                sock.close()
                exit(0)
            else:
                print("return from sock.recv")
                conn.receive(data)
        # we have receive data from server
        elif isinstance(event, DataReceived):
            print("Receive event, content:")
            print(event)
        elif isinstance(event, MessageEnd):
            print("Server sending data complete.")
            break

    # then we can call get_received_data() to extract out what we get
    header, response_body = conn.get_received_data()
    print("Response header from server:")
    print(header)
    print("Response body from server:")
    print(response_body)
    print(response_body.keys())
    if 'result' in response_body.keys() and "items" in response_body["result"].keys() :
        
        print("Items {}: ".format(response_body["result"]["items"]))
        with open('response.json', 'w') as outfile:
            json.dump({"items":response_body["result"]["items"]}, outfile)
        for i in response_body["result"]["items"]:
            print(i["insertText"])
    answer = input("Send request?(y/n)")
    conn.go_next_circle()
