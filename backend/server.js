const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!


const getApiAndEmit = async socket => {

    const bottleNames = ["A","B","C","D","E"];
    const locations = ["PRODUCTION", "DISTRIBUTION", "RETAIL", "HOME"];
    const data = bottleNames.map((k, v) => {
        return {
            "name": k,
            "location": locations[Math.floor(Math.random()*locations.length)]
        }
    })
    try {
      socket.emit("bottleEvent", data); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };
let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));