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