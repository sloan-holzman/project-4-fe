import React, { Component } from 'react'
import {
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom"
import LogInOut from "./LogInOut"
import LogOut from "./LogOut"
import Dashboard from "./Dashboard"
import Navbar from "./Navbar"
import NewCard from "./NewCard"
import EditCard from "./EditCard"


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <Switch>
            <Route exact path="/cards" component={Dashboard} />
            <Route exact path="/login" component={LogInOut} />
            <Route exact path="/logout" component={LogOut} />
            <Route exact path="/cards/new" component={NewCard} />
            <Route exact path="/cards/edit/:id" component={EditCard} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </div>
    );
  }
}



export default withRouter(App);
