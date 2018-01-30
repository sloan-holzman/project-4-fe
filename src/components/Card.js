// handleWindowSizeChange copied from https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

import React, { Component } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'
import CardButtons from './CardButtons'
import ReactCardFlip from 'react-card-flip';
import '../stylesheets/card.css'


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      width: window.innerWidth
    };
    this.flipCard = this.flipCard.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  goToEdit(e, id) {
    e.preventDefault();
    this.props.history.push(`/cards/edit/${id}`)
  }

  flipCard(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 540
    let flipVerb = isMobile ? "tap" : "click"
    let card
    if (this.props.card) {
      card = this.props.card
    } else {
      card = this.props.cards.find(card => card._id === this.props.match.params.id)
    }
    let cardDisplay
    if (!isMobile) {
      cardDisplay = (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <CardFront key="front" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />
          <CardBack key="back" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />
        </ReactCardFlip>)
    } else if (this.state.isFlipped) {
      cardDisplay = (<CardBack key="back" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />)
    } else {
      cardDisplay = (<CardFront key="front" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />)
    }

    return (
      <div>
        { card ?
          <div className="card">
            {cardDisplay}
            <br/>
            <CardButtons card={card} deleteCard={this.props.deleteCard} goToEdit={this.goToEdit}/>
          </div> :
          <p>card does not exist.  ensure you are logged in</p>
        }
      </div>
    )
  }
}



export default Card
