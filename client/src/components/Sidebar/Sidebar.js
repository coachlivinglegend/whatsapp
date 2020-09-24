import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from '../SidebarChat/SidebarChat';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar/>
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
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
