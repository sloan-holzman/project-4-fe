import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";


class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // let data = {
    //   retailer: e.target[0].value,
    //   number: e.target[1].value,
    //   expiration: e.target[2].value,
    //   balance: e.target[3].value
    // }
    // console.log(data)
    // fetch(`http://localhost:1337/api/v1/cards`,
    //   {method: 'POST', body: JSON.stringify(data)}
    //  )
    console.log()
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
      if (response.symbol) {
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {console.log(err)})
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <p><input type="text" name="retailer" placeholder="Retailer"/></p>
        <p><input type="text" name="number" placeholder="Card Number"/></p>
        <p><input type="date" name="expiration" placeholder="Expiration Date"/></p>
        <p><input type="number" name="balance" placeholder="Remaining Balance"/></p>
        <p><input type="submit" value="Add"/></p>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  user: state.loginReducer.user,
  token: state.loginReducer.token
})

export default connect(mapStateToProps)(NewCard)
