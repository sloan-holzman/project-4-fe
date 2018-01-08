import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { removeStock} from '../actions/stocks'

class Card extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    let balance = (this.props.card.balance && this.props.card.balance> 0 ? this.props.card.balance.toFixed(2) : "N/A")
    return (
      <div>
        <p>Retailer: {this.props.card.retailer} Balance: ${balance} Number: {this.props.card.number} Last updated: {this.props.card.updated}</p>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.cardReducer.token
})


export default connect(mapStateToProps)(Card)
