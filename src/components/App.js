import React, { Component } from 'react'
import {
  Link,
  withRouter
} from "react-router-dom"
import LogInOut from "./LogInOut"

class App extends Component {
  render() {
    return (
      <div>
        <div className="nav">
          <div className="nav-item"><span className="nav-logo">iStocks</span></div>
          <div className="nav-item"><Link to="/cards">Home</Link></div>
          <div className="nav-item"><Link to="/cards/new">Add Card</Link></div>
          <div className="nav-item"><Link to="/login">Login</Link></div>
        </div>

        <div className="main">

          <LogInOut />

        </div>
      </div>
    );
  }
}



export default withRouter(App);
