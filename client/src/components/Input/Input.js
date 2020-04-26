import React from 'react'
import './Input.css'

const Input = ({message, sendButton, typing, typeMessage}) => (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message.."
                value={message}
                maxLength="500"
                onKeyPress={(event)=> typing(event)}
                onChange={event => {
                    typeMessage(event.target.value)
                    typing(event)
                    }}
            />
            <button className="sendButton" onClick={(event) => sendButton(event)}>Send</button> 
        </form>
    
)

export default Input;