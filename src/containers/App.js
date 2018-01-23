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
import CardHolder from "../components/CardHolder"
import { login, logout, fetchUser, setAlert, clearAlert, setAlertSeen, forceUpdate } from '../actions/cards'
import '../stylesheets/app.css'
import '../stylesheets/mobile.css'
import '../stylesheets/materialize.css'
import axios from "axios";
import backend from "../BackendVariable";

class App extends Component {

  constructor() {
    super();
    this.onSuccessLogin = this.onSuccessLogin.bind(this)
    this.onFailedLogin = this.onFailedLogin.bind(this)
    this.logout = this.logout.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
    this.setAlert = this.setAlert.bind(this)
    this.setAlertSeen = this.setAlertSeen.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
    this.goToCard = this.goToCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount(){
    if (localStorage.token && localStorage.length > 0) {
      this.props.dispatch(fetchUser())
    } else {
      this.logout()
    }
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

  goToCard(e, id) {
    e.preventDefault();
    this.props.history.push(`/cards/${id}`)
  }

  deleteCard(e, id) {
    e.preventDefault();
     axios({
      method: "DELETE",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        card_id: id
      }
    })
    .then(response => {
      if (response.data) {
        this.props.dispatch(fetchUser())
        this.setAlert("card delete successfully")
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
      this.setAlert("woops, something went wrong")
    })
  }


  onFailedLogin = (error) => {
    localStorage.clear()
    alert(error);
  };

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
                    onSuccessLogin={this.onSuccessLogin}
                    onFailedLogin={this.onFailedLogin}
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
                  <NewCard
                    isAuthenticated={this.props.isAuthenticated}
                    isFetching={this.props.isFetching}
                    clearAlert={this.clearAlert}
                    setAlertSeen={this.setAlertSeen}
                    setAlert={this.setAlert}
                    forceUpdate={this.forceUpdate}
                    retailers={this.props.retailers}
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
                    clearAlert={this.clearAlert}
                    setAlertSeen={this.setAlertSeen}
                    setAlert={this.setAlert}
                    forceUpdate={this.forceUpdate}
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
                    cards={this.props.cards}
                    history={this.props.history}
                    deleteCard={this.deleteCard}
                    clearAlert={this.clearAlert}
                    setAlertSeen={this.setAlertSeen}
                    setAlert={this.setAlert}
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
