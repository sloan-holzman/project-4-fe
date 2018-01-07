import { LOG_IN, LOG_OUT } from '../constants/login'
import 'babel-polyfill'


export function login(user, token) {
  return {
    type: LOG_IN,
    payload: {
      user,
      token
    }
  }
}

export function logout() {
  return {
    type: LOG_OUT,
  }
}
