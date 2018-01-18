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
import '../stylesheets/dashboard.css'



class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
    this.deleteCard = this.deleteCard.bind(this);
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
    this.setState({ width: window.innerWidth });
  };

  componentDidMount(){
    if (localStorage.token && !this.props.upToDate) {
      console.log("updated!")
      this.props.dispatch(fetchUser())
    }
    if (!this.props.alertOn) {
      this.props.clearAlert()
    }
    if (this.props.alertOn && this.props.alert !== " ") {
      this.props.setAlertSeen()
    }
  }

  goToCard(e, id) {
    e.preventDefault();
    this.props.history.push(`/cards/${id}`)
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
        this.props.setAlert("card delete successfully")
      }
    })
    .catch(err => {
      localStorage.clear()
      this.props.history.push(`/login`)
      this.props.setAlert("woops, something went wrong")
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
    const { width } = this.state;
    const isMobile = width <= 540;
    let filterExplanation = (this.props.selectedRetailer ? (<div className="filter-explanation"><p>only showing cards & coupons for {this.props.selectedRetailer}</p><button onClick={this.unFilter}>[clear]</button></div>) : <p> </p>)
    let filteredCards = !this.props.selectedRetailer ? this.props.cards : this.props.cards.filter(card => card.retailer === this.props.selectedRetailer)
    let cards = filteredCards.map((card, i) => {
      return (
        <li key={i}>
          <Card
            card={card}
            cards={this.props.cards}
            history={this.props.history}
            deleteCard={this.deleteCard}
          />
        </li>
      )
    })
    let mobileCards = filteredCards.map((card, i) => {
      return (
        <tr>
          <td>{card.retailer}</td>
          <td>{card.type}</td>
          <td>{card.amount}</td>
          <td><button onClick={ (e) => this.goToCard(e, card._id) } className="waves-effect waves-light btn">Details </button></td>
        </tr>
      )
    })
    let retailers = this.props.cards.map((card, i) => {
      return (card.retailer)
    })


    if (!isMobile) {
      return (
        <div className="dashboard">
          {/* {this.props.isFetching && <p>Loading...</p>} */}
          {!this.props.isFetching && !this.props.isAuthenticated && cards.length === 0 && <p>You must be logged in before viewing your wallet</p>}
          {!this.props.isFetching && this.props.isAuthenticated && !this.props.selectedRetailer && cards.length === 0 && <p>You do not currently have  any cards or coupons saved...</p>}
          {this.props.cards.length > 0 &&
            <div>
              <h2>gift cards & coupons</h2>
              {!this.props.selectedRetailer?
                <MuiThemeProvider muiTheme={muiTheme}>
                  <AutoCompleteFilters retailers={retailers} limitByRetailer={this.limitByRetailer}/>
                </MuiThemeProvider> : <p></p>  }
              {filterExplanation}
              <ul>
                {cards}
                {this.props.isAuthenticated && this.props.selectedRetailer && cards.length === 0 && <h5 className="no-results">you do not have any gift cards or coupons saved for {this.props.selectedRetailer}</h5>}
                {this.props.selectedRetailer && <SearchSuggestions selectedRetailer={this.props.selectedRetailer}/>}
              </ul>
            </div>
          }
        </div>
      )
    } else {
      return (
        <div className="dashboard">
          {/* {this.props.isFetching && <p>Loading...</p>} */}
          {!this.props.isFetching && !this.props.isAuthenticated && cards.length === 0 && <p>You must be logged in before viewing your wallet</p>}
          {!this.props.isFetching && this.props.isAuthenticated && !this.props.selectedRetailer && cards.length === 0 && <p>You do not currently have  any cards or coupons saved...</p>}
          {this.props.cards.length > 0 &&
            <div>
              <h2>gift cards & coupons</h2>
              {!this.props.selectedRetailer?
                <MuiThemeProvider muiTheme={muiTheme}>
                  <AutoCompleteFilters retailers={retailers} limitByRetailer={this.limitByRetailer}/>
                </MuiThemeProvider> : <p></p>  }
              {filterExplanation}
              <table className="bordered striped highlight centered responsive-table">
                <thead>
                  <tr>
                    <th>retailer</th>
                    <th>type</th>
                    <th>amount</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {mobileCards}
                </tbody>
              </table>
              {this.props.isAuthenticated && this.props.selectedRetailer && cards.length === 0 && <h5 className="no-results">you do not have any gift cards or coupons saved for {this.props.selectedRetailer}</h5>}
              {this.props.selectedRetailer && <SearchSuggestions selectedRetailer={this.props.selectedRetailer}/>}
            </div>
          }
        </div>
      )
  }
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
  hasSelected: state.cardReducer.selectedRetailer,
  upToDate: state.cardReducer.upToDate,
  alert: state.cardReducer.alert,
  alertOn: state.cardReducer.alertOn
})


export default connect(mapStateToProps)(Dashboard)
