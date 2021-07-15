const messagesStorage = []


messagePush = (name, message) => {
    const store = { name, message }
    messagesStorage.push({
        name: store.name,
        message: store.message, 
        date: new Date()
    })
    console.log(messagesStorage)
    return {
        name: store.name,
        message: store.message,
        date: new Date()
    }
    
}

module.exports = {
    messagesStorage,
    messagePush
}