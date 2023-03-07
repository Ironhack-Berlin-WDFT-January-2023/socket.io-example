// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
const express = require("express");
const app = express();
const cors = require ("cors") 
const http = require("http") //d
const server = http.createServer(app); //d
const { Server } = require("socket.io"); //d
const io = new Server(server , {  
  cors: {
    origin: "*"
  }
}); //d


io.on('connection', (socket) =>{ //d
  console.log('user connected') 
  console.log(socket.id)

  socket.on('message', (message, nickname) => {

      // broadcast.emit
      socket.broadcast.emit('message', {
          body: message,
          from: nickname
      })
  })
})


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const messages = require("./routes/messages");
app.use("/api", messages);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

server.listen(5005, () => {    //d
  console.log(`Server listening on http://localhost:${5005}`);
});


module.exports = app;
