// handleWindowSizeChange copied from https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterCards, unFilterCards, handleAlert } from '../actions/cards'
import AutoCompleteFilters from "../components/AutoCompleteFilters"
import MobileCardList from "../components/MobileCardList"
import CardList from "../components/CardList"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchSuggestions from '../components/SearchSuggestions'
import muiTheme from '../components/muiTheme'
import '../stylesheets/dashboard.css'



class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.limitByRetailer = this.limitByRetailer.bind(this);
    this.unFilter = this.unFilter.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.goToCard = this.goToCard.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  componentDidMount(){
    this.props.dispatch(handleAlert(localStorage.token, this.props.upToDate, this.props.alertOn, this.props.alert))
  }

  goToCard(e, id) {
    e.preventDefault();
    this.props.history.push(`/cards/${id}`)
  }

  limitByRetailer(selectedRetailer) {
    this.props.dispatch(filterCards(selectedRetailer))
  }

  unFilter(e){
    e.preventDefault();
    this.props.dispatch(unFilterCards())
  }

  render() {
    const { width, height } = this.state;
    const isMobile = width <= 540 || height <=540;
    let filterExplanation = (this.props.selectedRetailer ? (<div className="filter-explanation"><p>only showing cards & coupons for {this.props.selectedRetailer}</p><button onClick={this.unFilter}>[clear]</button></div>) : <p> </p>)
    let filteredCards = !this.props.selectedRetailer ? this.props.cards : this.props.cards.filter(card => card.retailer === this.props.selectedRetailer)
    let retailers = this.props.cards.map((card, i) => {
      return (card.retailer)
    })

    return (
      <div className="dashboard">
        {!this.props.isFetching && !this.props.isAuthenticated && <p>You must be logged in before viewing your wallet</p>}
        {!this.props.isFetching && this.props.isAuthenticated && !this.props.selectedRetailer && this.props.length === 0 && <p>You do not currently have  any cards or coupons saved...</p>}
        {this.props.cards.length > 0 &&
          <div>
            <h2>gift cards & coupons</h2>
            {!this.props.selectedRetailer?
              <MuiThemeProvider muiTheme={muiTheme}>
                <AutoCompleteFilters retailers={retailers} limitByRetailer={this.limitByRetailer}/>
              </MuiThemeProvider> : <p></p>  }
            {filterExplanation}
            {isMobile ? <MobileCardList filteredCards={filteredCards} goToCard={this.goToCard} /> : <CardList filteredCards={filteredCards} cards={this.props.cards} history={this.props.history} delete={this.deleteCard}/>}
            {this.props.isAuthenticated && this.props.selectedRetailer && filteredCards.length === 0 && <h5 className="no-results">you do not have any gift cards or coupons saved for {this.props.selectedRetailer}</h5>}
            {this.props.selectedRetailer && <SearchSuggestions selectedRetailer={this.props.selectedRetailer}/>}
          </div>
        }
      </div>
    )
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.cardReducer.isAuthenticated,
  user: state.cardReducer.user,
  token: state.cardReducer.token,
  cards: state.cardReducer.cards,
  isFetching: state.cardReducer.isFetching,
  selectedRetailer: state.cardReducer.selectedRetailer,
  hasSelected: state.cardReducer.selectedRetailer,
  upToDate: state.cardReducer.upToDate,
  alert: state.cardReducer.alert,
  alertOn: state.cardReducer.alertOn
})


export default connect(mapStateToProps)(Dashboard)
