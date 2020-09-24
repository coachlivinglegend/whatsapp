import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'

const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <div className="sidebarChat__avatar">
                <Avatar />
            </div>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>This is the last message.</p>
            </div>
        </div>
    )
}

export default SidebarChat
