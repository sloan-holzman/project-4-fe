import React from 'react';
import {
  Link
} from "react-router-dom"
import '../stylesheets/navbar.css'



const Navbar = ({...props}) => {
  return (
    <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo  hide-on-med-and-down">virtual wallet</a>
            <ul className="right">
              <li><Link to="/cards">wallet</Link></li>
              <li><Link to="/cards/new">add new</Link></li>
              {
                props.user && localStorage.token ?
                  <li><Link to="/logout">logout</Link></li> :
                  <li><Link to="/">login</Link></li>
              }
            </ul>
          </div>
        </nav>
      </div>
      <div className="alert">
        <p id="alert">{props.alert}</p>
      </div>
    </div>
  )
}


export default Navbar
