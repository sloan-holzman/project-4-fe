import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import Barcode from 'react-barcode'


class Card extends Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
  }

  deleteCard(e) {
    e.preventDefault();
    console.log(this.props.card._id)
     axios({
      method: "DELETE",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        card_id: this.props.card._id
      }
    })
    .then(response => {
      console.log(response)
      if (response.data) {
        this.props.history.push(`/login`)
      }
    })
    .catch(err => {
      console.log(err)
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  goToEdit(e) {
    console.log(this.props)
    e.preventDefault();
    this.props.history.push(`/cards/edit/${this.props.card._id}`)
  }

  render() {
    let balance = (this.props.card.balance && this.props.card.balance> 0 ? this.props.card.balance.toFixed(2) : "N/A")
    let date_options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }
    let pin = this.props.card.pin ? this.props.card.pin : "N/A"
    let expiration = (this.props.card.expiration ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(this.props.card.expiration.substring(0,10)))) : "N/A")
    let updated = (this.props.card.updated ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(this.props.card.updated.substring(0,10)))) : "N/A")

    return (
      <div className="card">
        <div>
          <p>Retailer: {this.props.card.retailer}</p>
          <p>Balance: ${balance}</p>
          <p>Number: {this.props.card.number}</p>
          <p>Pin: {pin}</p>
          <p>Expiration: {expiration}</p>
          <p>Last updated: {updated}</p>
        </div>
        <Barcode value={this.props.card.number} />
        <div>
          <button onClick={this.deleteCard} className="waves-effect waves-light btn" >
            Delete Card
          </button>
          <button onClick={this.goToEdit} className="waves-effect waves-light btn" >
            Edit Card
          </button>
        </div>
      </div>
    );
  }
}



export default Card
