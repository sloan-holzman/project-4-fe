import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"



class Dashboard extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let cards = this.props.cards.map((card, i) => {
      let balance = card.balance && card.balance> 0 ? card.balance.toFixed(2) : "N/A"

      return (
        <li key={i}>
          Retailer: {card.retailer} Balance: ${balance} Number: {card.number} Last updated: {card.updated}
        </li>
      )
    })
    return (
      <div>
        {!this.props.isAuthenticated && cards.length === 0 && <h2>You must log in...</h2>}
        {this.props.isAuthenticated && cards.length === 0 && <h2>Empty.</h2>}
        {cards.length > 0 &&
          <div>
            <h2>Cards</h2>
            <ul className="stocks-list">
              {cards}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cardReducer.cards,
  isAuthenticated: state.cardReducer.isAuthenticated
})


export default connect(mapStateToProps)(Dashboard)
