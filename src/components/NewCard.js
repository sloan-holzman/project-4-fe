import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import {Row, Input} from 'react-materialize'


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
    .catch(err => {
      console.log(err)
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  render () {
    console.log(this.props)
    let content = !!this.props.isAuthenticated ?
      ( <div>
        <h3>Enter New Card</h3>
        <form onSubmit={this.handleSubmit}>
          <label for="retailer">Retailer:</label>
          <input type="text" id="retailer" name="retailer" placeholder="e.g. J Crew, Amazon, etc."/>
          <label for="number">Gift Card Number:</label>
          <input type="number" id="number" name="number" placeholder="e.g. 0123456789"/>
          <label for="number">Gift Card PIN:</label>
          <input type="number" id="number" name="pin" placeholder="e.g. 1234"/>
          <label for="expiration">Expiration Date:</label>
          <input type="date" id="expiration" name="expiration"/>
          <label for="balance">Remaining Balance ($):</label>
          <input type="number" id="balance" name="balance" placeholder="e.g. $100.00"/>
          <input className="waves-effect waves-light btn" type="submit" value="Add"/>
        </form>
        {/* <Row>
          <Input type="text" id="retailer" s={12} name="retailer" placeholder="e.g. JCrew, Amazon, etc."/>
          <Input label="Gift Card Number" type="number" id="number" s={12} name="number" placeholder="e.g. 0123456789"/>
          <Input label="Gift Card Number" type="number" id="pin" s={12} name="pin" placeholder="e.g. 1234"/>
          <Input label= "Expiration Date" type="date" id="expiration" s={12} name="expiration"/>
          <Input label="Remaining Balance" type="number" id="balance" s={12} name="balance" placeholder="e.g. $100.00"/>
          <Input className="waves-effect waves-light btn" type="submit" value="Add"/>
        </Row> */}
      </div>) :
      (
        <p>You must be logged in before adding a card</p>
      )
    return (
      <div>
        {content}
      </div>
    )
  }
}


export default NewCard
