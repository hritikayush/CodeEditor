const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyParser.json());
app.use(
  "/codemirror-5.65.16",
  express.static(
    "C:/Users/20051/OneDrive/Desktop/online_compilerP/codemirror-5.65.16"
  )
);
app.get("/", function (req, res) {
  // compiler.flush(function () {
  //   console.log("deleted");
  // });
  res.sendFile("C:/Users/20051/OneDrive/Desktop/online_compilerP/index.html");
});
app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "c++") {
      if (!input) {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        //if windows
        var envData = { OS: "windows" };
        //else
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});

app.listen(8000);
