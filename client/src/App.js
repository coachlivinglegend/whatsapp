import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat'
import './App.css'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      console.log(response.data)
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('32f57dadcb8ff9637c3c', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    })

  }, [messages])

  console.log(messages)
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
