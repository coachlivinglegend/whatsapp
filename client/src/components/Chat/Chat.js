import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatReceived from './ChatReceived/ChatReceived';
import ChatSent from './ChatSent/ChatSent';
import axios from '../../axios'

const Chat = ({ messages }) => {
    const [msg, sendMsg] = useState('')

    useEffect(() => {
        const chatBody = document.querySelector('.chat__body');
        chatBody.scrollTop = chatBody.scrollHeight;
        console.log(chatBody)
    }, [])

    const sendMessage = async (event) => {
        event.preventDefault();
        await axios.post('/messages/new', {
            message: msg,
            name: "James Harden",
            timestamp: (new Date()).toString().slice(16, 21),
            received: true
        })
        
        sendMsg('')
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreHorizIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    messages.map(({ _id, name, message, timestamp, received}) => {
                        if (received) {
                            return <ChatReceived key={_id} name={name} message={message} time={timestamp} />
                        } else {
                            return <ChatSent key={_id} name={name} message={message} time={timestamp} />
                        }
                    })
                }
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form
                    onSubmit={sendMessage}
                >
                    <input
                        value={msg}
                        onChange={(e) => sendMsg(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
