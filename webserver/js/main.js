// Code for editor
// Start the monaco-editor
var editor = 0;
require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
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
    document.getElementById("lesson-page").style.visibility="hidden";
    document.getElementById("lesson-page").style.opacity="0";
    document.getElementById("lesson-page").style.top="40%";
    playBtnClick()
});


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


// Helper functions
async function getJSONData(url) {
    const response = await fetch(url);
    return response.json();
}

async function setLessonData(lesson, part) {
    var lessonData = await getJSONData("lessons/lesson" + lesson + ".json");
    document.getElementById("instructions").textContent = lessonData[part].instructions;
    editor.setValue(lessonData[part].starterCode);
}

function showLessonPage() {
    document.getElementById("lesson-page").style.visibility="visible";
    document.getElementById("lesson-page").style.opacity="1";
    document.getElementById("lesson-page").style.top="0px";
    playBtnClick()
}

function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}