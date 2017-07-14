const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
//returns web socket server - how we will communicate
// between server and client
var io = socketIO(server);

app.use(express.static(publicPath));

//alllows you to register an event listener
//connection allows you to do something when a client connects with the server
io.on("connection", (socket) => {
    console.log("new user connected");


    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));



    socket.on("createMessage", (message, callback) => {
        console.log("createdMSG", message);
        
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("This is from the server");
    });


    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });


    socket.on("disconnect", (socket) => {
        console.log("User was disconnected");
    });
});











server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
