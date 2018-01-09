import { LOG_IN, LOG_OUT, INVALIDATE_USER, REQUEST_USER, RECEIVE_USER } from '../constants/cards'
import { combineReducers } from 'redux'

function cardReducer(
  state = {
    isAuthenticated: false,
    user: null,
    cards: [],
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.user,
        cards: action.payload.user.cards
      })
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null,
        cards: [],
        isFetching: false,
        didInvalidate: false
      })
    // case UPDATE_CARDS_AFTER_POST:
    //   return Object.assign({}, state, {
    //     cards: action.payload.cards,
    //   })
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
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
        cards: action.payload.user.data.cards
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cardReducer
})

export default rootReducer
