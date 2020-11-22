const path = require('path');
const fs = require('fs');
var pythonShell = require('python-shell');
const amdLoader = require('monaco-editor/min/vs/loader');
const { ppid } = require('process');
const amdRequire = amdLoader.require;
var codeEnv = '';
var output = '';

// SETUP

// Start server
var serverShell = pythonShell.PythonShell;



let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
};

serverShell.run("src/connection.py", options, function(err, results) {
  if (err)
    throw err;
  
  console.log("Server is running!")
  console.log(results)
});


// Load in lesson
var lessonText = 'error'
fs.readFile('src/lessonTemplates/lesson1.py', (err, data) => { 
  if (err) 
    throw err; 
  
  lessonText = data.toString();
}) 
// Run lesson code


var lessonText_2='error'
fs.readFile('src/lessonTemplates/Gold_Digger_1.py', (err, data) => { 
  if (err) 
    throw err; 
  
  lessonText_2 = data.toString();
}) 

var lessonText_3='error'
fs.readFile('src/lessonTemplates/Gold_Digger_2.py', (err, data) => { 
  if (err) 
    throw err; 
  
  lessonText_3 = data.toString();
}) 


var pyShell = pythonShell.PythonShell;
var pyShell_2 = pythonShell.PythonShell;
var pyShell_3 = pythonShell.PythonShell;

var outputText = 'error'


pyShell.run("src/lessonTemplates/lesson1.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  outputText = results.join('\n');
  console.log(outputText);
});


var outputText_2='error'
pyShell_2.run("src/lessonTemplates/Gold_Digger_1.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  outputText_2 = results.join('\n');
  console.log(outputText_2);
});

var outputText_3='error'
pyShell_3.run("src/lessonTemplates/Gold_Digger_2.py", options, function (err, results) {
  if (err) 
    throw err;
    
  // results is an array consisting of messages collected during execution
  outputText_3 = results.join('\n');
  console.log(outputText_3);
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






  codeEnv_2 = monaco.editor.create(document.getElementById('coding-environment_2'), {
    value: lessonText_2,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }

    
  });
  
  output_2 = monaco.editor.create(document.getElementById('output_2'), {
    value: outputText_2,
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
      outputText_2 = results.join('\n');
      console.log(outputText_2);
      output_2.setValue(outputText_2);
    });
  });




  codeEnv_3 = monaco.editor.create(document.getElementById('coding-environment_3'), {
    value: lessonText_3,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    }

    
  });
  
  output_3 = monaco.editor.create(document.getElementById('output_3'), {
    value: outputText_3,
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
      outputText_3 = results.join('\n');
      console.log(outputText_3);
      output_3.setValue(outputText_3);
    });
  });



});








