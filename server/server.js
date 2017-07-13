const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

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


    socket.on("createMessage", (message) => {
        console.log("createdMSG", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on("disconnect", (socket) => {
        console.log("User was disconnected");
    });
});











server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
