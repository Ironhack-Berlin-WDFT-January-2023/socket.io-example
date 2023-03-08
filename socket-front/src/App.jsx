//npm i socket.io-client (version for react)
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import axios from 'axios'

//important part ->
//Conection to catch and send message 
const socket = io('http://127.0.0.1:5005')


function App() {

  const [nickname, setNickname] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [storedMessages, setStoredMessages] = useState([])
  const [firstTime, setfirstTime] = useState(false)

  const url = "http://localhost:5005/api/"

  useEffect(() =>{
    const receivedMessage = (message) =>{
      setMessages([message, ...messages])
    
    }
    socket.on('message', receivedMessage)

    //Close the connection when the component is unmounted
    return () => {
      socket.off('message', receivedMessage)
    }
    

  }, [messages])

  //Charge first time the message
  if(!firstTime){
    axios.get(url + "messages")
    .then(res => {
      console.log(res.data)
      setStoredMessages(res.data);
    })
    setfirstTime(true)
  }
  

  const handlerSubmit = (e) => {
    e.preventDefault()

    //Send the message only if a nickname was already
    if(nickname !== ''){
      //console.log(message)
      //Send a message to the server
      socket.emit('message', message, nickname)

      //Our message
      const newMessage = {
        body: message,
        from: 'Yo'
      }
      //Add the message to the rest of the messages. 
      setMessages([newMessage, ...messages])
      //Clean the message
      setMessage('')

      //Request to save the message into the DB
      axios.post(url + 'save', {
        message: message,
        from: nickname
      })

    }else{
      alert('For send a mesage you first have to choose a nickname')
    }
    
  }

  const nicknameSubmit = (e) => {
    e.preventDefault()
    setNickname(nickname)
    //console.log(nickname)
    setDisabled(true)
  }

  return (
    <div className="App">
      <div className="container mt-3">

              <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="text-center mb-3">CHAT</h5>

                {/* nickname */}

                <form onSubmit={nicknameSubmit}>
                  <div className="d-flex mb-3">
                    <input type="text" className="form-control" id="nickname" placeholder="Nickname..." disabled={disabled} onChange={e => setNickname(e.target.value)} value={nickname} required/>
                    <button className="btn btn-success mx-3" type="submit" id="btn-nickname" disabled={disabled}>Establecer</button>
                  </div>
                </form>

                {/* chat form */}

                <form onSubmit={handlerSubmit}>
                  <div className="d-flex">
                    <input type="text" className="form-control" placeholder="Mensaje..." onChange={e => setMessage(e.target.value)} value={message}/>
                    <button className="btn btn-success mx-3" type="submit">Enviar</button>
                  </div>
                </form> 
              </div>
            </div>

            {/* chat messages */}

            <div className="card mt-3 mb-3 shadow border-0" id="content-chat">
              <div className="card-body">

                {messages && messages.map((message, index) => (
                  <div key={index} className={`d-flex p-3 ${message.from === "Yo" ? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 shadow border-1 ${message.from === "Yo" ? "bg-success bg-opacity-25" : "bg-light"}`}>
                      <div className="card-body">
                        <small className="">{message.from}: {message.body}</small>
                      </div>
                    </div>
                  </div>

                ))}

                {/* chat stored messages */}
                {storedMessages &&storedMessages.map((message, index) => (
                  <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 shadow border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-light"}`}>
                      <div className="card-body">
                        <small className="text-muted">{message.from}: {message.message}</small>
                      </div>
                    </div>
                  </div>

                ))}

              </div>
            </div>
      </div>
    </div>
  );
}

export default App;


