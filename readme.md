# Teaching Machine Learning with Minecraft Education

## Description
This project uses Minecraft Education as a platform to teach students from grades 10-12 the basics of machine learning in a fun and understable way. Students will learn algorithms such as linear-regression, nonlinear regression, k-nearest-neighbours, and Kruskal's shortest-path algorithm.

The project runs as a localhost Python Flask server on port 3000. Minecraft Education can open this website in game, and receive in-game commands from the server.

## Installation
* Node
  * Run `npm install` in `./webserver/static`. package.json will automatically download all necessary node modules.
* Python
  * Run `pip install flask` for the flask server.
  * Run `pip install matplotlib` for matplotlib.
  * Run `pip install scikit-learn` for Scikit-Learn (imported as sklearn)
  * Run `pip install pandas` for pandas
  * Run `pip install numpy` for numpy

## Startup
Run ./python flaskServer.py in `./webserver` to start the webserver.
Startup Minecraft Education. When in a world, press 'c' to bring up the in-game code editor and select localhost:3000.

## Information on Modules
### Node Modules
* [monaco-editor](https://microsoft.github.io/monaco-editor/)

Note: The node modules folder must be kept in `./webserver/static`.

### Python Modules
* [flask](https://flask.palletsprojects.com/en/1.1.x/)
* [matplotlib](https://matplotlib.org/)
* [sklearn](https://scikit-learn.org/stable/)

Note: If using a virtual environment create it in `./webserver/static`.

## File Structure
<img src ="webserver/static/img/fileStructure.png" width="50%" height="50%">

### Root folder

#### flaskServer.py
flaskServer.py is a Python Flask server running on port 3000. It handles sending and retrieving all files of the website to the client. Notes on Flask: All HTML files must be kept in the 'templates' folder. All CSS, JS, fonts, images, etc. must be kept in the 'static' folder. Currently handles POST and GET requests between main.js and itself. 

TODO: Secure exec.

#### agentModule.py
Creates an Agent class object which can be called by users in the Monaco-Editor. Contains many agent commands that can be found in the game, such as moving the agent forward and placing blocks. When called, it will create a queue of Agent commands which will then be sent back to main.js

#### userFolder
Contains JSON files for each lesson. 

JSON Format:

```
        "instructions": [string]"this data goes in the instructions div",
        "starterCode": [string]"code given by lesson creator goes here",
        "code": [string]"code written by the user goes here",
        "answer": [string]"answer verification: TODO",
        "plotname": [string]"name of matplotlib file if created",
        "haveplot": [true/false] checks if a plot has been created for this lesson,
        "nextLocked": [true/false] this will lock the next button until code has been correctly run on the current lesson.
```

***
### /templates

#### index.html
Source of all HTML code. Includes both the homepage and the lesson editor area in one file. Will be dynamically filled based on the current lesson. This reduces the amount of HTML code needed (only use one editor, instead of an editor for each lesson).
***
### /static

#### /js
##### main.js
Contains code for the homepage and editor. Homepage code is for the play buttons. Editor code starts the monaco editor, adds functionality to the buttons. Some helper functions are at the bottom. Handles POST and GET requests to the server. Sends a queue of commands receieved by flaskServer.py and sends it to comms.js.

##### comms.js
Provided by the client and then slightly modified for our use. Sends commands to Minecraft Education.

#### /css
##### main.css
Contains the majority of CSS, including helper CSS styles.

##### editor.css
Contains aditional css styles for the editor pane only.

#### /img
Contains all images for the website.

#### /fonts
Contains all fonts for the website.

#### /sounds
Contains all sounds for the website.

Source of button sound here: https://freesound.org/people/junggle/sounds/29301/
This is apparently the original source Notch used for Minecraft.

# World Templates
All worlds templates for lessons are contained in the World Templates folder. These can be imported into Minecraft Education.
