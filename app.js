import express from "express";
const app = express();
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);
const io = new Server(server);


app.set("view engine", "ejs");
app.use(express.static("public"));
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("recieve-location", {id: socket.id, ...data});
  })
  socket.on("disconnect", ()=> {
    io.emit("user-disconnected", socket.id);
  })
});





app.get("/", (req, res) => {
  res.render("index");
});
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
