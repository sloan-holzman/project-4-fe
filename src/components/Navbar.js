import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { login, logout } from '../actions/cards'
import { connect } from 'react-redux'
import {
  Link,
  withRouter
} from "react-router-dom"

class Navbar extends Component {

  constructor() {
    super();
  }

  // componentDidMount(){
  //   // var elem = document.querySelector('.sidenav');
  //   var elem = this.refs.sidenav
  //   var instance = M.Sidenav.init(elem, options);
  // }

  render() {
        return (
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Virtual Wallet</a>
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

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
})


export default connect(mapStateToProps)(Navbar)
