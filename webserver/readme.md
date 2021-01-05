# Documentation

## Node Modules
* monaco-editor

## File Structure

### Root folder

#### server.py
server.py runs a localhost http server on port 3000 (3000 specifically since this is what MC EDU listens to). Automatically opens to index.html.

#### index.html
Source of all HTML code. Includes both the homepage and the lesson editor area in one file. Will be dynamically filled based on the current lesson. This reduces the amount of HTML code needed (only use one editor, instead of an editor for each lesson).

### /js
#### main.js
Contains code for the homepage and editor. Homepage code is for the play buttons. Editor code starts the monaco editor, adds functionality to the buttons. Some helper functions are at the bottom.

### /css
#### editor.css
Contains aditional css styles for the editor pane only.

#### main.css
Contains the majority of CSS, including helper CSS styles.

### /assets
Contains folders for images, sounds, and fonts.

Source of button sound here: https://freesound.org/people/junggle/sounds/29301/
This is apparently the original source Notch used for Minecraft.
