import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";
import { update_cards_after_post } from '../actions/cards'


class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
     axios({
      method: "POST",
      url: `http://localhost:1337/api/v1/cards`,
      headers: {'Authorization': "Bearer " + this.props.token},
      data: {
        retailer: e.target[0].value,
        number: e.target[1].value,
        expiration: e.target[2].value,
        balance: e.target[3].value
      }
    })
    .then(response => {
      console.log(response)
      if (response.data) {
        this.props.dispatch(update_cards_after_post(response.data))
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {console.log(err)})
  }
  render () {
    let content = !!this.props.isAuthenticated ?
      (<form onSubmit={this.handleSubmit}>
        <label for="retailer">Retailer:</label>
        <input type="text" id="retailer" name="retailer" placeholder="e.g. JCrew, Amazon, etc."/>
        <label for="number">Gift Card Number:</label>
        <input type="text" id="number" name="number" placeholder="e.g. 0123456789"/>
        <label for="expiration">Expiration Date:</label>
        <input type="date" id="expiration" name="expiration"/>
        <label for="balance">Remaining Balance ($):</label>
        <input type="number" id="balance" name="balance" placeholder="e.g. $100.00"/>
        <input className="waves-effect waves-light btn" type="submit" value="Add"/>
      </form>) :
      (<p>You must be logged in before adding a card</p>)
    return (
      <div>
        {content}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token
})

export default connect(mapStateToProps)(NewCard)
