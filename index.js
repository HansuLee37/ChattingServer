let io = require('socket.io')(9999);

io.on('connection', (client)=>{
    
    console.log(`클라이언트 접속 : ${client.id}`);
    client.emit('welcome message', {message : "Welcome"});
    client.on('disconnect', ()=>{
         console.log(`클라이언트 접속 해제 : ${client.id}`);
    });
    client.on('text',(data)=>{
        io.emit('returnMessage', data);
    })
});