import React from 'react'

const CardFront = ({...props}) => {
  let balance = (props.card.balance && props.card.balance> 0 ? props.card.balance.toFixed(2) : "n/a")
  let date_options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }
  let expiration = (props.card.expiration ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(props.card.expiration.substring(0,10)))) : "n/a")
  let updated = (props.card.updated ? (new Intl.DateTimeFormat('en-US', date_options).format(Date.parse(props.card.updated.substring(0,10)))) : "n/a")


  return (
    <div className="card__side">
      <h2>{props.card.retailer}</h2>
      <h4>balance: ${balance}</h4>
      <p>expiration: {expiration}</p>
      <p>last updated: {updated}</p>
      <button onClick={props.flipCard}>click to see back</button>
    </div>
  );
}


export default CardFront
