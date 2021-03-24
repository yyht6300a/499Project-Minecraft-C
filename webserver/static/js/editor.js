// Global variables
var lessons;

// This store the max lessons -1 in a lesson, index matches lesson
let lessonMax;

// Keep track of current lesson
var currentLesson;

// These store this session's current lesson part, index matching to lesson
var lessonPart = [0, 0, 0];

// Comms object
comms = new Comms();

// Run on load
window.onload = load();

async function load() {
    // Load in lessons 
    lesson1 = await getJSONData(1);
    lesson2 = await getJSONData(2);
    lesson3 = await getJSONData(3);

    lessons = [lesson1, lesson2, lesson3];

    // Set their max value to global vars
    lesson1max = Object.keys(lesson1).length - 1;
    lesson2max = Object.keys(lesson2).length - 1;
    lesson3max = Object.keys(lesson3).length - 1;

    lessonMax = [lesson1max , lesson2max, lesson3max];
}

// Code for editor
// Start the monaco-editor
var editor = 0;
require.config({ paths: { vs: '../static/node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: ['def hello():', '\tprint("Hello world!");'].join('\n'),
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: {
            enabled: false
        }
    });
});

// Go back to homepage button
document.getElementById("homepage").addEventListener('click', function() {
    playBtnClick();
    document.getElementById("lesson-page").style.visibility = "hidden";
    document.getElementById("lesson-page").style.opacity = "0";
    document.getElementById("lesson-page").style.top = "40%";
});


// Next button
document.getElementById("next").addEventListener('click', function() {
    playBtnClick();
    lessonPart[currentLesson]++;

    //clean console and graph when button is clicked
    document.getElementById("console-text-area").innerHTML = ""
    document.getElementById("console").style.border = "0px solid black";
    document.getElementById("agentTNT").style.visibility = "hidden";
    document.getElementById("graph").innerHTML = "";
    displayLessonData();
});


// Back button
document.getElementById("back").addEventListener('click', function() {
    playBtnClick();
    lessonPart[currentLesson]--;

    //clean console when button is clicked
    document.getElementById("console-text-area").innerHTML =""
    document.getElementById("console").style.border = "0px solid black";
    document.getElementById("agentTNT").style.visibility = "hidden";
    document.getElementById("graph").innerHTML = "";
    displayLessonData();
});


//  Bring up reset pane
document.getElementById("reset").addEventListener('click', function() {
    playBtnClick();

    document.getElementById("reset-pane").style.visibility = "visible";
    document.getElementById("reset-pane").style.backgroundColor = "rgba(0, 0, 0, 0.8)";

    document.getElementById("reset-info").style.visibility = "visible";
    document.getElementById("reset-info").style.opacity = "1";
    document.getElementById("reset-info").style.top = "0px";
});

// Reset confirm button
document.getElementById("reset-confirm").addEventListener('click', function() {
    playBtnClick();

    // Reset code back to starter code

    try {
        lesson = lessons[currentLesson];
        part = lessonPart[currentLesson];
        lesson[part].code = lesson[part].starterCode
        sendJSONData();
    } catch (error) {
        console.log(error)
    }
    
    document.getElementById("reset-pane").style.visibility = "hidden";
    document.getElementById("reset-pane").style.backgroundColor = "rgba(0, 0, 0, 0)";

    document.getElementById("reset-info").style.visibility = "hidden";
    document.getElementById("reset-info").style.opacity = "0";
    document.getElementById("reset-info").style.top = "30%";

    displayLessonData();
});

document.getElementById("reset-deny").addEventListener('click', function() {
    playBtnClick();

    document.getElementById("reset-pane").style.visibility = "hidden";
    document.getElementById("reset-pane").style.backgroundColor = "rgba(0, 0, 0, 0)";

    document.getElementById("reset-info").style.visibility = "hidden";
    document.getElementById("reset-info").style.opacity = "0";
    document.getElementById("reset-info").style.top = "30%";
});

