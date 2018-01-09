import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';


class LogInOut extends Component {

  componentDidMount(){
    if (localStorage.token) {
      this.props.history.push(`/cards`)
    }
  }



  render() {
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
        <TwitterLogin loginUrl="http://localhost:1337/api/v1/auth/twitter"
          onFailure={this.props.onFailedLogin} onSuccess={this.props.onSuccessLogin}
        requestTokenUrl="http://localhost:1337/api/v1/auth/twitter/reverse"/>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default LogInOut
