import express from "express";
const app = express();
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);
const io = new Server(server);




app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
