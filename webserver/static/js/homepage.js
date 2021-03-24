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

document.getElementById("lesson4").addEventListener('click', function() {
    currentLesson = 3;
    displayLessonData();
    showLessonPage();
});

// Btn click and CSS to bring up lesson page
function showLessonPage() {
    playBtnClick()
    document.getElementById("lesson-page").style.visibility = "visible";
    document.getElementById("lesson-page").style.opacity = "1";
    document.getElementById("lesson-page").style.top = "0px";
}