let io = require('socket.io')(9999);
let Plist = {};
let account = 0;

io.on('connection', (client)=>{
    console.log(`클라이언트 접속 : ${client.id}`);
    account++;
    client.emit('welcome message', {message : "Welcome"});
    client.on('disconnect', ()=>{
         console.log(`클라이언트 접속 해제 : ${client.id}`);
         Plist[client.id] = "";
         account--;
    });
    client.on('text',(data)=>{
        io.emit('returnMessage', data);
        console.log(`${client.id}(${data.name}) : ${data.message}`);
    });
    client.on('People', (data)=>{
        Plist[client.id] = {
            nickname : data.name
        };
        console.log(`접속자 수 : ${account}`);
        console.log("접속자 : ")
        for(a in Plist){
            if(Plist[a] != "")
                console.log(Plist[a].nickname)
        }
    })
    client.on('Whisper', (data)=>{
        console.log(`귓속말 : ${Plist[client.id].nickname} to ${data.Your} : ${data.message}`)
            for(var a in Plist){
            if(Plist[a] != "")
                if(Plist[a].nickname == data.Your){
                    io.emit('returnWhisper', {
                        data,
                        who : data.Your
                    })
                }
            }
    });
});