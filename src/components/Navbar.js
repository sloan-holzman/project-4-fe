import React, { Component } from 'react';
import {
  Link
} from "react-router-dom"

class Navbar extends Component {


  render() {
        return (
          <nav>
            <div className="nav-wrapper">
              <a href="/cards" className="brand-logo">Virtual Wallet</a>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/cards">Home</Link></li>
                <li><Link to="/cards/new">Add Card</Link></li>
                {
                  this.props.isAuthenticated ?
                    <li><Link to="/logout">Logout</Link></li> :
                    <li><Link to="/login">Login</Link></li>
                }
              </ul>
              <ul ref="sidenav" className="sidenav" id="mobile-demo">
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
    );
  }
}



export default Navbar