// Run button
document.getElementById("run").addEventListener('click', async function() {
    playBtnClick();

    // Save code in JSON and send that back to the server
    lesson = lessons[currentLesson];
    part = lessonPart[currentLesson];
    lesson[part].code = editor.getValue();
    sendJSONData();


    // Run the code
    // Send monaco editor value to server
    const response = await fetch("/runLesson", {
        method: "POST",
        body: editor.getValue()
    }); 
    // Wait for the code and console output to come back
    const serverReturn = await response.json();
    console.log(serverReturn);

    // Store console output in codeReturn
    const codeReturn = serverReturn.consoleOutput;

    var printReturn = codeReturn.replace(/\n/g,"</br>");       
    //add a new line between each output

    // Set the text color back to white in case it was red due to an error
    document.getElementById("console-text-area").style.color = "white";  

    var image=""
    //check if current part have a plot 
    if (lesson[part].haveplot===true){
        image="<img src='./static/img/matplot/temp.png' class='relative'/></br>"
    }
    //read the graph from matplot folder
    /*
    
    Note  for read image to the console you need to do following steps
    1. in lesson.json file, for example: if you want to print in Lesson 1 part 2 then in the second object change 
    have plot=true
    
    2.in the coding part always use
    plt.savefig("./static/img/matplot/temp.png", bbox_inches='tight')
    plt.clf()
    instead of plt.show()

    */
    
    // Set text context of console
    document.getElementById("console-text-area").innerHTML = printReturn;
    document.getElementById("graph").innerHTML = image;
      

    // Call fail if there is an error.
    if(codeReturn.includes("ERROR!")) {
        fail();
    } else {
        runCommands(serverReturn.commands)  // THIS IS JUST FOR TESTING. Only for testing sending commands to game
        success();                          // THIS IS JUST FOR TESTING. Only for testing next button
    }
});


// This function takes in a list of Minecraft Education Commands
// It then queues them into the comms.QueueCommand function
function runCommands(cmds) {
    cmds.forEach(cmd => comms.queueCommand(cmd, cmdRan));
}

// This is just to satisfy comms.queueCommand 2nd param requirement
function cmdRan() {
    console.log("Command sent to game!");
}

// Gets lesson data and inputs it into instructions element and into Monaco-editor
async function displayLessonData() {
    lesson = lessons[currentLesson];
    part = lessonPart[currentLesson];


    // Input data into editor and instructions area
    document.getElementById("instructions").innerHTML = lesson[part].instructions;
    editor.setValue(lesson[part].code);

    // Check if back or next buttons should be locked or not
    detectBackLock();
    detectNextLock();
}


// Run when code is successful
async function success() {
    // Transition border and unlock next button
    document.getElementById("console").style.border = "3px solid #34aa2f";
    document.getElementById("agentTNT").src = "../static/img/agent.png";
    document.getElementById("agentTNT").style.visibility = "visible";

    // Unlock next button
    lesson = lessons[currentLesson];
    part = lessonPart[currentLesson];
    lesson[part].nextLocked = false;

    detectNextLock();

    // Save that to the JSON file to remember for the future
    sendJSONData();
}


// Run when code fails
function fail() {
    document.getElementById("console").style.border = "3px solid orangered";
    document.getElementById("agentTNT").src = "../static/img/tnt.png";
    document.getElementById("agentTNT").style.visibility = "visible";
    setTimeout(() => { document.getElementById("console").style.border = "3px solid black"; }, 1000)
    document.getElementById("console-text-area").style.color = "orangered";
}


// Will check if back button should be locked, and if so, lock/unlock it.
function detectBackLock() {
    // If first part of the lesson, lock back. Else, unlock it
    if(lessonPart[currentLesson] == 0)
        lockBtn("back");
    else
        unlockBtn("back");
}


// Will check if next button should be locked, and if so, lock/unlock it.
function detectNextLock() {
    lesson = lessons[currentLesson];
    part = lessonPart[currentLesson];

    // If next is unlocked in JSON, AND, not the last part of the lesson, then unlock next
    if(lesson[part].nextLocked == false && part != lessonMax[currentLesson]) 
        unlockBtn("next")
    else 
        lockBtn("next")
    
}