import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom"
import LogInOut from "../components/LogInOut"
import LogOut from "../components/LogOut"
import Navbar from "../components/Navbar"
import NewCard from "../components/NewCard"
import EditCard from "../components/EditCard"
import Dashboard from "./Dashboard"
import { login, logout, fetchUser } from '../actions/cards'
import '../stylesheets/app.css'


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
    localStorage.clear()
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
            <Route exact path="/"
              render={props => {
                return (
                  <LogInOut
                    onSuccessLogin={this.onSuccessLogin}
                    onFailedLogin={this.onFailedLogin}
                    logout={this.logout}
                    email={this.props.email}
                    isAuthenticated={this.props.isAuthenticated}
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
                    isFetching={this.props.isFetching}
                    {...props}
                  />
                );
              }} />
            <Route exact path="/cards/edit/:id"
              render={props => {
                return (
                  <EditCard
                    cards={this.props.cards}
                    isFetching={this.props.isFetching}
                    {...props}
                  />
                );
              }}  />
            <Route
              path="/*"
              render={props => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  email: state.cardReducer.email,
  token: state.cardReducer.token,
  cards: state.cardReducer.cards,
  isFetching: state.cardReducer.isFetching,
  didInvalidate: state.cardReducer.didInvalidate
})


export default withRouter(connect(mapStateToProps)(App))
