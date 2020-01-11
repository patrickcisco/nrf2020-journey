const express = require("express");
const http = require("http");

const port = process.env.PORT || 80;
const index = require("./routes/index");
const app = express();
const sockets = require("./sockets/sockets.js");

// Add allow cross site resource access header
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json()) 
app.use(index);

const server = http.createServer(app);
// initialize the socket for the API Server
sockets.io = sockets.Init(server)
// start the API Server
server.listen(port, () => console.log(`Listening on port ${port}`));


