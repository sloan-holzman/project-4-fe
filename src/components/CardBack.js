import React, { Component } from 'react'
import Barcode from 'react-barcode'


class CardBack extends Component {

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
      <div className="card__side card__back">
        <br/>
        <p>retailer: {this.props.card.retailer}</p>
        <p>expiration: {expiration}</p>
        <p>pin: {pin}</p>
        <br/>
        <Barcode value={this.props.card.number} />
        <br/>
        <button onClick={this.props.handleClick}>click to see front</button>
      </div>
    );
  }
}



export default CardBack
