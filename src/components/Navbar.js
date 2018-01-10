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
                <a href="/login" className="brand-logo  hide-on-med-and-down">virtual wallet</a>
                <ul className="right">
                  <li><Link to="/cards">home</Link></li>
                  <li><Link to="/cards/new">add card</Link></li>
                  {
                    this.props.isAuthenticated ?
                      <li><Link to="/logout">logout</Link></li> :
                      <li><Link to="/login">login</Link></li>
                  }
                </ul>
              </div>
            </nav>
          </div>
    );
  }
}



export default Navbar
