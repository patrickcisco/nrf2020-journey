const socketIo = require("socket.io");
const config = require("../config/config.js");
var io;

const Init = function(server) {
    const io = socketIo(server);
    io.on("connection", socket => {
        console.log("Client connected");
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
    });
    return io;
}

module.exports = {
    Init: Init,
    io: io,
 };
