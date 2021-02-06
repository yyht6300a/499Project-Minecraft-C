class Comms{

    constructor(){
        this.commandQueue = [];
        this.responseFcn = {};
        this.commandInProgress = false;
        this.version = 1;
        this.agentEventResponseID = "00000000-0000-0000-0000-000000000000";
        let self = this;
        if (!window.ipcRenderer) return;
    //	window.ipcRenderer.responseFromApp = function (str) {self.handleResponse (str)}
        window.ipcRenderer.on("responseFromApp", (e, str) => {self.handleEvent(e, str);});	
    }

    handleEvent(e, str){
        let self  = this;
        
        var result  = JSON.parse(str);	
    //	console.log (result)
        var header =  result.header;
        var body = result.body
        let id = header.requestId;
    //	console.log (timer(), "handleResponse" , header.messagePurpose, body.eventName ? body.eventName : body.statusMessage)
        switch (header.messagePurpose){
            case "event": 
                if (body.eventName == "AgentCommand") {
    //				console.log (timer(), "executeCallback", header, body)
                    executeCallback(id, body.properties.Result)	
                }
                else Runtime.triggerEvent(body);
                break;
            case "commandResponse": 
                var done =  getWaitStatus(body)
                if (done) {
        //			console.log (timer(), "executeCallback", str)
                    executeCallback(id, body)	
                }
                else self.responseFcn[self.agentEventResponseID] =  self.responseFcn[id];
                self.commandInProgress = false;
                break;
            default:
                console.log ("not handled", header.messagePurpose )		
                break;
        }

        this.processQueue();
            
        function getWaitStatus (body)  {
            if (!body.statusMessage) return true;
            if ( body.statusMessage == "Agent teleported") return true;
            if ( body.statusMessage.indexOf("Agent getposition") > -1 ) return true;
            else return  body.statusMessage.toLowerCase().indexOf ("agent") != 0;
        }

        function  executeCallback(id, str) {
        //	console.log (timer(), "executeCallback", id, str)
            let fcn = self.responseFcn[id];
            if (fcn) fcn(str);
            delete self.responseFcn[id];
        }	

    }

    queueCommand(cmd, whenDone){
        if (!window.ipcRenderer) { 
            console.log("Couldn't queue command.");
            whenDone()
        }
        else {
        //	console.log ('queueCommand', cmd.line, this.commandInProgress)
            console.log("queued command");
            this.commandQueue.push({command: cmd, fcn: whenDone})
            this.processQueue();
        }
    }



    processQueue(){
    //	console.log (timer(), "processQueue", this.commandInProgress, this.commandQueue.length)
        if (this.commandInProgress) return;
        if (this.commandQueue.length == 0) return;
        let next = this.commandQueue.shift();
        if (!next) return;
    	// console.log ('processQueue', next.command.line, next.command.purpose != "subscribe")
        if (next.command.purpose != "subscribe" ) this.commandInProgress = true;
        console.log("Processed queue.");
        this.sendToMinecraft(next);
    }

    sendToMinecraft(data){
        var cmd = data.command;
        var fcn = data.fcn;
        // var mp = cmd.purpose;
        var id = this.getUUID()
        this.responseFcn[id] = fcn;
        var json = {header: {version: this.version, requestId: id, messagePurpose: "commandRequest", messageType: "commandRequest"}, body: {}}

        // if (cmd.trigger) json.body.eventName = cmd.trigger;
        // else {
        //     json.body.commandLine = cmd.line;
        //     json.body.version = 1;
        //     if (cmd.origin) json.body.origin = cmd.origin;
        // }
        json.body.commandLine = cmd;
        json.body.version = 1;
        if (cmd.origin) json.body.origin = cmd.origin;
    //	window.ipcRenderer.sendToHost('sendToMinecraft', json);

        console.log(json);

        window.ipcRenderer.sendToHost('sendToApp', json);
        //	window.ipcRenderer.send('sendToMinecraft', JSON.stringify(json));
        console.log("Sent!");
    }

    getUUID(){
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        var time = Date.now().toString(16);
        for (let i=0; i < time.length; i++) { // encode time stamp to make the ID unique
            uuid = uuid.replace(/x/, time[i]) 
        }
        // fill the rest with random numbers
        while (uuid.indexOf('x') > -1) uuid = uuid.replace(/x/, Math.floor(Math.random(16)*16).toString(16)) 
        var ychar = (Math.floor(Math.random(4)*4) + 8).toString(16) // valid:  8, 9, A, B
        uuid = uuid.replace(/y/, ychar) 
        return uuid; 
    } 

}
    