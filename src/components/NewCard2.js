import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme'
import AutoComplete from 'material-ui/AutoComplete';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


class NewCard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      type: 'gift card'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.onChange = this.onChange.bind(this);
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
     axios({
      method: "POST",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        type: this.state.type,
        retailer: e.target[2].value.toLowerCase(),
        number: e.target[3].value,
        pin: e.target[4].value,
        amount: e.target[5].value,
        expiration: e.target[6].value
      }
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
        <h2>enter new card</h2>
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
              />
            </div>
            <TextField
              hintText="e.g. 0123456789"
              floatingLabelText="number"
              fullWidth={true}
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
            /><br/>
            <DatePicker hintText="expiration date" fullWidth={true}
            />

            <br/>
          </MuiThemeProvider>
          {/* <input type="number" id="number" required name="number" placeholder="e.g. 0123456789"/>
          <label htmlFor="number">gift card number</label> */}
          {/* <input type="number" id="number" name="pin" placeholder="e.g. 1234"/>
          <label htmlFor="number">gift card pin</label> */}
          {/* <input type="date" id="expiration" name="expiration"/>
          <label htmlFor="expiration">expiration date</label> */}
          {/* <input type="number" id="balance" name="balance" min= "0" step="0.01" placeholder="e.g. $100.00"/>
          <label htmlFor="balance">remaining balance ($)</label> */}
          <br/>
          <input className="waves-effect waves-light btn" type="submit" value="add"/>
        </form>
      </div>) :
      (
        <p>You must be logged in before adding a card</p>
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
