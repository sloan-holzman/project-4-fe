import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import backend from "../BackendVariable";
import Overview from "./Overview.js"
import { fetchUser } from '../actions/cards'
import { connect } from 'react-redux'
import '../stylesheets/loginout.css'



class LogInOut extends Component {
  constructor(props) {
    super(props);
  }

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
            {/* <p id="alert">{this.props.alert}</p> */}
            <h1>virtual wallet</h1>
            <h5>the one site to save all your gift cards & coupons</h5>
            {
              !this.props.user || localStorage.length === 0 ?
                <div>
                  <div className="login-button">
                    <TwitterLogin loginUrl={loginUrl}
                      onFailure={this.props.onFailedLogin} onSuccess={this.props.onSuccessLogin}
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
