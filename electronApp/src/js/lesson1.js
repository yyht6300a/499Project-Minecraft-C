const path = require('path');
const fs = require('fs');
var pythonShell = require('python-shell');
const amdLoader = require('monaco-editor/min/vs/loader');
const { ppid } = require('process');
const amdRequire = amdLoader.require;

// SETUP

// Load lesson templates in variables

// Load in sample functions template
var sampleFunctions = 'error'
fs.readFile('src/lessonTemplates/sampleFunctions.py', (err, data) => { 
  if (err) 
    throw err; 
  
  sampleFunctions = data.toString();
}) 

// Load in python in game template
var pythonInGame = 'error'
fs.readFile('src/lessonTemplates/pythonInGame.py', (err, data) => { 
  if (err) 
    throw err; 
  
  pythonInGame = data.toString();
})

// Load in for loop text
var forLoopText='error'
fs.readFile('src/lessonTemplates/Gold_Digger_1.py', (err, data) => { 
  if (err) 
    throw err; 
  
  forLoopText = data.toString();
}) 

// Load in nested for loop template
var nestedForLoop = 'error'
fs.readFile('src/lessonTemplates/nestedForLoop.py', (err, data) => { 
  if (err) 
    throw err; 
  
  nestedForLoop = data.toString();
}) 

// Load in double for loop text
var doubleForLoopText='error'
fs.readFile('src/lessonTemplates/Gold_Digger_2.py', (err, data) => { 
  if (err) 
    throw err; 
  
  doubleForLoopText = data.toString();
}) 

// Load in answer
var answerText = 'error'
fs.readFile('src/lessonTemplates/lesson1.py', (err, data) => { 
  if (err) 
    throw err; 
  
 answerText = data.toString();
}) 

// Run the lesson templates, and store the outputs in variables

var pyShell = pythonShell.PythonShell;
var pyShell_2 = pythonShell.PythonShell;
var pyShell_3 = pythonShell.PythonShell;

let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
};

// Run for loop template
var forLoopOutputText='error'
pyShell_2.run("src/lessonTemplates/Gold_Digger_1.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  forLoopOutputText = results.join('\n');
  console.log(forLoopOutputText);
});

// Run nested for loop template
var nestedForLoopOutputText = 'error'
pyShell.run("src/lessonTemplates/nestedForLoop.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  nestedForLoopOutputText = results.join('\n');
  console.log(nestedForLoopOutputText);
});

// Run double for loop template
var doubleForLoopOutputText='error'
pyShell_3.run("src/lessonTemplates/Gold_Digger_2.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  doubleForLoopOutputText = results.join('\n');
  console.log(doubleForLoopOutputText);
});

// Create the code editors, outputs, and run buttons

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

amdRequire(['vs/editor/editor.main'], function () {
  // Sample functions (not interactive)
  sampleFunc = monaco.editor.create(document.getElementById('intro-funcs'), {
    value: sampleFunctions,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });

  // Nested for loop code editor
  nestedForLoopEditor = monaco.editor.create(document.getElementById('nestedLoopEditor'), {
    value: nestedForLoop,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });

  // Nested for loop output
  nestedForLoopOutput = monaco.editor.create(document.getElementById('nestedLoopOutput'), {
    value: nestedForLoopOutputText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });

  // Nested for loop run button
  document.getElementById("nestedLoopRun").addEventListener('click', function(e) {
    e.preventDefault();

    pyShell.runString(nestedForLoopEditor.getValue(), options, function (err, results) {
      if (err) 
        throw err;
        
      // results is an array consisting of messages collected during execution
      nestedForLoopOutputText = results.join('\n');
      console.log(nestedForLoopOutputText);
      nestedForLoopOutput.setValue(nestedForLoopOutputText);
    });
  });

  // Python in game code editor (not interactive)
  pythonInGameEditor = monaco.editor.create(document.getElementById('pythonInGame'), {
    value: pythonInGame,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });

  codeEnv_2 = monaco.editor.create(document.getElementById('coding-environment_2'), {
    value: forLoopText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }

    
  });
  
  output_2 = monaco.editor.create(document.getElementById('output_2'), {
    value: forLoopOutputText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });


  document.getElementById("run_2").addEventListener('click', function(e) {
    e.preventDefault();

    pyShell_2.runString(codeEnv_2.getValue(), options, function (err, results) {
      if (err) 
        throw err;
        
      // results is an array consisting of messages collected during execution
      forLoopOutputText = results.join('\n');
      console.log(forLoopOutputText);
      output_2.setValue(forLoopOutputText);
    });
  });


  codeEnv_3 = monaco.editor.create(document.getElementById('coding-environment_3'), {
    value: doubleForLoopText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }

    
  });
  
  output_3 = monaco.editor.create(document.getElementById('output_3'), {
    value: doubleForLoopOutputText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });


  document.getElementById("run_3").addEventListener('click', function(e) {
    e.preventDefault();

    pyShell_3.runString(codeEnv_3.getValue(), options, function (err, results) {
      if (err) 
        throw err;
        
      // results is an array consisting of messages collected during execution
      doubleForLoopOutputText = results.join('\n');
      console.log(doubleForLoopOutputText);
      output_3.setValue(doubleForLoopOutputText);
    });
  });

  // Answer editor
  answerEditor = monaco.editor.create(document.getElementById('answerEditor'), {
    value: answerText,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  });
});








