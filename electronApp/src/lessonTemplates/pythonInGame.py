# This function will move the agent and destroy the block under the agent.
def move(steps):
      for i in range (steps):
          agent.move("forward")
          agent.destroy("down")

# This function will make the agent turn around 180 degrees.
def turnback():
     agent.turn("right")
     agent.turn("right")

# We can chain these functions together to make the agent move and break 5 blocks,
# and then turn around.
move(5)
turnback()