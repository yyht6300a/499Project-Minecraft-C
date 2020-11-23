# Valid directions are: 'forward', 'back', 'left', 'right', 'up', 'down'
agent.move(direction)

# Valid direction are: 'left', 'right'
agent.turn(turn direction)

# Collect all items of the given type near the agent
# In this lesson you can collect "gold block"
agent.collect(item)

# Teleports the agent to a location if specified, or else to the player
agent.teleport([location])

# Gets or sets the location of the agent
agent.position

# Destroys a block in the given direction
agent.destroy(direction)

# Return the name of the item in the agent's inventory slot
agent.get_item(slot number)

# Returns the number of items in the agent's inventory slot
agent.get_item_count(slot number) 