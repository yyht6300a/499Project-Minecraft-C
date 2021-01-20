import asyncio
import json
import uuid
import typing
import websockets
from time import sleep

# Dictionary to keep track of subscriptions that occur.
_SUBSCRIPTIONS: typing.Dict[str, typing.List[typing.Any]] = {}
blockbrocken=[]

async def subscribe_callback(websocket, event_name: str, callback,) -> str:
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
    await websocket.send(json.dumps(message))
    _SUBSCRIPTIONS.setdefault(event_name, []).append((evt_id, callback))
    print("for test---_SUBSCRIPTIONS.items()",_SUBSCRIPTIONS.items()) #JC
    print("for test---evt_id",evt_id) #JC
    return evt_id

async def execute_command(websocket, command: str, *args):
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

    await websocket.send(json.dumps(message))

async def handle_block_placed(response,websocket):
    # Properties we care about.
    if (response['eventName'] == "BlockPlaced"):
        print(f'Block: {response["properties"]["Block"]}')
        print(f'Placement: {response["properties"]["PlacementMethod"]}')
        print(f'Item: {response["properties"]["ToolItemType"]}')
        content=[]
        try:
            with open("BlcokPlaced.txt","r") as fi:
                exists=False
                for lines in fi.readlines():
                    line=lines.split("***")
                    if(int(line[1])==response["properties"]["ToolItemType"]):
                        number=str(int(line[2])+1)
                        text=line[0]+"***"+line[1]+"***"+str(number)+"\n"
                        content.append(text)
                        exists=True
                    else:
                        content.append(lines)
            with open("BlcokPlaced.txt","w") as fi:
                for lines in content:
                    fi.write(lines)

            if(exists==False):
                with open("BlcokPlaced.txt","a") as fi:
                    fi.write(response["properties"]["Block"]+"***"+ str(response["properties"]["ToolItemType"])+"***"+'1'+"\n")

        except:
            with open("BlcokPlaced.txt","w") as fi:
                line=response["properties"]["Block"]+"***"+ str(response["properties"]["ToolItemType"])+"***"+str(1)+"\n"
                fi.write(line)

        
        await execute_command(websocket,"say "+"you placed a "+response["properties"]["Block"])
        


        

async def handle_block_Broken(response,websocket):
    # Properties we care about.
    if (response['eventName'] == "BlockBroken"):
        print(f'Block: {response["properties"]["Block"]}')
        print(f'Item: {response["properties"]["Type"]}')
        
        content=[]
        try:
            with open("BlcokBroken.txt","r") as fi:
                exists=False
                for lines in fi.readlines():
                    line=lines.split("***")
                    if(int(line[1])==response["properties"]["Type"]):
                        number=str(int(line[2])+1)
                        text=line[0]+"***"+line[1]+"***"+str(number)+"\n"
                        content.append(text)
                        exists=True
                    else:
                        content.append(lines)
            with open("BlcokBroken.txt","w") as fi:
                for lines in content:
                    fi.write(lines)

            if(exists==False):
                with open("BlcokBroken.txt","a") as fi:
                    fi.write(response["properties"]["Block"]+"***"+ str(response["properties"]["Type"])+"***"+'1'+"\n")

        except:
            with open("BlcokBroken.txt","w") as fi:
                line=response["properties"]["Block"]+"***"+ str(response["properties"]["Type"])+"***"+str(1)+"\n"
                fi.write(line)

        await execute_command(websocket,"say "+"you break a "+response["properties"]["Block"])
        
async def handle_mob_killed(response,websocket):
    if(response['eventName']=="MobKilled"):
       print(f'MobID: {response["properties"]["MobType"]}')
       mobID=str(response["properties"]["MobType"])
       with open ("vanilla.json") as fi:
           data=json.load(fi)
       mobName=data["mobs"][mobID]
       if(response["properties"]["IsMonster"]==True):
           await execute_command(websocket,"say "+"you killed a "+mobName+" it's a monster")
       else:
           await execute_command(websocket,"say "+"you killed a "+mobName+ " it's not a monster")

     


async def on_response(response_str,websocket):
    response = json.loads(response_str)
    header = response["header"]
    body = response["body"]
    print(response)
    if header.get("messagePurpose") == "event":
        event_name = body.get("eventName")
        subs = list(_SUBSCRIPTIONS.get(event_name) or [])
        for evt_id, sub in subs:
            await sub(body,websocket)

async def runCmd(websocket, cmd):
    if "agent" in cmd:
        if "move" in cmd:
            if "forward" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move forward")
                else: 
                    await execute_command(websocket,"agent move forward")
            if "back" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move back")
                else: 
                    await execute_command(websocket,"agent move back")
            if "left" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move left")
                else: 
                    await execute_command(websocket,"agent move left")
            if "right" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move right")
                else: 
                    await execute_command(websocket,"agent move right")
            if "up" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move up")
                else: 
                    await execute_command(websocket,"agent move up")
            if "down" in cmd:
                if  "*" in cmd:
                    index=cmd[-1]
                    for x in range[index]
                    await execute_command(websocket,"agent move down")
                else: 
                    await execute_command(websocket,"agent move down")
    else: 
        await execute_command(websocket,cmd)

async def startup(websocket, path):
    print("Connection Established!")
    
    # When a block is placed we get called.
    # Things we care about
    await subscribe_callback(websocket, "BlockBroken", handle_block_Broken)
    
    await subscribe_callback(websocket, "BlockPlaced", handle_block_placed)
    await subscribe_callback(websocket,"MobKilled",handle_mob_killed)

    try:
        # Handle any message recieved.
        cmd=input("Enter command here:")
        await runCmd(websocket,cmd)
        async for message in websocket:
            await on_response(message,websocket)
            data = json.loads(message)
    except:
        raise

print("Starting MEE PySever. Use `/connect localhost:8765` to connect to the server. Please make sure you disable encryption.")

start_server = websockets.serve(
    startup,
    "localhost",
    8765,
    subprotocols=["com.microsoft.minecraft.wsencrypt"],
    ping_interval=None)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


