// handleWindowSizeChange copied from https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

import React from 'react'
import CardHolder from "../containers/CardHolder"
import '../stylesheets/dashboard.css'


const CardList = ({...props}) => {
  const {
    filteredCards,
    cards,
    history,
    } = props

  let cardlist = filteredCards.map((card, i) => {
    return (
      <li key={i}>
        <CardHolder
          type="Show"
          card={card}
          cards={cards}
          history={history}
        />
      </li>
    )
  })

  return (
    <ul>
      {cardlist}
    </ul>
  )
}

export default CardList
