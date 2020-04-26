import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Chat from './components/Chat/Chat'


const initialState = {
  tempName: '',
  hasName: false
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }



  tempNameInput = (name) => {
    this.setState({tempName: name.trim().toLowerCase()}, () => (
      this.state.tempName.length >= 3 ? 
         this.setState({hasName: true}) 
        : this.setState({hasName: false}) 
    ))
  }


render() {
  return (
  <Router>
      <Route path="/chat" exact>
        {
          this.state.hasName === true ? (
            <Chat tempName={this.state.tempName} />
          ) :
            <div className="page-outerBox">
              <div className="page-box">
                <h1 className="page-noExist">Page doesn't exist!</h1>
              </div>
            </div>
        }
      </Route>
      <Route path="/" exact>
        <div className="page-outerBox">
          <h1>Chat App</h1>
          <div className="page-box">
            <div className="page-innerBox">
              <Link to={`/chat`}>
                {
                  this.state.hasName === true ? (
                    <input
                      className="page-button"
                      type="button"
                      value="start">
                    </input>
                  ) : <input
                    className="page-button"
                    type="button"
                    value="start"
                    disabled>
                    </input>
                }

              </Link>
              <input
                className="page-input"
                type="text"
                placeholder="Your name.."
                maxLength="10"
                onChange={(event) => this.tempNameInput(event.target.value)}
              />
            </div>
          </div>
        </div>
      </Route>
  </Router>
    
  );
}
  
}

export default App;
