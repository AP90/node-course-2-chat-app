 //opens up a websocket and keeps the connection open
var socket = io();
            
//client prints on the browser console
socket.on("connect", function() {
    console.log("Connect to server");
});

socket.on("newMessage", function(msg) {
    console.log("Got a new message", msg);

    var li = jQuery("<li></li>");
    li.text(`${msg.from}: ${msg.text}`);

    jQuery("#messages").append(li);
});


socket.on("disconnect", function() {
    console.log("Disconnect from server");
});


jQuery("#message-form").on("submit", function(e) {
    // stops page refresh + query string
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function() {

    });
});