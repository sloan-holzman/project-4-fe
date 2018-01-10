import React, { Component } from 'react';


class LogOut extends Component {
  componentDidMount(){
    this.props.logout()
    this.props.history.push(`/login`)
  }
  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    );
  }
}
export default LogOut
