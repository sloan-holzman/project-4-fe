import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";
import Overview from "../components/Overview.js"
import { connect } from 'react-redux'
import '../stylesheets/loginout.css'
import { login, fetchUser, setAlert } from '../actions/cards'



class LogInOut extends Component {
  constructor(props) {
    super(props);
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.onFailedLogin = this.onFailedLogin.bind(this)
  }

  onSuccessLogin = (response) => {
    response.json()
    .then(user => {
      if (response.headers.get('x-auth-token')) {
        localStorage.token = response.headers.get('x-auth-token');
        this.props.dispatch(login(user))
        this.props.dispatch(setAlert("congrats, you logged in successfully"))
        this.props.history.push(`/cards`)
      }
    });
  };

  onFailedLogin = (error) => {
    localStorage.clear()
    alert(error);
  };

  componentDidMount(){
    if (localStorage.token && !this.props.user) {
      this.props.dispatch(fetchUser())
    }
    // document.getElementById('alert').style.display = "none"
  }

  componentWillUnmount(){
    // document.getElementById('alert').style.display = "block"
  }

  render() {
    let loginUrl=`${backend}api/v1/auth/twitter`
    let requestTokenUrl=`${backend}api/v1/auth/twitter/reverse`
    let content =
      (
        <div className= "home">
          <section className="background">
            <h1>virtual wallet</h1>
            <h5>the one site to save all your gift cards & coupons</h5>
            {
              !this.props.user || localStorage.length === 0 ?
                <div>
                  <div className="login-button">
                    <TwitterLogin loginUrl={loginUrl}
                      onFailure={this.onFailedLogin} onSuccess={this.onSuccessLogin}
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
          </section>
          <Overview />
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
