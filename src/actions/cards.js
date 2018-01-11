import { LOG_IN, LOG_OUT, REQUEST_USER, RECEIVE_USER } from '../constants/cards'
import 'babel-polyfill'
import axios from "axios";
import backend from "../BackendVariable";


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

function requestUser() {
  return {
    type: REQUEST_USER
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    payload: {
      user
    }
  }
}

export function fetchUser() {
  return function (dispatch) {
    dispatch(requestUser())
    return axios({
          method: "GET",
          url: `${backend}api/v1/cards`,
          headers: {'Authorization': "Bearer " + localStorage.token}
      })
      .then(
        response => dispatch(receiveUser(response))
      )
      .catch(err => {
        localStorage.clear()
      })
  }
}
