const express = require('express')
      socketio = require('socket.io')
      app = express()
      server = app.listen(4000, () => {
        console.log('Listening on port 4000')
      })
const { userJoin, userLeaves, findsUser } = require('./utils/users')
      formatMessage = require('./utils/message')
const io = socketio(server)

//Turns on
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
    socket.emit('message', formatMessage('Chat Bot', 'Hi there!'))

    socket.on('join',({name})=> {
        userJoin(socket.id, name)
        const user1 = findsUser(socket.id)
        console.log(user1, 'from join')
        if(user1) {
            socket.broadcast.emit('message', formatMessage('Chat Bot', `${user1.name}has joined!`))
        }
    })

    

    // Handle chat event
    socket.on('chat', (data) =>{
        //sockets with s refers to all sockets that are connected. 
        //emit - receives data from one client and sending the data to all sockets
        
        io.sockets.emit('chat', formatMessage(data.name, data.message)) 
    })

    socket.on('typing', (data) => {
        console.log(data)
        socket.broadcast.emit('typing', data)
    })


    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        console.log('User has disconnected:', user)

        
        if(user) {
            socket.broadcast.emit('message', formatMessage('Chat Bot', `User '${user.name}' has left the chat!`))
        }
        
    })
})

