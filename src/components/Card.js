// handleWindowSizeChange copied from https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

import React, { Component } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'
import ReactCardFlip from 'react-card-flip';
import '../stylesheets/card.css'


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      width: window.innerWidth
      // height: window.innerHeight
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
          <CardFront ref="front" key="front" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />
          <CardBack ref="back" key="back" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />
        </ReactCardFlip>)
    } else if (this.state.isFlipped) {
      cardDisplay = (<CardFront ref="front" key="front" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />)
    } else {
      cardDisplay = (<CardBack ref="back" key="back" flipVerb={flipVerb} card={card} flipCard={this.flipCard} />)
    }

    return (
      <div>
        { card ?
          <div className="card">
            {cardDisplay}
            <br/>
            <div className="card__buttons">
              <button onClick={ (e) => this.props.deleteCard(e, card._id) } className="waves-effect waves-light btn" >
                Delete
              </button>
              <button onClick={(e) => this.goToEdit(e, card._id)} className="waves-effect waves-light btn" >
                Edit
              </button>
              {
                card && card.type === 'gift card' && card.cardHtml ?
                  <button onClick={()=> window.open(card.cardHtml, "_blank")} className="waves-effect waves-light btn" >
                    Check Balance
                  </button> : <p></p>
              }
            </div>
          </div> :
          <p>card does not exist.  ensure you are logged in</p>
        }
      </div>
    )
  }
}



export default Card
