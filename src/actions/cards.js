import { LOG_IN, LOG_OUT, INVALIDATE_USER, REQUEST_USER, RECEIVE_USER } from '../constants/cards'
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

// function shouldFetchUser(state) {
//   console.log("should fetch user")
//   console.log(state)
//   return true
//   // if (state.cardReducer.cards.length === 0) {
//   //   console.log("true")
//   //   return true
//   // } else if (state.cardReducer.isFetching) {
//   //   return false
//   // } else {
//   //   return state.cardReducer.didInvalidate
//   // }
// }

export function invalidateUser() {
  return {
    type: INVALIDATE_USER,
  }
}

// export function fetchUser() {
//
//   return function (dispatch) {
//     dispatch(requestUser())
//
//     return
//     console.log("fetching user...")
//       axios({
//           method: "GET",
//           url: `http://localhost:1337/api/v1/cards'`,
//           headers: {'Authorization': "Bearer " + localStorage.token}
//       })
//       .then(response => {
//         console.log(response)
//         dispatch(receiveUser(response))
//       })
//       .catch(err => console.log(err))
//   }
// }


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
        // error => console.log('An error occurred.', error)
      )
  }
}


// export function fetchUserIfNeeded() {
//   console.log("fetch user if needed")
//   return (dispatch, getState) => {
//     if (shouldFetchUser(getState())) {
//       console.log("need to fetch user now")
//       return dispatch(fetchUser())
//     } else {
//       return Promise.resolve()
//     }
//   }
// }
