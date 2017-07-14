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


socket.on("newLocationMessage", function(message) {
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My current location</a>");
    
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
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

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    //built in function on the navigator object
    //takes a success case and an error case
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert("Unable to fetch location");
    });
});




