import React, { Component } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'
import ReactCardFlip from 'react-card-flip';
import '../stylesheets/card.css'



class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.flipCard = this.flipCard.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
  }



  goToEdit(e) {
    e.preventDefault();
    this.props.history.push(`/cards/edit/${this.props.card._id}`)
  }

  flipCard(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    return (
      <div className="card">
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <CardFront key="front" card={this.props.card} flipCard={this.flipCard} />
          <CardBack key="back" card={this.props.card} flipCard={this.flipCard} />
        </ReactCardFlip>
        <br/>
        <div className="card__buttons">
          <button onClick={ (e) => this.props.deleteCard(e, this.props.card._id) } className="waves-effect waves-light btn" >
            Delete Card
          </button>
          <button onClick={this.goToEdit} className="waves-effect waves-light btn" >
            Edit Card
          </button>
          {
            this.props.card.type === 'gift card' && this.props.card.cardHtml ?
              <button onClick={()=> window.open(this.props.card.cardHtml, "_blank")} className="waves-effect waves-light btn" >
                Check Balance
              </button> : <p></p>
          }

        </div>
      </div>
    )
  }
}



export default Card
