 //opens up a websocket and keeps the connection open
var socket = io();
            
function scrollToBottom() {
    // selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    // heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}



//client prints on the browser console
socket.on("connect", function() {
    var params = jQuery.deparam(window.location.search);
    
    socket.emit("join", params, function(err) {
        if (err) {
            // redirects user
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No error");
        }
    });
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
    scrollToBottom();
    

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
    scrollToBottom();

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

socket.on("updateUserList", function(users) {
    var ol = jQuery("<ol></ol>");
    
    users.forEach(function(user) {
        ol.append(jQuery("<li></li>").text(user));
    });

    jQuery("#users").html(ol);
});


jQuery("#message-form").on("submit", function(e) {
    // stops page refresh + query string
    e.preventDefault();

    var messageTextbox = jQuery("[name=message]");

    socket.emit("createMessage", {
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




