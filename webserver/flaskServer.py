from flask import Flask, request, jsonify, render_template   

app = Flask(__name__)

# Loads the main website
@app.route('/')
def website():
    return render_template('index.html')

# Send and save lesson 1 JSON file
@app.route('/lessonData1', methods = ['POST', 'GET'])
def getLesson1Info():
    if request.method == 'GET':
        return getLessonInfo(1)

    # TODO: Add POST request to save JSON file
    elif request.method == 'POST':
        return "ECHO: POST\n"


# TODO: Add send and save functions for lesson 1 and 2. Maybe just turn this into 1 function? (idk how)

# @app.route('/lessonData2', methods = ['POST', 'GET'])
# def getLesson1Info():
#     if request.method == 'GET':
#         return(getLessonInfo(2))

#     elif request.method == 'POST':
#         return "ECHO: POST\n"

# @app.route('/lessonData3', methods = ['POST', 'GET'])
# def getLesson1Info():
#     if request.method == 'GET':
#         return(getLessonInfo(3))

#     elif request.method == 'POST':
#         return "ECHO: POST\n"


# Helper
# Opens JSON lesson file and returns
def getLessonInfo(lesson):
    print("Lesson GET Request")
    f = open('lessons/lesson' + str(lesson) + '.json')
    return f.read()


if __name__ == '__main__':
    app.run(host = 'localhost', port = 3000, debug = True)