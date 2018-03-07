import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";
import Overview from "../components/Overview.js"
import { connect } from 'react-redux'
import '../stylesheets/loginout.css'
import {fetchUser, setAlert, receiveUser} from '../actions/cards'


class LogInOut extends Component {
  constructor(props) {
    super(props);
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.onFailedLogin = this.onFailedLogin.bind(this)
  }

  onSuccessLogin = (response) => {
    response.json()
    .then(userInfo => {
      if (response.headers.get('x-auth-token')) {
        localStorage.token = response.headers.get('x-auth-token');
        this.props.dispatch(receiveUser({data: userInfo}))
        this.props.dispatch(setAlert("congrats, you logged in successfully"))
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      this.onFailedLogin(err)
    });
  };

  onFailedLogin = (error) => {
    localStorage.clear()
    this.props.dispatch(setAlert("woops, something went wrong"))
    alert(error);
  };

  componentDidMount(){
    if (localStorage.token && !this.props.user) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    // request token is what's originally hit when the user clicks the TwitterLogin button
    let requestTokenUrl=`${backend}api/v1/auth/twitter/reverse`
    // after receiving back the request token, opening twitter.com to get authorization from the user and receiving the verification code, the front end then hits the loginURL with the verification code (oauth_verifier) included
    let loginUrl=`${backend}api/v1/auth/twitter`
    // full details on how TwitterLogin works can be found at https://www.npmjs.com/package/react-twitter-auth and https://medium.com/@robince885/how-to-do-twitter-authentication-with-react-and-restful-api-e525f30c62bb

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

const mapStateToProps = state => ({
  user: state.cardReducer.user,
  email: state.cardReducer.email,
  alert: state.cardReducer.alert,
})

export default connect(mapStateToProps)(LogInOut)
