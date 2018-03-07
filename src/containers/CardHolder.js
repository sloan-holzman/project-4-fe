import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from "../components/Card";
import CardForm from "../components/CardForm";
import CardApi from "../api/CardApi"
import { fetchUser, setAlert, handleAlert, logout } from '../actions/cards'


class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {type: 'gift card', retailer: '', number: '', pin: '', amount: '', expiration: ''},
      cardLoaded: false,
      errorText: ''
    };
    this.updateCardState = this.updateCardState.bind(this);
    this.updateCardRetailerOrExpirationState = this.updateCardRetailerOrExpirationState.bind(this);
    this.checkAmount = this.checkAmount.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.returnCardData = this.returnCardData.bind(this);
    this.afterCardApi = this.afterCardApi.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(handleAlert(localStorage.token, this.props.upToDate, this.props.alertOn, this.props.alert))
    this.setCardState()
  }

  setCardState(){
    if (typeof this.props.match !== 'undefined' && typeof this.props.match.params.id !== 'undefined') {
      let card = this.props.cards.find((card) => card._id === this.props.match.params.id)
      this.setState({
        card: card,
        cardLoaded: true
      })
    }
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.cards!==this.props.cards){
        this.setCardState()
      }
   }

  // if it's a gift card, the "amount" should start with a dollar sign.  if it's a coupon, it can start with a dollar sign or end with percent sign, but not both
  checkAmount(e) {
    let blank = e.target.value === '' ? true : false
    let dollarSignStart = e.target.value.charAt(0) === '$' ? true : false
    let percentEnd = e.target.value.substring(e.target.value.length-1) === "%" ? true : false
    let both = dollarSignStart && percentEnd ? false : true
    let giftCard = this.state.card.type === 'gift card' ? true : false
    let giftCardPass = ((dollarSignStart || blank) && both)
    let couponPass = ((dollarSignStart || percentEnd || blank) && both)
    if (((giftCard && giftCardPass) || (!giftCard && couponPass) )) {
        this.setState({
          errorText: ''
        })
    } else if (giftCard) {
       this.setState({ errorText: 'Gift card amounts must start with a $ and not end with a %' })
    } else {
      this.setState({ errorText: 'Coupon amounts must start with a $ or end with a %' })
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

  updateCardRetailerOrExpirationState(field, value) {
    console.log(value)
    const card = this.state.card;
    if (field === "retailer") {
      card[field] = value.toLowerCase();
    } else {
      card[field] = value;
    }
    this.setState({
      card: card,
    });
  };

  returnCardData(e){
    e.preventDefault();
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
    return cardData
  }


  handleUpdateSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let card = this.returnCardData(e)
      let cardId = this.props.match.params.id
      CardApi.editCard(card, cardId)
      .then(response => {this.afterCardApi(response,"card updated successfully")})
      .catch(this.handleError)
    }
  }

  handleNewSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let card = this.returnCardData(e)
      CardApi.newCard(card)
      .then(response => {this.afterCardApi(response,"card added successfully")})
      .catch(this.handleError)
    }
  }


  deleteCard(e, id) {
    e.preventDefault();
    CardApi.deleteCard(id)
      .then(response => {this.afterCardApi(response,"card deleted successfully")})
      .catch(this.handleError)
  }


  afterCardApi(response, phrase) {
    if (response === "success") {
      this.props.dispatch(fetchUser())
      this.props.dispatch(setAlert(phrase))
      this.props.history.push(`/cards`)
    } else {
      this.handleError()
    }
  }

  handleError() {
    this.props.dispatch(logout())
    this.props.dispatch(setAlert("woops, something went wrong"))
    this.props.history.push(`/login`)
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
          {...this.props}
        />
      )
    } else if (this.props.type === "Edit") {
        if (this.state.cardLoaded && this.state.card) {
          display = (
            <CardForm
              card={this.state.card}
              title="update card or coupon info"
              fail="card does not exist.  ensure you are logged in"
              retailerNames={retailerNames}
              onChange={this.updateCardState}
              handleSubmit={this.handleUpdateSubmit}
              updateCardRetailerOrExpirationState={this.updateCardRetailerOrExpirationState}
              errorText={this.state.errorText}
            />
          )
        } else {
          display = (<p>Loading...</p>)
        }
    } else {
        if (this.state.card) {
          display = (<CardForm
            card={this.state.card}
            title="enter new card or coupon"
            fail="You must be logged in before adding a card or coupon"
            retailerNames={retailerNames}
            onChange={this.updateCardState}
            handleSubmit={this.handleNewSubmit}
            updateCardRetailerOrExpirationState={this.updateCardRetailerOrExpirationState}
            errorText={this.state.errorText}
                     />)
        } else {
          display = (<p>Loading...</p>)
        }
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.cardReducer.isAuthenticated,
    user: state.cardReducer.user,
    token: state.cardReducer.token,
    cards: state.cardReducer.cards,
    isFetching: state.cardReducer.isFetching,
    selectedRetailer: state.cardReducer.selectedRetailer,
    hasSelected: state.cardReducer.selectedRetailer,
    upToDate: state.cardReducer.upToDate,
    alert: state.cardReducer.alert,
    alertOn: state.cardReducer.alertOn,
    retailers: state.cardReducer.retailers,
  }
}




export default connect(mapStateToProps)(CardHolder);
