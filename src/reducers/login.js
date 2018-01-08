import { LOG_IN, LOG_OUT } from '../constants/login'
import { combineReducers } from 'redux'

function loginReducer(
  state = {
    isAuthenticated: false,
    user: null,
    token: '',
    cards: []
  },
  action
) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload.user,
        cards: action.payload.user.cards,
        token: action.payload.token
      })
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null,
        cards: [],
        token: ''
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  loginReducer
})

export default rootReducer
