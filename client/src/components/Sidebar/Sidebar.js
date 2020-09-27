import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from '../SidebarChat/SidebarChat';
import UserContext from '../../ContextAPI/User/UserContext'
import axios from '../../axios'

const Sidebar = () => {
    const User = useContext(UserContext)
    const { _id, displayName, email, avatar, appPhoneNumber } = User
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

    const showProfile = () => {
        const profile = document.querySelector('.sidebar__profile')
        profile.style.display = "flex"
    }

    const hideProfile = () => {
        const profile = document.querySelector('.sidebar__profile')
        profile.style.display = "none"
    }


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar onClick={showProfile} src={avatar}/>
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
            </div>
            <div className="sidebar__profile">
                <div className="profile__top">
                    <span> 
                        {/* <IconButton> */}
                            <ArrowBackRoundedIcon onClick={hideProfile}/>
                        {/* </IconButton> */}
                    </span>
                    <span>Profile</span>
                </div>
                <div className="profile__picture">
                    <Avatar src={avatar}/>
                </div>
                <div className="profile__details">
                    <div>
                        <div className="profile__details__name">Your Name</div>
                        <div className="profile__details__fact">{displayName}</div>
                    </div>
                    <div>
                        <div className="profile__details__name">Your Phone Number</div>
                        <div className="profile__details__fact">{appPhoneNumber}</div>
                    </div>
                </div>
                <div className="profile__story">
                    <p>This is your username and the phone number we have assigned to you. This is the phone number your friends will contact you with.</p>
                </div>
                <div className="profile__base">

                </div>
            </div>
        </div>
    )
}

export default Sidebar
