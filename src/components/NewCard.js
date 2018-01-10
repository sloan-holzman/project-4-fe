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
        retailer: e.target[0].value.toLowerCase(),
        number: e.target[1].value,
        pin: e.target[2].value,
        expiration: e.target[3].value,
        balance: e.target[4].value
      }
    })
    .then(response => {
      if (response.data) {
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  render () {
    let content = !!this.props.isAuthenticated ?
      ( <div>
        <h3>enter new card</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="retailer" name="retailer" required placeholder="e.g. j crew, amazon, etc."/>
          <label for="retailer">retailer</label>
          <input type="number" id="number" required name="number" placeholder="e.g. 0123456789"/>
          <label for="number">gift card number</label>
          <input type="number" id="number" name="pin" placeholder="e.g. 1234"/>
          <label for="number">gift card pin</label>
          <input type="date" id="expiration" name="expiration"/>
          <label for="expiration">expiration date</label>
          <input type="number" id="balance" name="balance" min= "0" step="0.01" placeholder="e.g. $100.00"/>
          <label for="balance">remaining balance ($)</label>
          <br/>
          <input className="waves-effect waves-light btn" type="submit" value="add"/>
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
