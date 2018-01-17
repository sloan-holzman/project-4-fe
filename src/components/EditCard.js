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


class EditCard extends Component {
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
    this.checkError = this.checkError.bind(this);
  }

  handleUpdateInput = (searchText) => {
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

  checkError(e) {
    let blank = e.target.value === '' ? true : false
    let dollarSignStart = e.target.value.charAt(0) === '$' ? true : false
    let percentEnd = e.target.value.substring(e.target.value.length-1) === "%" ? true : false
    let both = dollarSignStart && percentEnd ? false : true
    if ((dollarSignStart || percentEnd || blank) && both) {
      this.setState({
        errorText: ''
      })
    } else {
      this.setState({ errorText: 'Amount must contain a $ at the start or % at the end' })
    }
  }

  componentDidMount(){
    if (!this.props.alertOn) {
      this.props.clearAlert()
    }
    if (this.props.alertOn && this.props.alert !== " ") {
      this.props.setAlertSeen()
    }
    let card
    if (this.props.cards) {
      card = this.props.cards.find((card) => card._id === this.props.match.params.id)
      if (card) {
        this.setState({
          searchText: card.retailer
        })
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
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
       method: "PUT",
       url: `${backend}api/v1/cards/${this.props.match.params.id}`,
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
  }

  render () {
    let card
    let expiration
    let retailerNames = this.props.retailers.map((retailer, i) => retailer.name)
    if (this.props.cards) {
      card = this.props.cards.find((card) => card._id === this.props.match.params.id)
    }
    if (card) {
      expiration = card.expiration ? new Date(card.expiration.substring(0,10)) : null
    }
    let content = !!this.props.isAuthenticated && card ?
      ( <div>
        <h2>update card or coupon info</h2>
        <form onSubmit={this.handleSubmit}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <RadioButtonGroup name="shipSpeed" defaultSelected={card.type} onChange={this.onChange}>
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
              defaultValue={card.number}
              required
            />
            <TextField
              hintText="e.g. 1234"
              floatingLabelText="pin"
              fullWidth={true}
              defaultValue={card.pin}
            />
            <TextField
              hintText="e.g. $100.00 or 15%"
              floatingLabelText="amount ($ or %)"
              fullWidth={true}
              errorText= {this.state.errorText}
              onChange={this.checkError}
              defaultValue={card.amount}
            /><br/>
            {
              expiration ? <DatePicker hintText="expiration date" fullWidth={true} defaultDate={expiration} /> : <DatePicker hintText="expiration date" fullWidth={true}/>
            }

            <br/>
            <br/>
            <RaisedButton label="update" primary={true} type="submit" />
          </MuiThemeProvider>
        </form>
      </div>) :
      (
        <p>card does not exist.  ensure you are logged in</p>
      )
    return (
      <div>
        {!this.props.isFetching && content}
      </div>
    )
  }
}


export default EditCard
