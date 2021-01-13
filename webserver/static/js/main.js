// Main page
// Open lessons from main page
var lesson1Part = 0;
document.getElementById("lesson1").addEventListener('click', function() {
    setLessonData(1, lesson1Part);
    showLessonPage();
});

var lesson2Part = 0;
document.getElementById("lesson2").addEventListener('click', function() {
    setLessonData(2, lesson2Part);
    showLessonPage();
});

var lesson3Part = 0;
document.getElementById("lesson3").addEventListener('click', function() {
    setLessonData(3, lesson3Part);
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

document.getElementById("run").addEventListener('click', async function() {
    playBtnClick();

    const response = await fetch("/runLesson", {method: "POST", body: editor.getValue()});
    const codeReturn = await response.text();

    document.getElementById("console").textContent = codeReturn;
});

// Go back to homepage button
document.getElementById("homepage").addEventListener('click', function() {
    playBtnClick();
    document.getElementById("lesson-page").style.visibility="hidden";
    document.getElementById("lesson-page").style.opacity="0";
    document.getElementById("lesson-page").style.top="40%";
});

document.getElementById("next").addEventListener('click', function() {
    playBtnClick();
    console.log("next");
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

// Sends back JSON lesson file to the
async function setJSONData(lesson, data) {
    await fetch("/lessonData" + String(lesson), {method: "POST", body: JSON.stringify(data)});
}

// Gets lesson data and inputs it into instructions element and into Monaco-editor
async function setLessonData(lesson, part) {
    // Get the data from the server
    var lessonData = await getJSONData(lesson);  
    // Input it into the instructions and editor fields
    document.getElementById("instructions").textContent = lessonData[part].instructions;
    editor.setValue(lessonData[part].code);
}

// Btn click and CSS to bring up lesson page
function showLessonPage() {
    playBtnClick()
    document.getElementById("lesson-page").style.visibility="visible";
    document.getElementById("lesson-page").style.opacity="1";
    document.getElementById("lesson-page").style.top="0px";
}

// Run when code is successful
async function success(lesson, part) {
    // Transition border and unlock next button
    document.getElementById("console").style.border="3px solid #34aa2f";
    document.getElementById("next").classList.remove("btn-locked");

    // Set next button as unlocked in JSON file to remember in the future
    var lessonData = await getJSONData(lesson);
    lessonData[part].locked = false;

    // Save that to the JSON file
    setJSONData(lesson, lessonData);
}

// Run when code fails
function fail() {
    document.getElementById("console").style.border="3px solid red";
    setTimeout(() => { document.getElementById("console").style.border="3px solid black"; }, 1000)
}

// Just plays the button click sound
function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}