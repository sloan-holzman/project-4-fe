import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from "../components/Card"
import { fetchUser, filterCards, unFilterCards } from '../actions/cards'
import axios from "axios";
import backend from "../BackendVariable";
import AutoCompleteFilters from "../components/AutoCompleteFilters"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchSuggestions from '../components/SearchSuggestions'
import muiTheme from '../components/muiTheme'

class Dashboard extends Component {
  constructor() {
    super();
    this.deleteCard = this.deleteCard.bind(this);
    this.limitByRetailer = this.limitByRetailer.bind(this);
    this.unFilter = this.unFilter.bind(this);

  }


  componentDidMount(){
    if (localStorage.token) {
      this.props.dispatch(fetchUser())
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
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
    })
  }

  limitByRetailer(selectedRetailer) {
    this.props.dispatch(filterCards(selectedRetailer))
  }

  unFilter(e){
    e.preventDefault();
    this.props.dispatch(unFilterCards())
  }

  render() {
    let filterExplanation = (this.props.selectedRetailer ? (<div className="filter-explanation"><p>only showing cards for {this.props.selectedRetailer}</p><button onClick={this.unFilter}>[clear]</button></div>) : <p> </p>)
    let filteredCards = !this.props.selectedRetailer ? this.props.cards : this.props.cards.filter(card => card.retailer === this.props.selectedRetailer)
    let cards = filteredCards.map((card, i) => {
      return (
        <li key={i}>
          <Card
            card={card}
            history={this.props.history}
            deleteCard={this.deleteCard}
          />
        </li>
      )
    })
    let retailers = this.props.cards.map((card, i) => {
      return (card.retailer)
    })
    return (
      <div className="dashboard">
        {!this.props.isAuthenticated && cards.length === 0 && <p>You must be logged in before viewing your cards</p>}
        {this.props.isAuthenticated && !this.props.selectedRetailer && cards.length === 0 && <p>You do not currently have  any cards saved...</p>}
        {this.props.cards.length > 0 &&
          <div>
            <h2>gift cards and coupons</h2>
            {!this.props.selectedRetailer?
              <MuiThemeProvider muiTheme={muiTheme}>
                <AutoCompleteFilters retailers={retailers} limitByRetailer={this.limitByRetailer}/>
              </MuiThemeProvider> : <p></p>  }
            {filterExplanation}
            <ul>
              {cards}
              {this.props.isAuthenticated && this.props.selectedRetailer && cards.length === 0 && <h5 className="no-results">you do not have any gift cards saved for {this.props.selectedRetailer}</h5>}
              {this.props.selectedRetailer && <SearchSuggestions selectedRetailer={this.props.selectedRetailer}/>}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token,
  cards: state.cardReducer.cards,
  isFetching: state.cardReducer.isFetching,
  didInvalidate: state.cardReducer.didInvalidate,
  selectedRetailer: state.cardReducer.selectedRetailer,
  hasSelected: state.cardReducer.selectedRetailer
})


export default connect(mapStateToProps)(Dashboard)
