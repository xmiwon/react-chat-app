import React from 'react'
import './Message.css'

const Message = ({ message, name, currentUser, date }) => {
    let isSentByCurrentUser = false;
    const trimName = currentUser.trim().toLowerCase()
    if(name === trimName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser ? (
            <div>
                <div className="sentText2 pl-10-2">{name}
                    
                </div>
                <div className="messageContainer">
                    <div className="messageBox backgroundBlue">
                        <div className="messageText colorDark">{message}<div className="time">{date}</div></div>
                    </div>
                </div>
            </div>
    ): (
            name === 'Chat Bot' ? (
                <div>
                    <div className="sentText pl-10 pr-10">{name}<div className="botText">BOT</div></div>
                    <div className="messageContainer justifyStart">
                            <div className="messageBox backgroundBot">
                                <div className="messageText colorDark">{message}<div className="time">{date}</div></div>
                            </div>
                    </div>
                    </div>
                  ): (
                      <div>
                      <div className="sentText pl-10 pr-10">{name}</div>
                        <div className="messageContainer justifyStart">
                                <div className="messageBox backgroundLight">
                                    <div className="messageText colorDark">{message}<div className="time">{date}</div></div>
                                </div>
                        </div>
                        </div>
                  )
              
            
          )
    )
}

export default Message;