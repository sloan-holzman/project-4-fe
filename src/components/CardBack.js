import React, { Component } from 'react'
import Barcode from 'react-barcode'


class CardBack extends Component {

  render() {
    let pin = this.props.card.pin ? `pin: ${this.props.card.pin}` : " "

    return (
      <div className="card__side card__back">
        <br/>
        <p>{pin}</p>
        <br/>
        <Barcode value={this.props.card.number} />
        <br/>
        <br/>
        <button onClick={this.props.handleClick}>click to see front</button>
      </div>
    );
  }
}



export default CardBack
