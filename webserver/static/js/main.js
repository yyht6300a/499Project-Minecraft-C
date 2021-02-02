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
    lesson3max = Object.keys(lesson3).length -1 ;

    lessonMax = [lesson1max , lesson2max, lesson3max];
}


// Main page
// Open lessons from main page
document.getElementById("lesson1").addEventListener('click', function() {
    currentLesson = 0;
    displayLessonData();
    showLessonPage();
});

document.getElementById("lesson2").addEventListener('click', function() {
    currentLesson = 1;
    displayLessonData();
    showLessonPage();
});

document.getElementById("lesson3").addEventListener('click', function() {
    currentLesson = 2;
    displayLessonData();
    showLessonPage();
});


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
    displayLessonData();
});


// Back button
document.getElementById("back").addEventListener('click', function() {
    playBtnClick();
    lessonPart[currentLesson]--;
    displayLessonData();
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
    // TODO: May need to change this to work with Yash's code, will see
    const response = await fetch("/runLesson", {
        method: "POST",
        body: editor.getValue()
    }); 
    // Wait for the code to come back
    const codeReturn = await response.text();

    var printReturn = codeReturn.replaceAll("\n","</br>");                
    //add a new line between each output

    // Set the text color back to white in case it was red due to an error
    document.getElementById("console").style.color = "white";  
    // Set text context of console
    document.getElementById("console").textContent = printReturn;  

    // Call fail if there is an error.
    if(codeReturn.includes("ERROR!")) {
        fail();
    } else {
        success();     // THIS IS JUST FOR TESTING. Only for testing next button
    }

});




// Network Functions
// Calls the flask server with a GET request using the built in fetch function
// TODO: Add some error handling
async function getJSONData(lesson) {
    // Default ERR in case of an error
    returnData = "ERR";

    await fetch("/lessonData" + lesson)
    .then(response => response.json())
    .then(lessonData => returnData = lessonData);

    return returnData;
}


// Sends back JSON lesson file to the server
async function sendJSONData() {
    await fetch("/lessonData" + String(currentLesson + 1), {
        method: "POST",
        body: JSON.stringify(lessons[currentLesson])
    });
}




// Helper functions
// Gets lesson data and inputs it into instructions element and into Monaco-editor
async function displayLessonData() {
    lesson = lessons[currentLesson];
    part = lessonPart[currentLesson];

    // Input data into editor and instructions area
    document.getElementById("instructions").textContent = lesson[part].instructions;
    editor.setValue(lesson[part].code);

    // Check if back or next buttons should be locked or not
    detectBackLock();
    detectNextLock();
}


// Btn click and CSS to bring up lesson page
function showLessonPage() {
    playBtnClick()
    document.getElementById("lesson-page").style.visibility = "visible";
    document.getElementById("lesson-page").style.opacity = "1";
    document.getElementById("lesson-page").style.top = "0px";
}


// Run when code is successful
async function success() {
    // Transition border and unlock next button
    document.getElementById("console").style.border = "3px solid #34aa2f";

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
    setTimeout(() => { document.getElementById("console").style.border = "3px solid black"; }, 1000)
    document.getElementById("console").style.color = "orangered";
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


// Just plays the button click sound
function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}


// Disables buttons
function lockBtn(btnID) {
    document.getElementById(btnID).classList.add("btn-locked");
}


// Unlocks buttons
function unlockBtn(btnID) {
    document.getElementById(btnID).classList.remove("btn-locked");
}