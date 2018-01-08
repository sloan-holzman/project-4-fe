import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { login, logout } from '../actions/cards'
import { connect } from 'react-redux'


class LogInOut extends Component {

  constructor() {
    super();
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.onFailedLogin = this.onFailedLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  onSuccessLogin = (response) => {
    console.log("success")
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.props.dispatch(login(user, token))
        this.props.history.push(`/cards`)
      }
    });
  };

  onFailedLogin = (error) => {
    console.log("failed")
    console.log(error)
    alert(error);
  };

  logout = () => {
    this.props.dispatch(logout())
  };

  render() {
    let content = !!this.props.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.props.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="waves-effect waves-light btn" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:1337/api/v1/auth/twitter"
          onFailure={this.onFailedLogin} onSuccess={this.onSuccessLogin}
        requestTokenUrl="http://localhost:1337/api/v1/auth/twitter/reverse"/>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token
})


export default connect(mapStateToProps)(LogInOut)
