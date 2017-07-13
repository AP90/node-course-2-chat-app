 //opens up a websocket and keeps the connection open
var socket = io();
            
//client prints on the browser console
socket.on("connect", function() {
    console.log("Connect to server");


});

socket.on("newMessage", function(msg) {
    console.log("Got a new message", msg);
});


socket.on("disconnect", function() {
    console.log("Disconnect from server");
});
