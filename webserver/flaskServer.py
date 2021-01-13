from flask import Flask, request, jsonify, render_template   
import json

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
        print('Post request recieved.')

        data = request.data.decode('utf-8')                  # Receive the data and decode it from bytes to string
        data = json.loads(data)                              # Load in JSON object
        data = json.dumps(data, indent=4, sort_keys=False)   # Pretty it up (add indenting and new lines)

        # Write data to file
        f = open('userFolder/lesson1.json', 'w')
        f.write(data)
        f.close()

        return 'POST request complete.'

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

@app.route('/runLesson', methods=['POST'])
def runLesson():
    data = request.data.decode('utf-8')    # Receive the data and decode it from bytes to string

    #TODO: Run Python Code HERE
    # Will most likely use the built in exec() function in Python, but am looking at other options.

    return 'This should be returned Python code.'


# Helper
# Opens JSON lesson file and returns
def getLessonInfo(lesson):
    print("Lesson GET Request")
    f = open('userFolder/lesson' + str(lesson) + '.json')
    return f.read()


if __name__ == '__main__':
    app.run(host = 'localhost', port = 3000, debug = True)