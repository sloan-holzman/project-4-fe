import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";
import { fetchUser } from '../actions/cards'
import { connect } from 'react-redux'
import '../stylesheets/loginout.css'


class LogInOut extends Component {

  componentDidMount(){
    if (localStorage.token && !this.props.user) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    let loginUrl=`${backend}api/v1/auth/twitter`
    let requestTokenUrl=`${backend}api/v1/auth/twitter/reverse`
    let content =
      (
        <div className="background">
          <h1>virtual wallet</h1>
          <h5>the one site to save all your gift cards & coupons</h5>
          {
            !this.props.user ?
              <div>
                <div className="login-button">
                  <TwitterLogin loginUrl={loginUrl}
                    className="login-button" onFailure={this.props.onFailedLogin} onSuccess={this.props.onSuccessLogin}
                    requestTokenUrl={requestTokenUrl}/>
                </div>
                <div className="twitter-logout" >
                  <a href="https://twitter.com/logout" target="_blank" rel="noopener noreferrer">log out of your twitter account</a>
                </div>
              </div>
            : <div>
              <br/>
              {this.props.email? `welcome, ${this.props.email}` : ""}
            </div>
          }

        </div>
      )

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect()(LogInOut)
