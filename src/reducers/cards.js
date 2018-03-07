import { LOG_OUT, REQUEST_USER, RECEIVE_USER, FILTER_CARDS, UNFILTER_CARDS, CLEAR_ALERT, SET_ALERT, SET_ALERT_SEEN } from '../constants/cards'
import { combineReducers } from 'redux'

function cardReducer(
  state = {
    isAuthenticated: false,
    user: null,
    cards: [],
    retailers: [],
    isFetching: false,
    email: null,
    selectedRetailer: null,
    hasSelected: false,
    upToDate: false,
    alert: " ",
    alertOn: true
  },
  action
) {
  switch (action.type) {
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        upToDate: false,
        user: null,
        cards: [],
        retailers: [],
        isFetching: false,
        email: null,
        alertOn: true,
        alert: " "
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        upToDate: true,
        user: action.payload.response.data.user,
        retailers: action.payload.response.data.retailers,
        cards: action.payload.response.data.user.cards,
        email: action.payload.response.data.user.email
      })
    case FILTER_CARDS:
      return Object.assign({}, state, {
        selectedRetailer: action.payload.selectedRetailer,
        hasSelected: true
      })
    case UNFILTER_CARDS:
      return Object.assign({}, state, {
        selectedRetailer: null,
        hasSelected: false
      })
    case SET_ALERT:
      return Object.assign({}, state, {
        alert: action.payload.alert,
      })
    case SET_ALERT_SEEN:
      return Object.assign({}, state, {
        alertOn: false
      })
    case CLEAR_ALERT:
      return Object.assign({}, state, {
        alertOn: true,
        alert: " "
      })
    default:
      return state
  }
}

// note to self: combineReducers not actually necessary, as I only have one reducer
const rootReducer = combineReducers({
  cardReducer
})

export default rootReducer
