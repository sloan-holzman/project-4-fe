import { LOG_OUT, REQUEST_USER, RECEIVE_USER, FILTER_CARDS, UNFILTER_CARDS, CLEAR_ALERT, SET_ALERT, SET_ALERT_SEEN } from '../constants/cards'
import 'babel-polyfill'
import axios from "axios";
import backend from "../BackendVariable";


export function logout() {
  localStorage.clear()
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

export function receiveUser(response) {
  return {
    type: RECEIVE_USER,
    payload: {
      response
    }
  }
}


export function handleAlert(token, upToDate, alertOn, alert) {
  return function (dispatch) {
    if (token && !upToDate) {
      dispatch(fetchUser())
    }
    if (!alertOn) {
      dispatch(clearAlert())
    }
    if (alertOn && alert !== " ") {
      dispatch(setAlertSeen())
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
        dispatch(logout())
      })
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
