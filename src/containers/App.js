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
import { logout, fetchUser, setAlert, clearAlert, setAlertSeen, forceUpdate } from '../actions/cards'
import '../stylesheets/app.css'
import '../stylesheets/mobile.css'
import '../stylesheets/materialize.css'

class App extends Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.setAlert = this.setAlert.bind(this)
    this.setAlertSeen = this.setAlertSeen.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
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

  clearAlert = () => {
    this.props.dispatch(clearAlert())
  }

  setAlertSeen = () => {
    this.props.dispatch(setAlertSeen())
  }

  setAlert = (alert) => {
    this.props.dispatch(setAlert(alert))
  }

  forceUpdate = () => {
    this.props.dispatch(forceUpdate())
  }

  render() {
    return (
      <div>
        <Navbar user={this.props.user} alert={this.props.alert}/>
        <div className="main">
          <Switch>
            <Route exact path="/cards" render={props => {
              return (
                <Dashboard
                  clearAlert={this.clearAlert}
                  setAlertSeen={this.setAlertSeen}
                  setAlert={this.setAlert}
                  {...props}
                />
              );
            }} />
            <Route exact path="/"
              render={props => {
                return (
                  <LogInOut
                    logout={this.logout}
                    email={this.props.email}
                    user={this.props.user}
                    alert={this.props.alert}
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
                    clearAlert={this.clearAlert}
                    setAlertSeen={this.setAlertSeen}
                    setAlert={this.setAlert}
                    forceUpdate={this.forceUpdate}
                    {...props}
                  />
                );
              }} />
            <Route exact path="/cards/edit/:id"
              render={props => {
                return (
                  <CardHolder
                    type="Edit"
                    cards={this.props.cards}
                    isFetching={this.props.isFetching}
                    isAuthenticated={this.props.isAuthenticated}
                    retailers={this.props.retailers}
                    {...props}
                  />
                );
              }}  />
            <Route exact path="/cards/:id"
              render={props => {
                return (
                  <CardHolder
                    type="Show"
                    cards={this.props.cards}
                    history={this.props.history}
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
