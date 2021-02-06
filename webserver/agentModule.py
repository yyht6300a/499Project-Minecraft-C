# This is a class that mimics the in game agent commands
# It should only be imported by the devs into flaskServer, not by the user

class agent:
    def __init__(self):
        self.cmdQueue = list()
    
    # Returns a list of valid minecraft commands
    def getQueue(self):
        return self.cmdQueue
    

    # Movement
    def moveForward(self):
        self.cmdQueue.append("agent move forward")

    def moveBack(self):
        self.cmdQueue.append("agent move back")

    def moveLeft(self):
        self.cmdQueue.append("agent move left")

    def moveRight(self):
        self.cmdQueue.append("agent move right")

    def moveUp(self):
        self.cmdQueue.append("agent move up")

    def moveDown(self):
        self.cmdQueue.append("agent move down")
        

    # Turning    
    def turnLeft(self):
        self.cmdQueue.append("agent turn left")

    def turnRight(self):
        self.cmdQueue.append("agent turn right")


    # Place blocks
    def place(self, slotNum, direction):
        self.cmdQueue.append("agent place " + str(slotNum) + " " + str(direction))
    

    # Teleport to player
    def tp(self):
        self.cmdQueue.append("agent tp")