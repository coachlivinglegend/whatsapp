import React from 'react'
import './ChatReceived.css'

const ChatReceived = ({name, message, timestamp}) => {
    return (
        <p className="chat__body__message">
            <span style={{color: "tomato"}} className="chat__body__name">{name}</span>
            <span className="chat__body__content">{message}</span>
            <span className="chat__timestamp">
                {timestamp}
            </span>
            <span className="right__triangle"/>
        </p>
    )
}

export default ChatReceived
