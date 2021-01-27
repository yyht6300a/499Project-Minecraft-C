// Global variables
// Keep track of current lesson
var currentLesson = 0;

// These store this session's current lesson part
var lesson1Part = 0;
var lesson2Part = 0;
var lesson3Part = 0;

// These store the max lessons -1 in a lesson
let lesson1max = 4;
let lesson2max = 6;
let lesosn3max = 3;


// Main page
// Open lessons from main page
document.getElementById("lesson1").addEventListener('click', function() {
    currentLesson = 1;
    displayLessonData(1, lesson1Part);
    showLessonPage();

    if(lesson1Part == 0) 
        disableBtn("back")
});

document.getElementById("lesson2").addEventListener('click', function() {
    currentLesson = 2;
    displayLessonData(2, lesson2Part);
    showLessonPage();

    if(lesson1Part == 0) 
        disableBtn("back")
});

document.getElementById("lesson3").addEventListener('click', function() {
    currentLesson = 3;
    displayLessonData(3, lesson3Part);
    showLessonPage();

    if(lesson1Part == 0) 
        disableBtn("back")
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


// Run button
document.getElementById("run").addEventListener('click', async function() {
    playBtnClick();

    // This should be turned into a function later
    // Lesson data might be turned into a global variable
    // Save the code
    switch(currentLesson) {
        case 1:
            lessonData = await getJSONData(1);
            lessonData[lesson1Part].code = editor.getValue()
            setJSONData(1, lessonData)
            break;
        case 2:
            lessonData = await getJSONData(2);
            lessonData[lesson1Part].code = editor.getValue()
            setJSONData(2, lessonData)
            break;
        case 3:
            lessonData = await getJSONData(3);
            lessonData[lesson1Part].code = editor.getValue()
            setJSONData(3, lessonData)
            break;

    }

    // Run the code
    const response = await fetch("/runLesson", {method: "POST", body: editor.getValue()});  // Send monaco editor value to server
    const codeReturn = await response.text();                      // Wait for the code to come back
    

    document.getElementById("console").style.color = "white";      // Set the text color back to white in case it was red due to an error
    document.getElementById("console").textContent = codeReturn;   // Set text context of console

    // Call fail if there is an error.
    if(codeReturn.includes("ERROR!")) {
        fail();
    }

    success(currentLesson, lesson1Part);     // THIS IS JUST FOR TESTING. Only for testing next button

});


// Next button
// TODO: Make sure lesson part can't go past the the last part
// NOTE: Not thorougly tested
document.getElementById("next").addEventListener('click', function() {
    playBtnClick();

    switch(currentLesson) {
        case 1:
            lesson1Part += 1;
            displayLessonData(currentLesson, lesson1Part);

            unlockBtn("back");
            if(lesson1Part >= lesson1max) disableBtn("next")

            break;
        case 2:
            lesson2Part += 1;
            displayLessonData(currentLesson, lesson2Part);

            unlockBtn("back");
            if(lesson2Part >= lesson2max) disableBtn("next")

            break;
        case 3:
            lesson3Part += 1;
            displayLessonData(currentLesson, lesson3Part);

            unlockBtn("back");
            if(lesson2Part >= lesson2max) disableBtn("next")

            break;
    }
});

// Back button
// NOTE: Not thoroughly tested
document.getElementById("back").addEventListener('click', function() {
    playBtnClick();

    switch(currentLesson) {
        case 1:
            lesson1Part -= 1;
            displayLessonData(currentLesson, lesson1Part);

            if(lesson1Part == 0) disableBtn("back");

            break;
        case 2:
            lesson2Part -= 1;
            displayLessonData(currentLesson, lesson2Part);

            if(lesson2Part == 0) disableBtn("back");

            break;
        case 3:
            lesson3Part -= 1;
            displayLessonData(currentLesson, lesson3Part);

            if(lesson3Part == 0) disableBtn("back");

            break;
    }
});

// Helper functions

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
async function setJSONData(lesson, data) {
    await fetch("/lessonData" + String(lesson), {method: "POST", body: JSON.stringify(data)});
    console.log("POST Request Sent")
}


// Gets lesson data and inputs it into instructions element and into Monaco-editor
async function displayLessonData(lesson, part) {
    // Get the data from the server
    var lessonData = await getJSONData(lesson);  
    // Input it into the instructions and editor fields
    document.getElementById("instructions").textContent = lessonData[part].instructions;
    editor.setValue(lessonData[part].code);

    // Check to see if next button should be locked or not
    if(lessonData[part].nextLocked == false)
        unlockBtn("next")
    else
        disableBtn("next")
}


// Btn click and CSS to bring up lesson page
function showLessonPage() {
    playBtnClick()
    document.getElementById("lesson-page").style.visibility = "visible";
    document.getElementById("lesson-page").style.opacity = "1";
    document.getElementById("lesson-page").style.top = "0px";
}


// Run when code is successful
async function success(lesson, part) {
    // Transition border and unlock next button
    document.getElementById("console").style.border = "3px solid #34aa2f";

    // Set next button as unlocked in JSON file to remember in the future
    var lessonData = await getJSONData(lesson);
    lessonData[part].nextLocked = false;

    // Check if next button should be unlocked or not
    switch(lesson) {
        case 1:
            if(lesson1Part >= lesson1max) 
                disableBtn("next")
            else
                unlockBtn("next")
            
            break;
        case 2:
            if(lesson1Part >= lesson1max) 
                disableBtn("next")
            else
                unlockBtn("next")
        
             break;
        case 3:
            if(lesson1Part >= lesson1max) 
                disableBtn("next")
            else
                unlockBtn("next")
        
            break;
    }

    // Save that to the JSON file
    setJSONData(lesson, lessonData);
}


// Run when code fails
function fail() {
    document.getElementById("console").style.border = "3px solid orangered";
    setTimeout(() => { document.getElementById("console").style.border = "3px solid black"; }, 1000)
    document.getElementById("console").style.color = "orangered";
}


// Just plays the button click sound
function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}


// Disables buttons
function disableBtn(btnID) {
    document.getElementById(btnID).classList.add("btn-locked");
}


// Unlocks buttons
function unlockBtn(btnID) {
    document.getElementById(btnID).classList.remove("btn-locked");
}