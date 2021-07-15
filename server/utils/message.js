
const formatMessage = (username, text, date) => {
    return {
        name: username,
        message: text,
        date: new Date()
    }
}



module.exports = formatMessage