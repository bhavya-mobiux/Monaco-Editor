const languages: { [key: string]: any } = {
  "c": {
    "languageId": "c",
    "extensions": [
      ".c"
    ],
    "mimetypes": [
      "text/x-c"
    ],
    "file": "file:///main.c",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-c.txt",
    "snippet": "#include<stdio.h>\r\n\r\nint main()\r\n{\r\n  \r\n    return 0;\r\n}"
  },
  "cpp": {
    "languageId": "cpp",
    "extensions": [
      ".cpp"
    ],
    "mimetypes": [
      "text/x-c"
    ],
    "file": "file:///main.cpp",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-cpp.txt",
    "snippet": "#include <iostream>\n\nint main() {\n    // Read input from STDIN; write output to STDOUT.\n\n    return 0;\n}"
  },
  "java": {
    "languageId": "java",
    "extensions": [
      ".java"
    ],
    "mimetypes": [
      "text/x-java-source"
    ],
    "file": "file:///hello.java",
    "startLSCommand": "/Users/bhavyababuta/Downloads/java-language-server-master/dist/lang_server_mac.sh",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-java.txt",
    "snippet": "import java.io.*;\n\npublic class TestClass {\n    public static void main(String[] args) {\n        // Read input from STDIN; write output to STDOUT.\n\n    }\n}"
  },
  "java8": {
    "languageId": "java",
    "extensions": [
      ".java"
    ],
    "mimetypes": [
      "text/x-java-source"
    ],
    "file": "file:///hello.java",
    "startLSCommand": "/Users/bhavyababuta/Downloads/java-language-server-master/dist/lang_server_mac.sh",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-java.txt",
    "snippet": "import java.io.*;\n\npublic class TestClass {\n    public static void main(String[] args) {\n        // Read input from STDIN; write output to STDOUT.\n\n    }\n}"
  },
  "python": {
    "languageId": "python",
    "extensions": [
      ".python"
    ],
    "mimetypes": [
      "application/x-python-code"
    ],
    "file": "inmemory:///model.py",
    "startLSCommand": "pylsp",
    "options": [
      "-v"
    ],
    "logFile": "../log/log-python.txt",
    "snippet": "def main():\n    # Please add your code inside this function. \n    # Read input from STDIN; write output to STDOUT.\n\n    pass\n\n\nmain()\n"
  },
  "python3": {
    "languageId": "python",
    "extensions": [
      ".python"
    ],
    "mimetypes": [
      "application/x-python-code"
    ],
    "file": "inmemory:///model.py",
    "startLSCommand": "pylsp",
    "options": [
      "-v"
    ],
    "logFile": "../log/log-python.txt",
    "snippet": "def main():\r\n    # WRITE YOUR CODE HERE.\r\n    # Read input from STDIN; write output to STDOUT.\r\n\r\n    pass\r\n\r\n\r\nmain()"
  },
  "js": {
    "languageId": "js",
    "extensions": ['.js'],
    "mimetypes": ['text/javascript'],
    "file": "file:///app.js",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-js.txt",
    "snippet": "// Read input from STDIN; write output to STDOUT.\n\n"
  },
  "bash": {
    "languageId": "bash",
    "extensions": ['.sh'],
    "mimetypes": ['application/x-sh'],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-bash.txt",
    "snippet": "# Read input from STDIN; write output to STDOUT.\n\n"
  },
  "php": {
    "languageId": "php",
    "extensions": ['.php'],
    "mimetypes": ['application/x-httpd-php'],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-php.txt",
    "snippet": "<?php\n/* Read input from STDIN; write output to STDOUT. */\n\n?>"
  },
  "go": {
    "languageId": "go",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-go.txt",
    "snippet": "package main\n\nfunc main() {\n    // Read input from STDIN; write output to STDOUT.\n\n}"
  },
  "d": {
    "languageId": "d",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-d.txt",
    "snippet": "import std.stdio;\n\nvoid main() {\n    /* Read input from STDIN; write output to STDOUT. */\n\n}"
  },
  "ruby": {
    "languageId": "ruby",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-ruby.txt",
    "snippet": "# Read input from STDIN; write output to STDOUT.\n\n"
  },
  "perl": {
    "languageId": "perl",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-perl.txt",
    "snippet": "# Read input from STDIN; write output to STDOUT.\n\n"
  },
  "csharp": {
    "languageId": "csharp",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-csharp.txt",
    "snippet": "using System;\n\npublic class TestClass {\n    public static void Main() {\n        /* Read input from STDIN; write output to STDOUT. */\n\n    }\n}"
  },
  "scala": {
    "languageId": "scala",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-scala.txt",
    "snippet": "object TestClass extends App {\n    def main() {\n        /* Read input from STDIN; write output to STDOUT. */\n\n    }\n}"
  },
  "fsharp": {
    "languageId": "fsharp",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-fsharp.txt",
    "snippet": "open System\n\n[<EntryPoint>]\nlet main args =\n    /// Read input from STDIN; write output to STDOUT.\n\n    0"
  },
  "rust": {
    "languageId": "rust",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-rust.txt",
    "snippet": "fn main() {\n    // Read input from STDIN; write output to STDOUT.\n\n}"
  },
  "erlang": {
    "languageId": "erlang",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-erlang.txt",
    "snippet": ""
  },
  "r": {
    "languageId": "r",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-r.txt",
    "snippet": ""
  },
  "haskell": {
    "languageId": "haskell",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-haskell.txt",
    "snippet": ""
  },
  "octave": {
    "languageId": "octave",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-octave.txt",
    "snippet": ""
  },
  "groovy": {
    "languageId": "groovy",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-groovy.txt",
    "snippet": ""
  },
  "vb.net": {
    "languageId": "vb.net",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-vb.net.txt",
    "snippet": ""
  },
  "java11": {
    "languageId": "java",
    "extensions": [
      ".java"
    ],
    "mimetypes": [
      "text/x-java-source"
    ],
    "file": "file:///hello.java",
    "startLSCommand": "/Users/bhavyababuta/Downloads/java-language-server-master/dist/lang_server_mac.sh",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-java.txt",
    "snippet": "import java.io.*;\n\npublic class TestClass {\n    public static void main(String[] args) {\n        // Read input from STDIN; write output to STDOUT.\n\n    }\n}"
  },
  "java15": {
    "languageId": "java",
    "extensions": [
      ".java"
    ],
    "mimetypes": [
      "text/x-java-source"
    ],
    "file": "file:///hello.java",
    "startLSCommand": "/Users/bhavyababuta/Downloads/java-language-server-master/dist/lang_server_mac.sh",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-java.txt",
    "snippet": "import java.io.*;\n\npublic class TestClass {\n    public static void main(String[] args) {\n        // Read input from STDIN; write output to STDOUT.\n\n    }\n}"
  },
  "gawk": {
    "languageId": "gawk",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-gawk.txt",
    "snippet": ""
  },
  "mawk": {
    "languageId": "mawk",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-mawk.txt",
    "snippet": ""
  },
  "brainfk": {
    "languageId": "brainfk",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-brainfk.txt",
    "snippet": ""
  },
  "cobol": {
    "languageId": "cobol",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-cobol.txt",
    "snippet": ""
  },
  "clojure": {
    "languageId": "clojure",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-clojure.txt",
    "snippet": ""
  },
  "clisp": {
    "languageId": "clisp",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-clisp.txt",
    "snippet": ""
  },
  "kotlin": {
    "languageId": "kotlin",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-kotlin.txt",
    "snippet": ""
  },
  "lua": {
    "languageId": "lua",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-lua.txt",
    "snippet": ""
  },
  "objective-c": {
    "languageId": "objective-c",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-objective-c.txt",
    "snippet": ""
  },
  "sed": {
    "languageId": "sed",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-sed.txt",
    "snippet": ""
  },
  "swift": {
    "languageId": "swift",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-swift.txt",
    "snippet": "sample swift At tenant {}"
  },
  "tcl": {
    "languageId": "tcl",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-tcl.txt",
    "snippet": ""
  },
  "typescirpt": {
    "languageId": "typescirpt",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-typescirpt.txt",
    "snippet": ""
  },
  "pypy": {
    "languageId": "pypy",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-pypy.txt",
    "snippet": ""
  },
  "pypy3": {
    "languageId": "pypy3",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-pypy3.txt",
    "snippet": ""
  },
  "verilog": {
    "languageId": "verilog",
    "extensions": [],
    "mimetypes": [],
    "file": "file:///",
    "startLSCommand": "ccls",
    "options": [],
    "workspace": {
      "uri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src",
      "name": "test"
    },
    "rootUri": "file:///home/konduru/hirepro/repo/Monaco-Editor/monaco-languageclient/example/src/",
    "logFile": "../log/log-verilog.txt",
    "snippet": ""
  }
};

export default languages;
