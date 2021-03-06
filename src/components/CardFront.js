import React from 'react'
import moment from 'moment'
import '../stylesheets/card.css'


const CardFront = ({...props}) => {
  let amount = (props.card.amount ? props.card.amount : "n/a")
  let expiration
  let expiration_class
  if (props.card.expiration) {
    expiration = moment(props.card.expiration).format('ll')
    expiration_class = new Date(props.card.expiration) > new Date()  ? "valid" : "expired"
  } else {
    expiration = "n/a"
    expiration_class = "valid"
  }

  return (
    <div className="card__side card__front" onClick={props.flipCard}>
      <p>{props.card.type}</p>
      <h2>{props.card.retailer}</h2>
      <h4>amount: {amount}</h4>
      <p>expiration: <span className={expiration_class}>{expiration}</span></p>
      <p className="card__side__flip-button">{props.flipVerb} to see back</p>
    </div>
  );
}


export default CardFront
