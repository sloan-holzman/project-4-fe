import axios from "axios";
import backend from "../BackendVariable";

class CardApi {
  static editCard(card, cardId) {
     return axios({
     method: "PUT",
     url: `${backend}api/v1/cards/${cardId}`,
     headers: {'Authorization': "Bearer " + localStorage.token},
      data: card
    })
    .then(response => {
      if (response.data) {
        return "success"
      }
    })
    .catch(err => {
      return "fail"
    })
  }

  static deleteCard(id) {
     return axios({
       method: "DELETE",
       url: `${backend}api/v1/cards`,
       headers: {'Authorization': "Bearer " + localStorage.token},
       data: {
         card_id: id
       }
     })
    .then(response => {
      if (response.data) {
        return "success"
      }
    })
    .catch(err => {
      return "fail"
    })
  }

  static newCard(card) {
    return axios({
      method: "POST",
      url: `${backend}api/v1/cards`,
      headers: {'Authorization': "Bearer " + localStorage.token},
      data: card
    })
    .then(response => {
      if (response.data) {
        return "success"
      }
    })
    .catch(err => {
      return "fail"
    })
  }




}

export default CardApi;
