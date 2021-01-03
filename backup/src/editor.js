document.getElementById("homepage").addEventListener('click', function() {
    document.getElementById("lesson-page").style.visibility="hidden";
    document.getElementById("lesson-page").style.opacity="0";
    document.getElementById("lesson-page").style.top="40%";
});

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