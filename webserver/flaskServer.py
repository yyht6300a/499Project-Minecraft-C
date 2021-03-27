# Server modules

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from flask import Flask, request, jsonify, render_template   
from sklearn.linear_model import LinearRegression


import json
import sys
import io
import numpy as np
import pandas as pd

# Agent module for agent commands
import agentModule


app = Flask(__name__)
app.config['CACHE_TYPE'] = 'null'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


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

@app.route('/lessonData2', methods = ['POST', 'GET'])
def getLesson2Info():
    if request.method == 'GET':
        return(getLessonInfo(2))

    elif request.method == 'POST':
        print('Post request recieved.')

        data = request.data.decode('utf-8')                  # Receive the data and decode it from bytes to string
        data = json.loads(data)                              # Load in JSON object
        data = json.dumps(data, indent=4, sort_keys=False)   # Pretty it up (add indenting and new lines)

        # Write data to file
        f = open('userFolder/lesson2.json', 'w')
        f.write(data)
        f.close()
        return 'POST request complete.'


@app.route('/lessonData3', methods = ['POST', 'GET'])
def getLesson3Info():
    if request.method == 'GET':
        return(getLessonInfo(3))

    elif request.method == 'POST':
        print('Post request recieved.')

        data = request.data.decode('utf-8')                  # Receive the data and decode it from bytes to string
        data = json.loads(data)                              # Load in JSON object
        data = json.dumps(data, indent=4, sort_keys=False)   # Pretty it up (add indenting and new lines)

        # Write data to file
        f = open('userFolder/lesson3.json', 'w')
        f.write(data)
        f.close()
        return 'POST request complete.'


@app.route('/lessonData4', methods = ['POST', 'GET'])
def getLesson4Info():
    if request.method == 'GET':
        return(getLessonInfo(4))

    elif request.method == 'POST':
        print('Post request recieved.')

        data = request.data.decode('utf-8')                  # Receive the data and decode it from bytes to string
        data = json.loads(data)                              # Load in JSON object
        data = json.dumps(data, indent=4, sort_keys=False)   # Pretty it up (add indenting and new lines)

        # Write data to file
        f = open('userFolder/lesson4.json', 'w')
        f.write(data)
        f.close()
        return 'POST request complete.'



@app.route('/runLesson', methods=['POST'])
def runLesson():
    agent = agentModule.agent()            # Make agent object

    data = request.data.decode('utf-8')    # Receive the data and decode it from bytes to string

    # How I captured stdout: https://www.kite.com/python/answers/how-to-redirect-print-output-to-a-variable-in-python

    old_stdout = sys.stdout     # Store old stdout
    new_stdout = io.StringIO()  # Create buffer for new stdout
    sys.stdout = new_stdout     # Set current stdout to buffer

    # Try to run the code
    # This exception handling code be better
    # This may have some errors
    # TODO: Make sure the kids can't break anything - there may be some security flaws here.
    # Docs on exec: https://www.programiz.com/python-programming/methods/built-in/exec    
    try:
        exec(data,{'agent':agent,'plt':plt,'np':np,'pd':pd,'LinearRegression':LinearRegression})
    except Exception as e:
        print("ERROR!\n", e)

    output = new_stdout.getvalue()  # Get value from stdout
    sys.stdout = old_stdout         # Restore current stdout to old version

    print(agent.getQueue())
    print(output)

    # Return list of commands and console output in JSON format
    return jsonify (
        consoleOutput = output,
        commands = agent.getQueue()
    )

#clean cache
@app.after_request
def add_header(res):
    res.headers["Cache-Control"] = "no-cache, no-store, must-revalidate,public, max-age=0"
    res.headers["Pragma"] = "no-cache"
    res.headers["Expires"] = "0"
    return res


# Helper functions
# Opens JSON lesson file and returns
def getLessonInfo(lesson):
    print("Lesson GET Request")
    print("Lesson: ", lesson)
    f = open('userFolder/lesson' + str(lesson) + '.json')
    return f.read()


if __name__ == '__main__':
    app.run(host = 'localhost', port = 3000, debug = True)