// handleWindowSizeChange copied from https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

import React from 'react'
import '../stylesheets/dashboard.css'


const MobileCardList = ({...props}) => {
  const {
    filteredCards,
    goToCard
    } = props

  let mobileCards = filteredCards.map((card, i) => {
    return (
      <tr key={card._id}>
        <td>{card.retailer}</td>
        <td>{card.type}</td>
        <td>{card.amount}</td>
        <td><button onClick={ (e) => goToCard(e, card._id) } className="waves-effect waves-light btn">Details </button></td>
      </tr>
    )
  })

  return (
    <table className="bordered striped highlight centered responsive-table">
      <thead>
        <tr>
          <th>retailer</th>
          <th>type</th>
          <th>amount</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {mobileCards}
      </tbody>
    </table>
  )
}

export default MobileCardList
