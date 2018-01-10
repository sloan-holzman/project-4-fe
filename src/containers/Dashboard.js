import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from "../components/Card"
import { fetchUser } from '../actions/cards'


class Dashboard extends Component {


  componentDidMount(){
    if (localStorage.token) {
      this.props.dispatch(fetchUser())
    }
  }


  render() {
    let cards = this.props.cards.map((card, i) => {
      return (
        <li key={i}>
          <Card
            card={card}
            history={this.props.history}
          />
        </li>
      )
    })
    return (
      <div className="dashboard">
        {!this.props.isAuthenticated && cards.length === 0 && <p>You must be logged in before viewing your cards</p>}
        {this.props.isAuthenticated && cards.length === 0 && <p>You do not currently have  any cards saved...</p>}
        {cards.length > 0 &&
          <div>
            <h3>gift cards</h3>
            <ul>
              {cards}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token,
  cards: state.cardReducer.cards,
  isFetching: state.cardReducer.isFetching,
  didInvalidate: state.cardReducer.didInvalidate
})


export default connect(mapStateToProps)(Dashboard)
