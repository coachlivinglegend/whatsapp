import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import React from 'react'
import './Chat.css'

const Chat = () => {
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
                <p className="chat__body__message">
                    <span style={{color: "tomato"}} className="chat__body__name">Sonny</span>
                    <span className="chat__body__content">This is a message</span>
                    <span className="chat__timestamp">
                        13:16
                    </span>
                    <span className="right__triangle"/>
                </p>
                <p className="chat__body__message">
                    <span style={{color: "greenyellow"}} className="chat__body__name">David</span>
                    <span className="chat__body__content">So how does that even concern me?</span>
                    <span className="chat__timestamp">
                        13:17
                    </span>
                    <span className="right__triangle"/>
                </p>
                <p className="chat__body__message">
                    <span style={{color: "tomato"}} className="chat__body__name">Sonny</span>
                    <span className="chat__body__content">Bro, are you sure it is me you're talking to?</span>
                    <span className="chat__timestamp">
                        13:18
                    </span>
                    <span className="right__triangle"/>
                </p>
                <p className="chat__body__receiver">
                    <span className="chat__body__content">Y'all niggas is wack, period!</span>
                    <span className="chat__timestamp">
                        13:18
                    </span>
                    <span className="left__triangle"/>
                </p>
                <p className="chat__body__message">
                    <span style={{color: "greenyellow"}} className="chat__body__name">David</span>
                    <span className="chat__body__content">Your own na to just dey talk, pipe!</span>
                    <span className="chat__timestamp">
                        13:20
                    </span>
                    <span className="right__triangle"/>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form
                    // onSubmit={sendMessage}
                >
                    <input
                        // value={input}
                        // onChange={(e) => setInput(e.target.value)}
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
