import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import '../stylesheets/form.css'


class NewCard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      type: 'gift card',
      errorText: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.checkError = this.checkError.bind(this);
  }


  handleUpdateInput = (searchText) => {
    console.log(this.state.searchText)
    this.setState({
      searchText: searchText,
    });
  };

  onChange(e){
    e.preventDefault()
    this.setState({
      type: e.target.value
    });
  }

  // checkError(e) {
  //   if (e.target.value == '' || e.target.value.match(/a@(?:foo|bar|baz)\b/)) {
  //     this.setState({ errorText: '' })
  //   } else {
  //     this.setState({ errorText: 'Amount must contain a $ or %' })
  //   }
  // }

  componentDidMount(){
    if (!this.props.alertOn) {
      this.props.clearAlert()
    }
    if (this.props.alertOn && this.props.alert !== " ") {
      this.props.setAlertSeen()
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[2].value.toLowerCase())
    console.log(this.props.retailers)
    let chosenRetailer = this.props.retailers.find(retailer => retailer.name === e.target[2].value.toLowerCase())
    let cardData = (chosenRetailer && this.state.type === 'gift card' ? {
        type: this.state.type,
        retailer: e.target[2].value.toLowerCase(),
        number: e.target[3].value,
        pin: e.target[4].value,
        amount: e.target[5].value,
        expiration: e.target[6].value,
        cardHtml: chosenRetailer.cardSite
      } : {
          type: this.state.type,
          retailer: e.target[2].value.toLowerCase(),
          number: e.target[3].value,
          pin: e.target[4].value,
          amount: e.target[5].value,
          expiration: e.target[6].value
        })
     axios({
      method: "POST",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: cardData
    })
    .then(response => {
      if (response.data) {
        this.props.forceUpdate()
        this.props.setAlert("card added successfully")
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.setAlert("woops, something went wrong")
      this.props.history.push(`/login`)
    })
  }

  render () {
    let retailerNames = this.props.retailers.map((retailer, i) => retailer.name)
    let content = !!this.props.isAuthenticated ?
      ( <div>
        <h2>enter new card or coupon</h2>
        <form onSubmit={this.handleSubmit}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <RadioButtonGroup name="shipSpeed" defaultSelected="gift card" onChange={this.onChange}>
              <RadioButton
                value="gift card"
                label="gift card"
              />
              <RadioButton
                value="coupon"
                label="coupon"
              />
            </RadioButtonGroup>
            <div className="autocomplete">
              <AutoComplete
                hintText="e.g. j crew, walmart, amazon"
                floatingLabelText="retailer"
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput}
                // onNewRequest={this.handleNewRequest}
                dataSource={retailerNames}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
                maxSearchResults={10}
                fullWidth={true}
                required
              />
            </div>
            <TextField
              hintText="e.g. 0123456789"
              floatingLabelText="number"
              fullWidth={true}
              required
            />
            <TextField
              hintText="e.g. 1234"
              floatingLabelText="pin"
              fullWidth={true}
            />
            <TextField
              hintText="e.g. $100.00 or 15%"
              floatingLabelText="amount ($ or %)"
              fullWidth={true}
              errorText= {this.state.errorText}
              // onChange={this.checkError}
            /><br/>
            <DatePicker hintText="expiration date" fullWidth={true}
            />

            <br/>
            {/* <input type="number" id="number" required name="number" placeholder="e.g. 0123456789"/>
            <label htmlFor="number">gift card number</label> */}
            {/* <input type="number" id="number" name="pin" placeholder="e.g. 1234"/>
            <label htmlFor="number">gift card pin</label> */}
            {/* <input type="date" id="expiration" name="expiration"/>
            <label htmlFor="expiration">expiration date</label> */}
            {/* <input type="number" id="balance" name="balance" min= "0" step="0.01" placeholder="e.g. $100.00"/>
            <label htmlFor="balance">remaining balance ($)</label> */}
            <br/>
            <RaisedButton label="add" primary={true} type="submit" />
          </MuiThemeProvider>
          {/* <input className="waves-effect waves-light btn" type="submit" value="add"/> */}
        </form>
      </div>) :
      (
        <p>You must be logged in before adding a card or coupon</p>
      )
    return (
      <div>
        {/* {this.props.isFetching && <p>Loading...</p>} */}
        {!this.props.isFetching && content}
      </div>
    )
  }
}


export default NewCard2
