#Answer for Lesson


position=[-25,76,103]           #position of start point


def turnback():              #function for turn back
    agent.turn("left")
    agent.turn("left")

    

def mining(x,y):                 #answer for Task 2 
    turn=0
    for i in range(x):           #turn x times
        for x in range(y-1):     #stand on first block on the mine so move forward y-1 times 
            agent.destroy("down")
            agent.move("forward")
            agent.collect("gold block")
        if turn%2==0:
            agent.turn("right")
            agent.destroy("down")
            agent.collect("gold block")
            agent.move("forward")
            agent.turn("right")
        else:                      # control when to turn right and when to turn left
            agent.turn("left")
            agent.destroy("down")
            agent.collect("gold block")
            agent.move("forward")
            agent.turn("left")
        turn+=1

        

def startmaining(num_layers,x,y):  #answer for Task 3
    agent.move("forward")          # in the first turn move forward from start point to the mine area
    for i in range(num_layers):    # run num of layers time 
        mining(x,y)
        agent.teleport(position)
        if x%2!=0:                 #when the length of x is odd, we need to turn back our agent after each teleport
            turnback()          #otherwise the agent will dig in the opposite direction
        agent.move("forward")
        for z in range(i+1):       #in each iteration we need move our agent deeper
            agent.move("down")
    agent.teleport(position)
    agent.say("finished")


    

def itemnumber(item):                # answer for Task 4
    for i in range(1,28):
        if (agent.get_item(i)==item):#report the number of the input item in the agent's inventory
            agent.say("I have "+str(agent.get_item_count(i))+" "+agent.get_item(i))




#agent.teleport(position)    #answer for task 1
#turnback()               #after teleport if your agent is facing in the opposite direction run this code 
startmaining(2,5,7)          #startmaining(num_layers,x_length,y_length)    
itemnumber("gold block")     #item name


