import { LOG_IN, LOG_OUT, REQUEST_USER, RECEIVE_USER } from '../constants/cards'
import { combineReducers } from 'redux'

function cardReducer(
  state = {
    isAuthenticated: false,
    user: null,
    cards: [],
    isFetching: false,
    didInvalidate: false,
    email: null
  },
  action
) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.user,
        cards: action.payload.user.cards,
        email: action.payload.user.email
      })
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null,
        cards: [],
        isFetching: false,
        didInvalidate: false,
        email: null
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        isAuthenticated: true,
        user: action.payload.user,
        cards: action.payload.user.data.cards,
        email: action.payload.user.data.email
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cardReducer
})

export default rootReducer
