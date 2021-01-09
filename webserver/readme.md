# Documentation

## Description
Webserver is a Python Flask server. By running on port 3000 it can be opened in Minecraft Education. The website runs on only one HTML file, found in the templates folder. To start the project, flask must be installed with pip. It is recommended that this is placed in a [virtual environment](https://realpython.com/python-virtual-environments-a-primer/), and then run `pip3 install flask` Additionally, node must be installed into the static folder with monaco-editor. [Example of starting node](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#adding_dependencies) (do this in the static folder). Run `node install monaco-editor` after this.

## Node Modules
* [monaco-editor](https://microsoft.github.io/monaco-editor/)

Note: The node modules folder must be kept in the static folder.

## Python Modules
* [flask](https://flask.palletsprojects.com/en/1.1.x/)


## File Structure
<img src ="static/img/fileStructure.png" width="50%" height="50%">

### Root folder

#### flaskServer.py
flaskServer.py is a Python Flask server running on port 3000. It handles sending and retrieving all files of the website to the client. Notes on Flask: All HTML files must be kept in the 'templates' folder. All CSS, JS, fonts, images, etc. must be kept in the 'static' folder. 
***
### /templates

#### index.html
Source of all HTML code. Includes both the homepage and the lesson editor area in one file. Will be dynamically filled based on the current lesson. This reduces the amount of HTML code needed (only use one editor, instead of an editor for each lesson).
***
### /static

#### /js
##### main.js
Contains code for the homepage and editor. Homepage code is for the play buttons. Editor code starts the monaco editor, adds functionality to the buttons. Some helper functions are at the bottom.

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
