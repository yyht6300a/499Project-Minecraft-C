const path = require('path');
const fs = require('fs');
var pythonShell = require('python-shell');
const amdLoader = require('monaco-editor/min/vs/loader');
const amdRequire = amdLoader.require;
var codeEnv = '';
var output = '';


// SETUP

// Load in lesson
var lessonText = 'error'
fs.readFile('src/lessonTemplates/lesson1.py', (err, data) => { 
  if (err) 
    throw err; 
  
  lessonText = data.toString();
}) 

// Run lesson code
var pyShell = pythonShell.PythonShell;
var outputText = 'error'

let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
};

pyShell.run("src/lessonTemplates/lesson1.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  outputText = results.join('\n');
  console.log(outputText);
});


// Setup for code editor
function uriFromPath(_path) {
  var pathName = path.resolve(_path).replace(/\\/g, '/');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = '/' + pathName;
  }
  return encodeURI('file://' + pathName);
}

amdRequire.config({
  baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;

// Code editor
amdRequire(['vs/editor/editor.main'], function () {
  // Coding environment
  codeEnv = monaco.editor.create(document.getElementById('coding-environment'), {
    value: lessonText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });
  
  // Code output (may not be required)
  output = monaco.editor.create(document.getElementById('output'), {
    value: outputText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });

  // Running the code with the 'run' button
  document.getElementById("run").addEventListener('click', function(e) {
    e.preventDefault();

    pyShell.runString(codeEnv.getValue(), options, function (err, results) {
      if (err) 
        throw err;
        
      // results is an array consisting of messages collected during execution
      outputText = results.join('\n');
      console.log(outputText);
      output.setValue(outputText);
    });

  });
});