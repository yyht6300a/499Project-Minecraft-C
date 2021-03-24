# lesson 3 - Shortest Path Question via Kruskal's Algorithm

# Learning goal:
#       1. Understand what is Minimum Spanning Tree.
#       2. Understand what is Kruskal's Algorithm.
#       3. Be able to create a Kruskal's Algorithm.
#       4. Be able to conveert a node-based map into codes.
#       5. Know how to use dictionary type in Python.
#
#Intruduction: 
# When programmer trainning an AI model, one of the important part is to 
# let the progamme find the shortest path between the current state and 
# the goal. In this lesson we will intruduce the simplest Shortest-Path question 
# for students and help them to find a shortest way to go every spots on a map. And finally let students code their 
# agent robot to traverse all the spots on map to complete tasks.
#                
#Background:
#   It is too hard to deliver all the parcels in person.A courier asks you to help him develop a program 
#   that makes a robot to deliver automatically. But remember, the fuel of a robot is limited. You have to be careful when you design 
#   a route for the robot. Try to make it as short as possible!
#
#
#
#Provided map: (find img in /Lesson-SP/image/SampleMap1.png)
#
# 
# ====================================================================================================================================  
#
# Step 1:
#   Now here shows the map, there are multiple choice from one house to another. To simplify the question,
#   we can consider each house as a node and each path between them as an edge. And now we need to convert the map
#   into something that computer can read. Create a list to store every edge in it, including start node and end node. 
#   And also a list contains all nodes.
#   
'''
Hint: To start your convertion, you may use the following pseudo code:
   Map = [(House name1,House name2, value),...]  
        //[House name1] is the current location. The [House name2] is another house which directly 
        connected with the current. [value] is the distance between these two house. Remember you need to make sure every house is included.)
'''
#provided solution:
Map = [
    ("A","B",1),("A","C",2),
    ("B","C",6),("B","D",11),
    ("C","D",9),("C","E",13),
    ("D","E",7),("D","F",3),
    ("E","F",4)
    ]
nodes = ('ABCDEF')
# (A checker will be added later to check if students create a correct map.)
# 
# 
# 
# =============================================================================================================================================================
#
# Step 2:
# Well done! Now it's time to prepair for next code. Finish the following readding before we continue.
#   1. What is Minimum Spanning Tree?
#       "Given a connected and undirected graph, a spanning tree of that graph is a subgraph that is a tree and connects all the vertices together.""
#       The number of spanning tree on a graph is not limited. However, to solve the problem in this lesson, we need to find the minimum spanning tree.
#       A minimum spanning tree has the smallest weight compared with all other spanning trees for a graph. 
#       "The weight of a spanning tree is the sum of weights given to each edge of the spanning tree."
#       In this lesson, the weight of an edge represents the distance between two house. 
#       There will be only (number of nodes -1) edges in a minimum spanning tree.
#   2. How does a Kruskal's algorithm work?
#       i. The algorithm sorts all the edges in increasing order of their weight.
#       ii. Start with the smallest edge. If it can not form a cycle with the tree we have so far, then add this edge to the tree.
#       Otherwise we discard it.
#       iii. Repeat step2 until there are [(number of nodes) - 1] edges in the tree.
#
# It's ok if you do not totally understand. We will explain more in the next step.   
# =================================================================================================================================================================
# Step 3:
# In this part, you will create your own algorithm based on Step 2.2. 
# First, we need to sort edges in increasing order by using sort(key=lambda x:x[2]) 
Map.sort(key=lambda x:x[2])
# Second, initialize a new tree. We will use a new data structure "Dictionary". Data in dictionary will be like {[key]:[value]}, where key is the name of data 
# and value is the data stored.
# We want the current node be the key and the nodes connected with the current is the value
# Use the following pseudo code:
'''
tree=dict()
for loop for all elements in nodes:
    let each node connect with itself (we will deal with this later.)
'''
trees = dict()
for i in nodes:
    trees[i]=i
# ================================================================================================================================================================
# Step 4:
# Now let's start with build a function named find()
# It is used to find the root nodes
# So that this tree will record connected nodes.
def find_node(x):
    if trees[x]!=x:
        trees[x]=find_node(trees[x])
    return trees[x]
#
# =================================================================================================================================================================
# Step 5:
# Let's initialize our minimum spanning tree at the beginning of this step
mst=[]
# define how many edges we need.
n=len(nodes)-1
# 
# =================================================================================================================================================================
# Step 6:
# The last step to create our algorithm is to write a loop which traverse all edge in Map.
# Remember in Step 2.2.ii, before we add edges in mst[], use find() to check if this edge 
# will form a cycle. find() will help us find the root of a node. If both two nodes of the new edge do not have
# the same root, then we add it into MST. 
for edge in Map:
    v1,v2,_=edge
    if find_node(v1)!=find_node(v2):
        trees[find_node(v2)]=find_node(v1)
        mst.append(edge)
        print('edge '+str(len(nodes)-n)+' added')
        n-=1
        print(trees)
        print(mst)
        if n==0:
            break
#
#===================================================================================================================================================================
# Step7:
# Congratulation! Now you have a minimum spanning tree of our map.
# It shows exactly the shortest path to go over every house.
# To finish the task, in this step, we need to programme our agent.
# The following start code is for you to control the agent.
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# Reference:
# https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/



