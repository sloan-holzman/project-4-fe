import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";


class LogInOut extends Component {

  componentDidMount(){
    if (this.props.isAuthenticated) {
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
        <TwitterLogin loginUrl={loginUrl}
          onFailure={this.props.onFailedLogin} onSuccess={this.props.onSuccessLogin}
          requestTokenUrl={requestTokenUrl}/>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default LogInOut
