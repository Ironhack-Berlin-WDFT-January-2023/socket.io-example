// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
const express = require("express");
const app = express();
const cors = require ("cors") 

//things to add in the server. 
const http = require("http") 
//create a server out of http
const server = http.createServer(app); 
const { Server } = require("socket.io"); 

//pass the server object to the server of socket.io and define the cors
const io = new Server(server , {  
  cors: {
    origin: "*"
  }
}); 


io.on('connection', (socket) =>{ 
  //this will happen when a user is conected to the socket server
  console.log('user connected') 
  //this is the id assigned to the conection
  console.log(socket.id)
  //when a message come we take the message and the nickname
  socket.on('message', (message, nickname) => {

      // broadcast.emit send the message to all users conected
      
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

server.listen(5005, () => {    
  console.log(`Server listening on http://localhost:${5005}`);
});


module.exports = app;
