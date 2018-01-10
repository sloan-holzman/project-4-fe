import React, { Component } from 'react'
import Barcode from 'react-barcode'


class CardBack extends Component {

  render() {
    let date_options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }
    let pin = this.props.card.pin ? this.props.card.pin : "n/a"
    let expiration = (this.props.card.expiration ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(this.props.card.expiration.substring(0,10)))) : "n/a")

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
