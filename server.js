const express = require("express");
const app = express();
const port = 4000;
const http = require("http");
const server = http.createServer(app);
//express stuff
app.use(express.static(__dirname + "/public"));

server.listen(port, ()=>console.log(`Server is running on port ${port}`));

