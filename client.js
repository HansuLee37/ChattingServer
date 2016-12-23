let nickname;

$(document).ready(()=>{
    nickname = prompt("닉네임 : ","");
    $(".Nbtn").click(()=>{
        nickname = prompt("닉네임 : ","");
    })
})
let socket = io.connect("http://localhost:9999");
console.log(socket)
socket.on('welcome message', (data) =>{
   $("#list").append(data.message + '<br>');
});
$(".btn").click(function(){
    socket.emit('text',{
        message : $("#input").val(),
        name : nickname
    })
    $("#input").val('')
});
setInterval(()=>{
    socket.emit('People',{
        name : nickname
    });
},5000)
$(".Wbtn").click(()=>{
    let nick = prompt("귓속말을 보낼 상대","");
    let msg = prompt("메세지","");
    socket.emit('Whisper',{
        message : msg,
        Your : nick,
        My : nickname
    });
    $("#list").append(`(${nick}에게) : ${msg}`+'<br>');
})
$("#input").keydown((ev)=>{
    if(ev.keyCode == 13){
        socket.emit('text',{
            message : $("#input").val(),
            name : nickname
        })
        $("#input").val('').focus();
    }
});
socket.on('returnMessage', (data) =>{
    $("#list").append(data.name +" : "+data.message + '<br>');
});
socket.on('returnWhisper', (data)=>{
    if(data.who == nickname){
        $("#list").append("(귓속말)"+data.data.My +" : "+data.data.message + '<br>');
    }
})