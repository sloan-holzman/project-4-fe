import { LOG_IN, LOG_OUT, UPDATE_CARDS_AFTER_POST } from '../constants/cards'
import { combineReducers } from 'redux'

function cardReducer(
  state = {
    isAuthenticated: false,
    user: null,
    cards: []
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
        cards: []
      })
    case UPDATE_CARDS_AFTER_POST:
      return Object.assign({}, state, {
        cards: action.payload.cards,
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cardReducer
})

export default rootReducer
