import React from 'react'
import Barcode from 'react-barcode'
import '../stylesheets/card.css'


const CardBack = ({...props}) => {
  let pin = props.card.pin ? `pin: ${props.card.pin}` : " "
  return (
    <div className="card__side card__back" onClick={props.flipCard}>
      <br/>
      <div className="card__back__barcode">
        <Barcode value={props.card.number} />
        <br/>
      </div>
      <p className="pin">{pin}</p>

      <p className="card__side__flip-button">{props.flipVerb} to see front</p>
    </div>
  )
}


export default CardBack
