import React from 'react';
import '../stylesheets/card.css'



const CardButtons = ({...props}) => {
  const {
    deleteCard,
    goToEdit,
    card
    } = props

  return (
    <div className="card__buttons">
      <button onClick={ (e) => deleteCard(e, card._id) } className="waves-effect waves-light btn" >
        Delete
      </button>
      <button onClick={(e) => goToEdit(e, card._id)} className="waves-effect waves-light btn" >
        Edit
      </button>
      {
        card && card.type === 'gift card' && card.cardHtml ?
          <button onClick={()=> window.open(card.cardHtml, "_blank")} className="waves-effect waves-light btn" >
            Check Balance
          </button> : <p></p>
      }
    </div>
  )
}


export default CardButtons
