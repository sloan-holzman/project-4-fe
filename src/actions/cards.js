import { LOG_IN, LOG_OUT, REQUEST_USER, RECEIVE_USER, FILTER_CARDS, UNFILTER_CARDS, CLEAR_ALERT, SET_ALERT, SET_ALERT_SEEN, FORCE_UPDATE } from '../constants/cards'
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

export function clearAlert() {
  return {
    type: CLEAR_ALERT,
  }
}

export function setAlert(alert) {
  return {
    type: SET_ALERT,
    payload: {
      alert
    }
  }
}

export function setAlertSeen() {
  return {
    type: SET_ALERT_SEEN
  }
}

function requestUser() {
  return {
    type: REQUEST_USER
  }
}

function receiveUser(response) {
  return {
    type: RECEIVE_USER,
    payload: {
      response
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
        // response => console.log(response)
      )
      .catch(err => {
        localStorage.clear()
      })
  }
}

export function forceUpdate() {
  return {
    type: FORCE_UPDATE
  }
}

export function filterCards(selectedRetailer) {
  return {
    type: FILTER_CARDS,
    payload: {
      selectedRetailer
    }
  }
}

export function unFilterCards() {
  return {
    type: UNFILTER_CARDS,
  }
}
