 //opens up a websocket and keeps the connection open
var socket = io();
            
//client prints on the browser console
socket.on("connect", function() {
    console.log("Connect to server");
});

socket.on("newMessage", function(msg) {
    var formattedTime = moment(msg.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);

    

    // var li = jQuery("<li></li>");
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

    // jQuery("#messages").append(li);
});


socket.on("newLocationMessage", function(message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    // grabs the template from the html file
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);

    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target='_blank'>My current location</a>");
    // var formattedTime = moment(message.createdAt).format("h:mm a");
    
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr("href", message.url);
    // li.append(a);
    // jQuery("#messages").append(li);
});


socket.on("disconnect", function() {
    console.log("Disconnect from server");
});


jQuery("#message-form").on("submit", function(e) {
    // stops page refresh + query string
    e.preventDefault();

    var messageTextbox = jQuery("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val("");
    });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...")

    //built in function on the navigator object
    //takes a success case and an error case
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    });
});




