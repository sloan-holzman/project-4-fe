import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";
import coverPhoto from "../imgs/gift-cards.jpg"

class LogInOut extends Component {

  componentDidMount(){
    if (localStorage.token) {
      this.props.history.push(`/cards`)
    }
  }



  render() {
    let loginUrl=`${backend}api/v1/auth/twitter`
    let requestTokenUrl=`${backend}api/v1/auth/twitter/reverse`
    let content = !!this.props.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.props.user.email}
          </div>
          <div>
            <button onClick={this.props.logout} className="waves-effect waves-light btn" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <div className="background">
          <h1>VIRTUAL WALLET</h1>
          <h5>The one site to save all your gift cards</h5>
          <div className="login-button">
            <TwitterLogin loginUrl={loginUrl}
              className="login-button" onFailure={this.props.onFailedLogin} onSuccess={this.props.onSuccessLogin}
              requestTokenUrl={requestTokenUrl}/>
          </div>
        </div>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default LogInOut
