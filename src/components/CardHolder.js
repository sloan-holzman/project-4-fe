import React, { Component } from 'react'
import Card from "./Card";


class CardHolder extends Component {
  constructor(props) {
    super(props);
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
        console.log("card")
        this.setState({
          searchText: card.retailer,
          type: card.type
        })
      }
    }
  }


  render () {
    return (
      <Card
        cards={this.props.cards}
        history={this.props.history}
        deleteCard={this.props.deleteCard}
        clearAlert={this.props.clearAlert}
        setAlertSeen={this.props.setAlertSeen}
        setAlert={this.props.setAlert}
        {...this.props}
      />
    )
  }
}


export default CardHolder
