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
    let card
    let expiration
    if (this.props.cards) {
      card = this.props.cards.find((card) => card._id === this.props.match.params.id)
    }
    if (card) {
      expiration = card.expiration ? card.expiration.substring(0,10) : null
    }

    let content = card ? (
      <div>
        <h3>update card info</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="retailer">retailer:</label>
          <input type="text" id="retailer" name="retailer" required defaultValue={card.retailer}/>
          <label htmlFor="number">gift card number:</label>
          <input type="number" id="number" name="number" required defaultValue={card.number}/>
          <label htmlFor="number">gift card pin:</label>
          <input type="number" id="number" name="pin" defaultValue={card.pin}/>
          <label htmlFor="expiration">expiration date:</label>
          <input type="date" id="expiration" name="expiration" defaultValue={expiration}/>
          <label htmlFor="balance">remaining balance ($):</label>
          <input type="number" id="balance" min= "0" step="0.01" name="balance" defaultValue={card.balance}/>
          <input className="waves-effect waves-light btn" type="submit" value="Update"/>
        </form>
      </div>) :
      (<p>card does not exist.  ensure you are logged in</p>)
    return (
      <div>
        {content}
      </div>
    )
  }
}


export default EditCard
