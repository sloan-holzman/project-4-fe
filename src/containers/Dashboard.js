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
      <div>
        {!this.props.isAuthenticated && cards.length === 0 && <h2>You must log in...</h2>}
        {this.props.isAuthenticated && cards.length === 0 && <h2>Empty.</h2>}
        {cards.length > 0 &&
          <div>
            <h2>Cards</h2>
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
