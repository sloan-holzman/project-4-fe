import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { login, logout } from '../actions/cards'
import { connect } from 'react-redux'


class LogOut extends Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this)
  }

  logout = () => {
    this.props.dispatch(logout())
  };

  componentDidMount(){
    this.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token
})


export default connect(mapStateToProps)(LogOut)
