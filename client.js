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
})
$("#input").keydown((ev)=>{
    if(ev.keyCode == 13){
        socket.emit('text',{
        message : $("#input").val(),
        name : nickname
    })
    $("#input").val('')
    }
})
socket.on('returnMessage', (data) =>{
    $("#list").append(data.name +" : "+data.message + '<br>');
});
