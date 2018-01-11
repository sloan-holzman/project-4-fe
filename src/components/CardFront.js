import React from 'react'
import moment from 'moment'


const CardFront = ({...props}) => {
  let balance = (props.card.balance && props.card.balance> 0 ? props.card.balance.toFixed(2) : "n/a")
  let expiration
  let expiration_class
  if (props.card.expiration) {
    expiration = moment(props.card.expiration.substring(0,10)).format('ll')
    expiration_class = new Date(props.card.expiration) > new Date()  ? "valid" : "expired"
  } else {
    expiration = "n/a"
    expiration_class = "valid"
  }

  let updated = moment(props.card.updated.substring(0,10)).format('ll')

  return (
    <div className="card__side" onClick={props.flipCard}>
      <h2>{props.card.retailer}</h2>
      <h4>balance: ${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
      <p>expiration: <span className={expiration_class}>{expiration}</span></p>
      <p>last updated: {updated}</p>
      <p className="flip-button" >click to see back</p>
    </div>
  );
}


export default CardFront
