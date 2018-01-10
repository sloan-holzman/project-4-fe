import React, { Component } from 'react'


class CardFront extends Component {

  render() {
    let balance = (this.props.card.balance && this.props.card.balance> 0 ? this.props.card.balance.toFixed(2) : "N/A")
    let date_options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }
    let expiration = (this.props.card.expiration ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(this.props.card.expiration.substring(0,10)))) : "N/A")
    let updated = (this.props.card.updated ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(this.props.card.updated.substring(0,10)))) : "N/A")

    return (
      <div className="card__side">
        <h2>{this.props.card.retailer}</h2>
        <h4>balance: ${balance}</h4>
        <p>expiration: {expiration}</p>
        <p>last updated: {updated}</p>
        <button onClick={this.props.handleClick}>click to see back</button>

      </div>
    );
  }
}

export default CardFront