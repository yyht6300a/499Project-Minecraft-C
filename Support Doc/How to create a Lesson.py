"""
For create a new Lesson in the game


1. In userFolder find your lesson number


2. In each block you need to change instructions, code, haveplot, nextLocked


3. Instructions will appears on the left side of the web page, you need to write
   instruction on HTML structure


4. For the code part, you don’t need to type your code to json format manually, you can 
   run the server on browser and write your code in the code editor, each time you 
   press the run button, the server will upload code to lesson.json automatically.


5.  If you want to print a graph in any part of your lesson, for example: if you want to print a graph in Lesson 1 part 2 then in lesson1 change second block have plot=true     in your code always use 
    plt.savefig("./static/img/matplot/temp.png", bbox_inches='tight')
    plt.clf() 
    instead of regular plt.show()


6.Keep nextLocked=false

you can check this doc: https://docs.google.com/document/d/16W12bG9bANv6WLtaMhdTbCYG98rabqI3HQdqpHe8nFw/edit?usp=sharing
"""