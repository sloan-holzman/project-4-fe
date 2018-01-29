import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from "../components/Card";
import CardForm from "../components/CardForm";
import axios from "axios";
import backend from "../BackendVariable";
import { fetchUser } from '../actions/cards'


class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card,
      errorText: ''
    };
    this.updateCardState = this.updateCardState.bind(this);
    this.checkAmount = this.checkAmount.bind(this);
    this.checkAmount = this.checkAmount.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount(){
    if (!this.props.alertOn) {
      this.props.clearAlert()
    }
    if (this.props.alertOn && this.props.alert !== " ") {
      this.props.setAlertSeen()
    }
    if (this.props.cards && typeof this.props.params !== 'undefined') {
      let card = this.props.cards.find((card) => card._id === this.props.match.params.id)
      this.setState({
        card: card
      })
    }
  }

  checkAmount(e) {
    let blank = e.target.value === '' ? true : false
    let dollarSignStart = e.target.value.charAt(0) === '$' ? true : false
    let percentEnd = e.target.value.substring(e.target.value.length-1) === "%" ? true : false
    let both = dollarSignStart && percentEnd ? false : true
    if (this.state.type === 'gift card') {
      if ((dollarSignStart || blank) && both) {
        this.setState({
          errorText: ''
        })
      } else {
        this.setState({ errorText: 'Gift card amounts must start with a $ and not end with a %' })
      }
    } else {
      if ((dollarSignStart || percentEnd || blank) && both) {
        this.setState({
          errorText: ''
        })
      } else {
        this.setState({ errorText: 'Coupon amounts must start with a $ or end with a %' })
      }
    }
  }

  updateCardState(e) {
    const field = e.target.name;
    const card = this.state.card;
    card[field] = e.target.value;
    this.setState({
      card: card
    });
    if (field === "amount") {
      this.checkAmount(e)
    }
  }

  handleSearchUpdate = (value) => {
    const field = "retailer";
    const card = this.state.card;
    card[field] = value.toLowerCase();
    this.setState({
      card: card,
    });
  };

  handleDateUpdate = (e, value) => {
    const field = "expiration";
    const card = this.state.card;
    card[field] = value;
    this.setState({
      card: card,
    });
  };

  handleEditSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let chosenRetailer = this.props.retailers.find(retailer => retailer.name === this.state.card.retailer)
      let cardData = (chosenRetailer && this.state.card.type === 'gift card' ? {
          type: this.state.card.type,
          retailer: this.state.card.retailer,
          number: this.state.card.number,
          pin: this.state.card.pin,
          amount: this.state.card.amount,
          expiration: this.state.card.expiration,
          cardHtml: chosenRetailer.cardSite
        } : this.state.card)
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


  handleNewSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let chosenRetailer = this.props.retailers.find(retailer => retailer.name === this.state.card.retailer)
      console.log(chosenRetailer)
      let cardData = (chosenRetailer && this.state.card.type === 'gift card' ? {
          type: this.state.card.type,
          retailer: this.state.card.retailer,
          number: this.state.card.number,
          pin: this.state.card.pin,
          amount: this.state.card.amount,
          expiration: this.state.card.expiration,
          cardHtml: chosenRetailer.cardSite
        } : this.state.card)
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
  }


  deleteCard(e, id) {
    e.preventDefault();
     axios({
      method: "DELETE",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        card_id: id
      }
    })
    .then(response => {
      if (response.data) {
        this.props.dispatch(fetchUser())
        this.setAlert("card delete successfully")
        this.props.history.push(`/cards`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
      this.setAlert("woops, something went wrong")
    })
  }


  render () {
    let retailerNames = this.props.retailers.map((retailer, i) => retailer.name)
    let display
    if (this.props.type === "Show") {
      display = (
        <Card
          cards={this.props.cards}
          history={this.props.history}
          deleteCard={this.deleteCard}
          clearAlert={this.props.clearAlert}
          setAlertSeen={this.props.setAlertSeen}
          setAlert={this.props.setAlert}
          {...this.props}
        />
      )
    } else if (this.props.type === "Edit") {
      display = (
        <CardForm
          card={this.state.card}
          title="update card or coupon info"
          fail="card does not exist.  ensure you are logged in"
          retailerNames={retailerNames}
          onChange={this.updateCardState}
          handleSubmit={this.handleEditSubmit}
          handleSearchUpdate={this.handleSearchUpdate}
          handleDateUpdate={this.handleDateUpdate}
          errorText={this.state.errorText}
        />
      )
    } else {
      display = (
        <CardForm
          card={this.state.card}
          title="enter new card or coupon"
          fail="You must be logged in before adding a card or coupon"
          retailerNames={retailerNames}
          onChange={this.updateCardState}
          handleSubmit={this.handleNewSubmit}
          handleSearchUpdate={this.handleSearchUpdate}
          handleDateUpdate={this.handleDateUpdate}
          errorText={this.state.errorText}
        />
      )
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let card = {type: 'gift card', retailer: '', number: '', pin: '', amount: '', expiration: ''}
  return {
    isAuthenticated: state.cardReducer.isAuthenticated,
    user: state.cardReducer.user,
    token: state.cardReducer.token,
    cards: state.cardReducer.cards,
    isFetching: state.cardReducer.isFetching,
    didInvalidate: state.cardReducer.didInvalidate,
    selectedRetailer: state.cardReducer.selectedRetailer,
    hasSelected: state.cardReducer.selectedRetailer,
    upToDate: state.cardReducer.upToDate,
    alert: state.cardReducer.alert,
    alertOn: state.cardReducer.alertOn,
    retailers: state.cardReducer.retailers,
    card: card
  }
}

export default connect(mapStateToProps)(CardHolder);
