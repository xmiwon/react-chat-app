import React from 'react'
import io from 'socket.io-client'
import './Chat.css'
import Input from '../Input/Input'
import Display from '../Display/Display'


//Create connection to the server's socket.io
let socket;

const initialState = {
    tempName: '',
    message: '',
    messages: [], // name, text, date go here
    typing: ''
}

class Chat extends React.Component {
    constructor() {
        super()
        this.state = initialState
    }

    fetchData = () => {
        fetch('http://localhost:4001/chat')
        .then(response => response.json())
        .then(data => this.setState({messages: data}))
      }

    componentDidMount() {
        this.fetchData()
        socket = io.connect('http://localhost:4001')
        
        //message from bot
        socket.on('message', data => {
            console.log(data)
            this.setState(prevState => ({messages: [...prevState.messages, data]}))
        })

        //When a user joins, send his name to server
        this.setState({tempName: this.props.tempName}, () => {
            socket.emit('join', { name: this.state.tempName })
        })
    
            
        //"client receiving chat message from other clients" receiving from server
        socket.on('chat', data => {
            console.log(this.state.messages, 'from chat socket')
            this.setState({ typing: '' })
            //USE THIS FOR STORING ON CLIENT SIDE
            this.setState(prevState => ({
                messages: [...prevState.messages, data]})
                ) 
            //this.fetchData()  USE THIS FOR STORING ON SERVER SIDE
        })
        
        
        
        socket.on('typing', data => {
            this.setState({ typing: data })
        })
    } 

    typing = (event) => {
        if (this.state.message.length > -1) {
            return socket.emit('typing', `${this.state.tempName} is typing..`)
        } 
}

    sendButton = (event) => {
        event.preventDefault()
        if(this.state.message.length > 0) {
            socket.emit('chat', {name: this.state.tempName, message: this.state.message })
            this.setState({message: ''})          
        }
    }
    
    typeMessage = (textInput) => {
        this.setState({message: textInput})
        
    }

   
 render() {
        return (
            <div className="outer-box">
                
                <div className="box">
                <p>{this.state.typing}</p>
                    <Display
                        currentUser={this.state.tempName}
                        messages={this.state.messages} />
                    <Input
                        //this one is to empty the input
                        message={this.state.message}
                        typing={this.typing}
                        sendButton={this.sendButton}
                        typeMessage={this.typeMessage}
                    />
                </div>
            </div>
        )
    }
}

export default Chat;