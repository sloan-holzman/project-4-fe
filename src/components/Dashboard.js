import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Card from "./Card"


class Dashboard extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let cards = this.props.cards.map((card, i) => {
      return (
        <li key={i}>
          <Card card={card}/>
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
