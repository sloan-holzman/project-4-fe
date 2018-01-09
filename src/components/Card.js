import React, { Component } from 'react'
import axios from "axios";

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
      url: `http://localhost:1337/api/v1/cards`,
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
    .catch(err => {console.log(err)})
  }

  goToEdit(e) {
    console.log(this.props)
    e.preventDefault();
    this.props.history.push(`/cards/edit/${this.props.card._id}`)
  }

  render() {
    let balance = (this.props.card.balance && this.props.card.balance> 0 ? this.props.card.balance.toFixed(2) : "N/A")
    return (
      <div>
        <p>Retailer: {this.props.card.retailer} Balance: ${balance} Number: {this.props.card.number} Last updated: {this.props.card.updated} expiration: {this.props.card.expiration}</p>
        <button onClick={this.deleteCard} className="waves-effect waves-light btn" >
          Delete Card
        </button>
        <button onClick={this.goToEdit} className="waves-effect waves-light btn" >
          Edit Card
        </button>
      </div>
    );
  }
}



export default Card
