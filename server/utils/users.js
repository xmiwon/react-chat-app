const users = [] 

const userJoin = (id, name) => {
    const user = { id, name }
    users.push(user)
    console.log(users, 'from usersjs')
    return user
}

const findsUser = (id) => {
    const usersCopy = [...users]
    const userMatch = usersCopy.findIndex(user => user.id === id)
    
    if(userMatch !== -1) {
        return usersCopy.splice(userMatch, 1)[0]
    }
}

const userLeaves = (id) => {
    //finds the single user in the array of values and returns the number of location and wont check the remaining, then finally stores that single user in userMatch
    const userMatch = users.findIndex(user => user.id === id)

    //if such user exists, return. -1 means no such user exists
    if(userMatch !== -1) {
        //Removes the user that matches the number where its stored in userMatch, remove one after that and then choose the first item of the array to remove the braces
        return users.splice(userMatch, 1)[0]
    }
}


module.exports = {
    userJoin,
    userLeaves,
    findsUser
}