import React from 'react'
import { Link } from 'react-router-dom'
import './Page.css'

const Page = () => {
    return (
        <div className="page-outerBox">
        <h1>Chat App</h1>
            <div className="page-box">
            <Link to={`/chat`}> <div><input className="page-button" type="button" value="Start Chat"></input></div> </Link>
            </div>
        </div>
    )
}

export default Page;