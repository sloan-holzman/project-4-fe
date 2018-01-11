import React from 'react'
import Barcode from 'react-barcode'


const CardBack = ({...props}) => {
  let pin = props.card.pin ? `pin: ${props.card.pin}` : " "
  return (
    <div className="card__side card__back">
      <br/>
      <p>{pin}</p>
      <br/>
      <div className="barcode">
        <Barcode value={props.card.number} />
      </div>
        <br/>
      <br/>
      <button onClick={props.flipCard}>click to see front</button>
    </div>
  )
}


export default CardBack
