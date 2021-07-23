export default {
  python: {
    languageId: "python",
    extensions: [".python"],
    mimetypes: ["application/x-python-code"],
    file: "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src/example.py",
    startLSCommand: "pylsp",
    options: ["-v"],
    logFile:
      "/Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/log/log-python.txt",
  },
  java: {
    languageId: "java",
    extensions: [".java"],
    mimetypes: ["text/x-java-source"],
    file: "file:///hello.java",
    startLSCommand:
      "/Users/bhavyababuta/Downloads/java-language-server-master/dist/lang_server_mac.sh",
    options: [],
    workspace: {
      uri: "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src/",
    logFile:
      "/Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/log/log-java.txt",
  },
  c: {
    languageId: "c",
    extensions: [".c"],
    mimetypes: ["text/x-c"],
    file: "file:///main.c",
    startLSCommand: "ccls",
    options: [],
    workspace: {
      uri: "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src/",
    logFile:
      "/Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/log/log-c.txt",
  },
  cpp: {
    languageId: "cpp",
    extensions: [".cpp"],
    mimetypes: ["text/x-c"],
    file: "file:///main.cpp",
    startLSCommand: "ccls",
    options: [],
    workspace: {
      uri: "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/src/",
    logFile:
      "/Users/bhavyababuta/Desktop/jedi/monaco-languageclient/example/log/log-cpp.txt",
  },
};
