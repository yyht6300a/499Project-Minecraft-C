// Open lessons from main page 
document.getElementById("lesson1").addEventListener('click', function() {
    showLessonPage();
});

document.getElementById("lesson2").addEventListener('click', function() {
    showLessonPage();
});

document.getElementById("lesson3").addEventListener('click', function() {
    showLessonPage();
});


// Code for editor
// Go back to homepage button
document.getElementById("homepage").addEventListener('click', function() {
    document.getElementById("lesson-page").style.visibility="hidden";
    document.getElementById("lesson-page").style.opacity="0";
    document.getElementById("lesson-page").style.top="40%";
    playBtnClick()
});

// Start the monaco-editor
require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: ['def hello():', '\tprint("Hello world!");'].join('\n'),
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: {
            enabled: false
        }
    });
});

// Helper functions
function showLessonPage() {
    document.getElementById("lesson-page").style.visibility="visible";
    document.getElementById("lesson-page").style.opacity="1";
    document.getElementById("lesson-page").style.top="0px";
    playBtnClick()
}

function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}