import React, { Component } from 'react'
import axios from "axios";
import backend from "../BackendVariable";
import CardBack from './CardBack'
import CardFront from './CardFront'
import ReactCardFlip from 'react-card-flip';



class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
  }

  deleteCard(e) {
    e.preventDefault();
     axios({
      method: "DELETE",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: {
        card_id: this.props.card._id
      }
    })
    .then(response => {
      if (response.data) {
        this.props.history.push(`/login`)
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  goToEdit(e) {
    e.preventDefault();
    this.props.history.push(`/cards/edit/${this.props.card._id}`)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    let checkValueSite = `https://www.giftcardgranny.com/gift-card-balance-check/${this.props.card.retailer.split(' ').join('-')}`
    let date_options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }
    return (
      <div className="card">
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <CardFront key="front" date_options={date_options} card={this.props.card} handleClick={this.handleClick} />
          <CardBack key="back" date_options={date_options} card={this.props.card} handleClick={this.handleClick} />
        </ReactCardFlip>
        <br/>
        <div className="card__buttons">
          <button onClick={this.deleteCard} className="waves-effect waves-light btn" >
            Delete Card
          </button>
          <button onClick={this.goToEdit} className="waves-effect waves-light btn" >
            Edit Card
          </button>
          <button onClick={()=> window.open(checkValueSite, "_blank")} className="waves-effect waves-light btn" >
            Check Value
          </button>
        </div>
      </div>
    )
  }
}



export default Card
