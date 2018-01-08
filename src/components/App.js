import React, { Component } from 'react'
import {
  Link,
  withRouter
} from "react-router-dom"
import LogInOut from "./LogInOut"
import Dashboard from "./Dashboard"
import Navbar from "./Navbar"


class App extends Component {




  render() {
    // var elem = document.querySelector('.sidenav');
    // var instance = M.Sidenav.init(elem, options);
    return (
      <div>
        <Navbar />
        <div className="main">
          <LogInOut />
          <Dashboard />
        </div>
      </div>
    );
  }
}



export default withRouter(App);
