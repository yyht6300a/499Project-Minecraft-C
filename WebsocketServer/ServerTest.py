
import asyncio
import websockets
import json
import unittest


async def on_response(response_str,websocket):
    response = json.loads(response_str)
    print(response)

async def testBlockBroken(websocket):
    message={'body': {'eventName': 'BlockBroken', 'measurements': {'Count': 1, 'RecordCnt': 1, 'SeqMax': 152, 'SeqMin': 152}, 'properties': {'AccountType': 1, 'ActiveSessionID': 'a4ebc629-4ab5-4e6a-8f26-f29aa9a31e0b', 'AppSessionID': '2988eda4-eb7f-4737-991f-a8fbbdf24954', 'AuxType': 0, 'Biome': 1, 'Block': 'grass', 'Build': '1.14.50.0', 'BuildNum': '4915662', 'BuildPlat': 8, 'Cheevos': False, 'ClientId': '5425a8f04fa74fbb961148938089ad96', 'CurrentInput': 1, 'CurrentNumDevices': 1, 'DestructionMethod': 0, 'DeviceSessionId': '2988eda4-eb7f-4737-991f-a8fbbdf24954', 'Dim': 0, 'GlobalMultiplayerCorrelationId': 'aa4fa85a-36a3-48ce-a0f0-6f70d20d17b8', 'Mode': 0, 'Namespace': 'minecraft', 'NetworkType': 0, 'Plat': '10.0.18363', 'PlayerGameMode': 0, 'Role': 0, 'SchemaCommitHash': '19b6ec0744c3c83a00ecbd840f48cb080c7bc64d', 'ToolItemType': 241, 'Treatments': '', 'Type': 2, 'UserId': 'a42b9cec-8f81-4811-a86f-8ee21ab6b94f', 'Variant': 0, 'WorldFeature': 0, 'WorldSessionId': '0e88f447-ab76-4f00-ae4e-a0cd172e04cc', 'editionType': 'pocket', 'isTrial': 0, 'locale': 'en_CA', 'vrMode': False}}, 'header': {'messagePurpose': 'event', 'requestId': '00000000-0000-0000-0000-000000000000', 'version': 1}}
    await websocket.send(json.dumps(message))



async def hello():
    url="ws://localhost:8765"
    async with websockets.connect(url) as websocket:

        await testBlockBroken(websocket)
        #expect message:{'header': {'messagePurpose': 'commandRequest', 'messageType': 'commandRequest', 'requestId': '4539a234ddff49d5872120b7e558ad41', 'version': 1}, 'body': {'commandLine': 'say you break a grass', 'version': 1}}
        
        try:
        # Handle any message recieved.
            async for message in websocket:
                await on_response(message,websocket)
                data = json.loads(message)
        except:
            raise



asyncio.get_event_loop().run_until_complete(hello())

asyncio.get_event_loop().run_forever()

