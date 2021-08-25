const languages: { [key: string]: any } = {
  python: {
    languageId: "python",
    extensions: [".python"],
    mimetypes: ["application/x-python-code"],
    file: "inmemory:///model.py",
    startLSCommand: "pylsp",
    options: ["-v"],
    logFile: "../log/log-python.txt",
    snippet: `# Python Program to find the area of triangle

    a = 5
    b = 6
    c = 7
    
    # Uncomment below to take inputs from the user
    # a = float(input('Enter first side: '))
    # b = float(input('Enter second side: '))
    # c = float(input('Enter third side: '))
    
    # calculate the semi-perimeter
    s = (a + b + c) / 2
    
    # calculate the area
    area = (s*(s-a)*(s-b)*(s-c)) ** 0.5`,
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
    logFile: "../log/log-java.txt",
    snippet: `class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!"); 
        }
    }`,
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
    logFile: "../log/log-c.txt",
    snippet: `#include <stdio.h>
    int main() {
       // printf() displays the string inside quotation
       printf("Hello, World!");
       return 0;
    }`,
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
    logFile: "../log/log-cpp.txt",
    snippet: `#include <iostream>

    int main() {
        std::cout << "Hello World!";
        return 0;
    }`,
  },
};

export default languages;
