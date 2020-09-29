import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import React, { useEffect, useState, useContext } from 'react'
import './Chat.css'
import ChatReceived from './ChatReceived/ChatReceived';
import ChatSent from './ChatSent/ChatSent';
import axios from '../../axios'
import back from './wallpaper.PNG'
import { withRouter } from 'react-router-dom';
import UserContext from '../../ContextAPI/User/UserContext'
import Pusher from 'pusher-js'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const Chat = ({ match }) => {
    const User = useContext(UserContext)
    const [msg, sendMsg] = useState('')
    // const [message, sendMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [chatInfo, setChatInfo] = useState('')
    const [chat_Id, setChat_Id] = useState('')
    const [reactPusher, setReactPusher] = useState(1)

    useEffect(() => {
        const pusher = new Pusher('32f57dadcb8ff9637c3c', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('chats');
        channel.bind('updated', (newMessage) => {
            console.log(newMessage)
            // setAllMessages([...allMessages, newMessage])
            setReactPusher(reactPusher+1)
        })
    
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [allMessages])


    // useEffect(() => {
    //     const side = document.querySelector('.sidebar')
    //     const chat = document.querySelector('.chat')
    //     chat.style.display = "flex"
    //     side.style.display = "none"
    
    // }, [match.params.chatId])

    useEffect(() => {
        const chatBody = document.querySelector('.chat__body');
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;            
        }, 1000);
    }, [allMessages])

    useEffect(() => {
        axios.post(`/contacts/contactId/${match.params.chatId}`, {
            ath: match.params.chatId
        })
        .then(response => {
            const chat = response.data
            console.log(response.data)
            setChat_Id(chat._id)
            const chatMessage = chat.messages
            console.log(chatMessage)
            setAllMessages(chatMessage)

            const chatDetails = chat.authors
            console.log({chatDetails})
            console.log({User})
            if (chatDetails[0]._id === User._id) {
                setChatInfo(chatDetails[1])
            } else if (chatDetails[0]._id !== User._id) {
                setChatInfo(chatDetails[0])
            }
        })

        if (window.innerWidth > 712) {
            return
        }
        setTimeout(() => {
            const side = document.querySelector('.sidebar')
            const chat = document.querySelector('.chat')
            chat.style.display = "flex"
            side.style.display = "none"            
        }, 500);

    }, [match.params.chatId, reactPusher])

    const sendMessage = async (event) => {
        event.preventDefault();
        await axios.put(`/chat/id/${chat_Id}`, {
            message: msg,
            sender: User._id,
            id: chat_Id,
            timestamp: (new Date()).toString().slice(16, 21),
        })
        
        sendMsg('')
    }

    const showChat = () => {
        const side = document.querySelector('.sidebar')
        const chat = document.querySelector('.chat')
        chat.style.display = "none"
        side.style.display = "flex"
        side.style.flex = 1
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <ArrowBackRoundedIcon onClick={showChat} className="chat__header__arrowBack"/>
                <Avatar src={chatInfo.avatar}/>
                <div className="chat__headerInfo">
                    <h3>{chatInfo.displayName}</h3>
                    <p>{chatInfo.appPhoneNumber}</p>
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
            <div style={{backgroundImage: `url(${back})`}} className="chat__body">
                {
                    allMessages.map(({ _id, message, timestamp, sentBy}) => {
                        if (sentBy !== User._id) {
                            return <ChatReceived key={_id} name={sentBy} message={message} time={timestamp} />
                        } else {
                            return <ChatSent key={_id} name={sentBy} message={message} time={timestamp} />
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

export default withRouter(Chat)