import React, { Component } from 'react'
import {
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom"
import LogInOut from "../components/LogInOut"
import LogOut from "../components/LogOut"
import Dashboard from "./Dashboard"
import Navbar from "../components/Navbar"
import NewCard from "../components/NewCard"
import EditCard from "../components/EditCard"
import { login, logout, fetchUser } from '../actions/cards'
import { connect } from 'react-redux'


class App extends Component {

  constructor() {
    super();
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.onFailedLogin = this.onFailedLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    if (localStorage.token) {
      this.props.dispatch(fetchUser())
    }
  }

  onSuccessLogin = (response) => {
    response.json()
    .then(user => {
      if (response.headers.get('x-auth-token')) {
        localStorage.token = response.headers.get('x-auth-token');
        this.props.dispatch(login(user))
        this.props.history.push(`/cards`)
      }
    });
  };

  onFailedLogin = (error) => {
    alert(error);
  };

  logout = () => {
    localStorage.clear()
    this.props.dispatch(logout())
  };



  render() {
    return (
      <div>
        <Navbar isAuthenticated={this.props.isAuthenticated}/>
        <div className="main">
          <Switch>
            <Route exact path="/cards" component={Dashboard} />
            <Route exact path="/login"
              render={props => {
                return (
                  <LogInOut
                    onSuccessLogin={this.onSuccessLogin}
                    onFailedLogin={this.onFailedLogin}
                    logout={this.logout}
                    {...props}
                  />
                );
              }} />
            <Route exact path="/logout"
              render={props => {
                return (
                  <LogOut
                    logout={this.logout}
                    {...props}
                  />
                );
              }} />
            <Route exact path="/cards/new"
              render={props => {
                return (
                  <NewCard
                    isAuthenticated={this.props.isAuthenticated}
                    {...props}
                  />
                );
              }} />
            <Route exact path="/cards/edit/:id"
              render={props => {
                return (
                  <EditCard
                    cards={this.props.cards}
                    {...props}
                  />
                );
              }}  />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token,
  cards: state.cardReducer.cards,
  isFetching: state.cardReducer.isFetching,
  didInvalidate: state.cardReducer.didInvalidate
})


export default withRouter(connect(mapStateToProps)(App))
