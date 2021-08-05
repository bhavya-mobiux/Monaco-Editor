const languages: { [key: string]: any } = {
  python: {
    languageId: "python",
    extensions: [".python"],
    mimetypes: ["application/x-python-code"],
    file: "inmemory:///model.py",
    startLSCommand: "pylsp",
    options: ["-v"],
    logFile: "../log/log-python.txt",
    snippet: `# Program to display the Fibonacci sequence up to n-th term

    nterms = int(input("How many terms? "))
    
    # first two terms
    n1, n2 = 0, 1
    count = 0
    
    # check if the number of terms is valid
    if nterms <= 0:
       print("Please enter a positive integer")
    # if there is only one term, return n1
    elif nterms == 1:
       print("Fibonacci sequence upto",nterms,":")
       print(n1)
    # generate fibonacci sequence
    else:
       print("Fibonacci sequence:")
       while count < nterms:
           print(n1)
           nth = n1 + n2
           # update values
           n1 = n2
           n2 = nth
           count += 1 \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
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
