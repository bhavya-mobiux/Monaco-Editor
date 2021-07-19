const languages: { [key: string]: any } = {
  python: {
    languageId: "python",
    extensions: [".python"],
    mimetypes: ["application/x-python-code"],
    file: "inmemory:///model.py",
    startLSCommand: "pylsp",
    options: ["-v"],
    logFile:
      "/home/yamini/hirepro/Monaco-Editor/monaco-languageclient/example/log/log-python.txt",
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
      uri: "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src/",
    logFile:
      "/home/yamini/hirepro/Monaco-Editor/monaco-languageclient/example/log/log-java.txt",
  },
  c: {
    languageId: "c",
    extensions: [".c"],
    mimetypes: ["text/x-c"],
    file: "file:///main.c",
    startLSCommand: "ccls",
    options: [],
    workspace: {
      uri: "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src/",
    logFile:
      "/home/yamini/hirepro/Monaco-Editor/monaco-languageclient/example/log/log-c.txt",
  },
  cpp: {
    languageId: "cpp",
    extensions: [".cpp"],
    mimetypes: ["text/x-c"],
    file: "file:///main.cpp",
    startLSCommand: "ccls",
    options: [],
    workspace: {
      uri: "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src",
      name: "test",
    },
    rootUri:
      "file:///home/yamini/hirepro/jedi/monaco-languageclient/example/src/",
    logFile:
      "/home/yamini/hirepro/Monaco-Editor/monaco-languageclient/example/log/log-cpp.txt",
  },
};

export default languages;
