import React, { Component } from 'react';
import {
  Link
} from "react-router-dom"



class Navbar extends Component {

  render() {
        return (
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <a href="/login" className="brand-logo  hide-on-med-and-down">Virtual Wallet</a>
                <ul className="right">
                  <li><Link to="/cards">Home</Link></li>
                  <li><Link to="/cards/new">Add Card</Link></li>
                  {
                    this.props.isAuthenticated ?
                      <li><Link to="/logout">Logout</Link></li> :
                      <li><Link to="/login">Login</Link></li>
                  }
                </ul>
              </div>
            </nav>
          </div>
    );
  }
}



export default Navbar
