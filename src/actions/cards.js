import { LOG_IN, LOG_OUT, UPDATE_CARDS_AFTER_POST } from '../constants/cards'
import 'babel-polyfill'


export function login(user) {
  return {
    type: LOG_IN,
    payload: {
      user
    }
  }
}

export function logout() {
  return {
    type: LOG_OUT,
  }
}

export function update_cards_after_post(cards) {
  return {
    type: UPDATE_CARDS_AFTER_POST,
    payload: {
      cards
    }
  }
}
