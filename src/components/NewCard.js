import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import $ from 'jquery'

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    $('select').material_select();
  }


  handleSubmit(e) {
    e.preventDefault();
     axios({
      method: "POST",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        retailer: e.target[0].value.toLowerCase(),
        number: e.target[1].value,
        pin: e.target[2].value,
        expiration: e.target[3].value,
        balance: e.target[4].value
      }
    })
    .then(response => {
      if (response.data) {
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  render () {
    let content = !!this.props.isAuthenticated ?
      ( <div>
        <h2>enter new gift card or coupon</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Browser Select</label>
          <div class="input-field col s12">
            <select ref="select">
              <option value="" disabled selected>Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Materialize Select</label>
          </div>
          <input type="text" id="retailer" name="retailer" required placeholder="e.g. j crew, amazon, etc."/>
          <label htmlFor="retailer">retailer</label>
          <input type="number" id="number" required name="number" placeholder="e.g. 0123456789"/>
          <label htmlFor="number">gift card number</label>
          <input type="number" id="number" name="pin" placeholder="e.g. 1234"/>
          <label htmlFor="number">gift card pin</label>
          <input type="date" id="expiration" name="expiration"/>
          <label htmlFor="expiration">expiration date</label>
          <input type="number" id="balance" name="balance" min= "0" step="0.01" placeholder="e.g. $100.00"/>
          <label htmlFor="balance">remaining balance ($)</label>
          <br/>
          <input className="waves-effect waves-light btn" type="submit" value="add"/>
        </form>
      </div>) :
      (
        <p>you must be logged in before adding a card</p>
      )
    return (
      <div>
        {content}
      </div>
    )
  }
}


export default NewCard
