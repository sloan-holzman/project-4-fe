import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";


class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
     axios({
      method: "POST",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        retailer: e.target[0].value,
        number: e.target[1].value,
        pin: e.target[2].value,
        expiration: e.target[3].value,
        balance: e.target[4].value
      }
    })
    .then(response => {
      console.log(response)
      if (response.data) {
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {console.log(err)})
  }

  render () {
    console.log(this.props)
    let content = !!this.props.isAuthenticated ?
      ( <div><h3>Enter New Card</h3>
        <form onSubmit={this.handleSubmit}>
          <label for="retailer">Retailer:</label>
          <input type="text" id="retailer" name="retailer" placeholder="e.g. JCrew, Amazon, etc."/>
          <label for="number">Gift Card Number:</label>
          <input type="text" id="number" name="number" placeholder="e.g. 0123456789"/>
          <label for="number">Gift Card PIN:</label>
          <input type="text" id="number" name="pin" placeholder="e.g. 1234"/>
          <label for="expiration">Expiration Date:</label>
          <input type="date" id="expiration" name="expiration"/>
          <label for="balance">Remaining Balance ($):</label>
          <input type="number" id="balance" name="balance" placeholder="e.g. $100.00"/>
          <input className="waves-effect waves-light btn" type="submit" value="Add"/>
        </form></div>) :
      (<p>You must be logged in before adding a card</p>)
    return (
      <div>
        {content}
      </div>
    )
  }
}


export default NewCard
