import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from "../components/Card";
import CardForm from "../components/CardForm";
import CardApi from "../api/CardApi"
import { fetchUser, clearAlert, setAlertSeen, setAlert, forceUpdate } from '../actions/cards'


class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {type: 'gift card', retailer: '', number: '', pin: '', amount: '', expiration: ''},
      cardLoaded: false,
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
    this.returnCardData = this.returnCardData.bind(this);
  }

  componentDidMount(){
    if (!this.props.alertOn) {
      this.props.dispatch(clearAlert())
    }
    if (this.props.alertOn && this.props.alert !== " ") {
      this.props.dispatch(setAlertSeen())
    }
    if (this.props.cards && typeof this.props.match !== 'undefined' && typeof this.props.match.params.id !== 'undefined') {
      let card = this.props.cards.find((card) => card._id === this.props.match.params.id)
      this.setState({
        card: card,
        cardLoaded: true
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


  handleEditSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let card = this.returnCardData(e)
      let cardId = this.props.match.params.id
      CardApi.editCard(card, cardId)
        .then(response => {
          if (response === "success") {
            this.props.dispatch(forceUpdate())
            this.props.dispatch(setAlert("card updated successfully"))
            this.props.history.push(`/cards`)
          } else {
            localStorage.clear()
            this.props.dispatch(setAlert("woops, something went wrong"))
            this.props.history.push(`/login`)
          }
        })
    }
  }

  handleNewSubmit(e) {
    e.preventDefault();
    if (this.state.errorText === '') {
      let card = this.returnCardData(e)
      CardApi.newCard(card)
        .then(response => {
          if (response === "success") {
            this.props.dispatch(forceUpdate())
            this.props.dispatch(setAlert("card added successfully"))
            this.props.history.push(`/cards`)
          } else {
            localStorage.clear()
            this.props.dispatch(setAlert("woops, something went wrong"))
            this.props.history.push(`/login`)
          }
        })
    }
  }


  deleteCard(e, id) {
    e.preventDefault();
    CardApi.deleteCard(id)
      .then(response => {
        if (response === "success") {
          this.props.dispatch(fetchUser())
          this.props.dispatch(setAlert("card deleted successfully"))
          this.props.history.push(`/cards`)
        } else {
          localStorage.clear()
          this.props.dispatch(setAlert("woops, something went wrong"))
          this.props.history.push(`/login`)
        }
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
          {...this.props}
        />
      )
    } else if (this.props.type === "Edit") {
        if (this.state.cardLoaded) {
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
            handleSearchUpdate={this.handleSearchUpdate}
            handleDateUpdate={this.handleDateUpdate}
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
    didInvalidate: state.cardReducer.didInvalidate,
    selectedRetailer: state.cardReducer.selectedRetailer,
    hasSelected: state.cardReducer.selectedRetailer,
    upToDate: state.cardReducer.upToDate,
    alert: state.cardReducer.alert,
    alertOn: state.cardReducer.alertOn,
    retailers: state.cardReducer.retailers,
  }
}

CardHolder.defaultProps = {
  type: "Edit",
}


export default connect(mapStateToProps)(CardHolder);
