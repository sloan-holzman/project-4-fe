import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";


class EditCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
     axios({
      method: "PUT",
      url: `${backend}api/v1/cards/${this.props.match.params.id}`,
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
    let card
    if (this.props.cards) {
      card = this.props.cards.find((card) => card._id === this.props.match.params.id)
    }
    let expiration = card.expiration ? card.expiration.substring(0,10) : null
    let content = card ? (
      <div>
        <h3>Update Card Info</h3>
        <form onSubmit={this.handleSubmit}>
          <label for="retailer">Retailer:</label>
          <input type="text" id="retailer" name="retailer" defaultValue={card.retailer}/>
          <label for="number">Gift Card Number:</label>
          <input type="number" id="number" name="number" defaultValue={card.number}/>
          <label for="number">Gift Card PIN:</label>
          <input type="number" id="number" name="pin" defaultValue={card.pin}/>
          <label for="expiration">Expiration Date:</label>
          <input type="date" id="expiration" name="expiration" defaultValue={expiration}/>
          <label for="balance">Remaining Balance ($):</label>
          <input type="number" id="balance" name="balance" defaultValue={card.balance}/>
          <input className="waves-effect waves-light btn" type="submit" value="Update"/>
        </form>
      </div>) :
      (<p>Card does not exist.  Ensure you are logged in</p>)
    return (
      <div>
        {content}
      </div>
    )
  }
}


export default EditCard
