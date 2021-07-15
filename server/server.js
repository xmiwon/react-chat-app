const path = require('path')
      express = require('express')
      socketio = require('socket.io')
      cors = require('cors')
      app = express()
      server = app.listen(4001, () => {
        console.log('Listening on port 4001')
      })
const { userJoin, userLeaves, findsUser } = require('./utils/users')
      formatMessage = require('./utils/message')
      io = socketio(server)
const  { messagesStorage, messagePush } = require('./database')
app.use(cors())

app.get('/chat', (req, res) => {
    res.send(messagesStorage)
    console.log('It works!!!!')
})

// app.use(express.static(path.join(__dirname, 'client/public/build/')))

//Turns on
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
    socket.emit('message', formatMessage('Chat Bot', 'Hi there!'))

    socket.on('join',({name})=> {
        userJoin(socket.id, name)
        const user1 = findsUser(socket.id)
        console.log(user1, 'from join')
        if(user1) {
            socket.broadcast.emit('message', formatMessage('Chat Bot', `${user1.name} has joined!`))
        }
    })
    // Handle chat event
    socket.on('chat', (data) =>{
        //sockets with s refers to all sockets that are connected. 
        //emit - receives data from one client and sending the data to all sockets
        io.sockets.emit('chat', messagePush(data.name, data.message)) 
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

