import React, { useContext, useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import UserContext from '../../ContextAPI/User/UserContext'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import Pusher from 'pusher-js'


const SidebarChat = ( { contact } ) => {
    const User = useContext(UserContext)
    const { _id } = User
    const [chatDisplayDetails, setChatDisplayDetails] = useState('')
    const [lastMessage, setLastMessage] = useState('')
    const [pusherChanged, setPusher] = useState('')

    useEffect(() => {
        if (contact.participants[0].sender._id === _id) {
            setChatDisplayDetails(contact.participants[1].receiver)
        } else if (contact.participants[0].sender._id !== _id) {
            setChatDisplayDetails(contact.participants[0].sender)
        }
    }, [_id, contact.participants])

    useEffect(() => {
        const pusher = new Pusher('32f57dadcb8ff9637c3c', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('chats');
        channel.bind('updated', (newMessage) => {
            setPusher({msg : newMessage.message, time: newMessage.timestamp})
        })
    
    }, [pusherChanged])

    useEffect(() => {
        axios.post(`/contacts/contactId/${contact._id}`, {
            ath: contact._id
        })
        .then(response => {
            const chat = response.data
            const chatMessage = chat.messages.slice(-1)[0]
            chatMessage ? setLastMessage({msg : chatMessage.message, time: chatMessage.timestamp}) : setLastMessage('')
        })
    }, [contact._id, pusherChanged])


    return (
        <Link className="link" to={`/chat/${contact._id}`}>
            <div className="sidebarChat">
                <div className="sidebarChat__avatar">
                    <Avatar src={chatDisplayDetails.avatar}/>
                </div>
                <div className="sidebarChat__info">
                    <h3><span>{chatDisplayDetails.displayName}</span> <span className="chatLastTime">{lastMessage? lastMessage.time: ''}</span></h3>
                    <p>{lastMessage? lastMessage.msg: (chatDisplayDetails.displayName === User.displayName ? 'wants to start a conversation' : 'Send a message.')}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
