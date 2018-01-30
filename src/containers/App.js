import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom"
import LogInOut from "../containers/LogInOut"
import LogOut from "../components/LogOut"
import Navbar from "../components/Navbar"
import Dashboard from "./Dashboard"
import CardHolder from "../containers/CardHolder"
import { logout, fetchUser } from '../actions/cards'
import '../stylesheets/app.css'
import '../stylesheets/mobile.css'
import '../stylesheets/materialize.css'

class App extends Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    if (localStorage.token && localStorage.length > 0) {
      this.props.dispatch(fetchUser())
    } else {
      this.logout()
    }
  }

  logout = () => {
    localStorage.clear()
    this.props.dispatch(logout())
  };

  render() {
    return (
      <div>
        <Navbar user={this.props.user} alert={this.props.alert}/>
        <div className="main">
          <Switch>
            <Route exact path="/cards" render={props => {
              return (
                <Dashboard
                  {...props}
                />
              );
            }} />
            <Route exact path="/"
              render={props => {
                return (
                  <LogInOut
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
                  <CardHolder
                    type="New"
                    {...props}
                  />
                );
              }} />
            <Route exact path="/cards/edit/:id"
              render={props => {
                return (
                  <CardHolder
                    type="Edit"
                    {...props}
                  />
                );
              }}  />
            <Route exact path="/cards/:id"
              render={props => {
                return (
                  <CardHolder
                    type="Show"
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
  didInvalidate: state.cardReducer.didInvalidate,
  alert: state.cardReducer.alert,
  alertOn: state.cardReducer.alertOn,
  retailers: state.cardReducer.retailers
})


export default withRouter(connect(mapStateToProps)(App))
