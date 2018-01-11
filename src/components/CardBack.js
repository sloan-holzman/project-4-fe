import React from 'react'
import Barcode from 'react-barcode'


const CardBack = ({...props}) => {
  let pin = props.card.pin ? `pin: ${props.card.pin}` : " "
  return (
    <div className="card__side card__back" onClick={props.flipCard}>
      <br/>
      <div className="barcode">
        <Barcode value={props.card.number} />
        <br/>
      </div>
      <p className="pin">{pin}</p>

      <p className="flip-button">click to see front</p>
    </div>
  )
}


export default CardBack
