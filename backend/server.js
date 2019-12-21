const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
const sockets = require("./sockets/sockets.js");
app.use(express.json()) 
app.use(index);

const server = http.createServer(app);
// initialize the socket for the API Server
sockets.io = sockets.Init(server)
// start the API Server
server.listen(port, () => console.log(`Listening on port ${port}`));
