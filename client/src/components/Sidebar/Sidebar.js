import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from '../SidebarChat/SidebarChat';
import UserContext from '../../ContextAPI/User/UserContext'
import axios from '../../axios'

const Sidebar = () => {
    const User = useContext(UserContext)
    const { _id, displayName, email, avatar } = User
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        console.log(_id)
        axios.post('/contacts', {
            user: _id
        })
        .then(response => {
            console.log(response.data)
            setContacts(response.data)
        })
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                <IconButton>
                    <Avatar src={avatar}/>
                </IconButton>
                </div>
                <div className="sidebar__headerRight">
                        <div className="sidebar__status">
                    <IconButton>
                            <DonutLargeIcon/>
                    </IconButton>
                            <div className="sidebar__statusUpdate"/>                      
                        </div>

                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreHorizIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                {
                    contacts.map(contact => {
                        return <SidebarChat key={contact._id} contact={contact}/>
                    })
                }
                {/* <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
            </div>
        </div>
    )
}

export default Sidebar
