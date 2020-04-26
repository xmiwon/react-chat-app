import React from 'react'
import './Display.css'
import Message from '../Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom'

const Display = ({messages, currentUser}) => (
    <ScrollToBottom className="messages">
        {
            messages
                .map((item, id) => {
                    return <div key={id}>
                                <Message message={item.message} name={item.name} currentUser={currentUser} date={item.date} />
                            </div>
                    })
        }
        
    </ScrollToBottom>

)

export default Display;