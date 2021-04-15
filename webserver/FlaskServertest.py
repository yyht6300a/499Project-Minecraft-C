from flaskServer import app
import unittest
import json

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"]=True
        app.config["DEBUG"]=False
        self.app=app.test_client()

    def tearDown(self):
        pass

    def test_root(self):
        response=self.app.get('/',follow_redirects=True)
        self.assertEqual(response.status_code,200)  #test the root

    def test_ReadJSONdata(self):
        response=self.app.get('/lessonData0',follow_redirects=True)
        data=json.loads(response.data)
        self.assertEqual(data['instructions'],"instru") # test if the server can read the JSON file correctly 

    def testWriteJSONdata(self):
        response=self.app.post('/lessonData0',data=json.dumps({'instructions':'instru'}))
        self.assertEqual(response.data,b'POST request complete.') #test if the server can write the JSON file correctly  
    
    def testRunLessonAgent(self):
        response=self.app.post('/runLesson',data='agent.moveForward()')
        Jdata=response.data.decode('utf-8')
        data=json.loads(Jdata)
        self.assertEqual(data,{'commands': ['agent move forward'], 'consoleOutput': ''}) # test if the server can take the input and change it
                                                                                        #to agent command 

    def testRunLessonPython(self):
        response=self.app.post('/runLesson',data='print("Hi")')
        Jdata=response.data.decode('utf-8')
        data=json.loads(Jdata)
        self.assertEqual(data,{'commands': [], 'consoleOutput': 'Hi\n'}) # test if the server can take the input and run it as python code


if __name__=='__main__':
    unittest.main()
