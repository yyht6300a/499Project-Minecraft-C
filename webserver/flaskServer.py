from flask import Flask, request, jsonify, render_template  
from flask_socketio import SocketIO, emit, send 
import json
import sys
import io
import asyncio
import json
import uuid
import typing

app = Flask(__name__)
socketio = SocketIO(app)


# Loads the main website
@app.route('/')
def website():
    return render_template('index.html')




# Send and save lesson 1 JSON file
@app.route('/lessonData1', methods = ['POST', 'GET'])
async def getLesson1Info():
    if request.method == 'GET':
        # await execute_command(socketio,"agent move right")
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
        # await execute_command(socketio,"agent move right")
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
        exec(data)
    except Exception as e:
        print("ERROR!\n", e)

    output = new_stdout.getvalue()  # Get value from stdout
    sys.stdout = old_stdout         # Restore current stdout to old version

    return output




# Helper functions
# Opens JSON lesson file and returns
def getLessonInfo(lesson):
    print("Lesson GET Request")
    f = open('userFolder/lesson' + str(lesson) + '.json')
    return f.read()


if __name__ == '__main__':
    app.run(host = 'localhost', port = 3000, debug = True)

def handle_message(message):
    send(message, namespace='/chat')

_SUBSCRIPTIONS: typing.Dict[str, typing.List[typing.Any]] = {}
blockbrocken=[]

async def subscribe_callback(socketio, event_name: str, callback,) -> str:
    if not isinstance(event_name, str):
        raise TypeError("expected 'str' for event_name")

    evt_id = uuid.uuid4().hex

    message = {
        "header": {
            "messagePurpose": "subscribe",
            "messageType": "commandRequest",
            "requestId": evt_id,
            "version": 1,
        },
        "body": {"eventName": event_name, "version": 1},
        }
    await socketio.send(json.dumps(message))
    _SUBSCRIPTIONS.setdefault(event_name, []).append((evt_id, callback))
    print("for test---_SUBSCRIPTIONS.items()",_SUBSCRIPTIONS.items()) #JC
    print("for test---evt_id",evt_id) #JC
    return evt_id

async def execute_command(socketio, command: str, *args):
    if not isinstance(command, str):
        raise TypeError("expected 'str' for command")
    if args:
        command += " " + " ".join(str(a) for a in args if a is not None)

    req_id = uuid.uuid4().hex
    message = {
        "header": {
            "messagePurpose": "commandRequest",
            "messageType": "commandRequest",
            "requestId": req_id,
            "version": 1,
        },
        "body": {"commandLine": command, "version": 1},
    }

    await socketio.emit(json.dumps(message))
