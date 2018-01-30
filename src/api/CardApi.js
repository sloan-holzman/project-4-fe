import axios from "axios";
import backend from "../BackendVariable";

class CardApi {

  // static requestHeaders() {
  //   return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  // }
  //
  // static getAllCats() {
  //   const headers = this.requestHeaders();
  //   const request = new Request(`${process.env.API_HOST}/api/v1/cats`, {
  //     method: 'GET',
  //     headers: headers
  //   });
  //
  //   return fetch(request).then(response => {
  //     return response.json();
  //   }).catch(error => {
  //     return error;
  //   });
  // }
  //
  // static updateCat(cat) {
  //   const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
  //   const request = new Request(`${process.env.API_HOST}/api/v1/cats/${cat.id}`, {
  //     method: 'PUT',
  //     headers: headers,
  //     body: JSON.stringify({cat: cat})
  //   });
  //
  //
  //   return fetch(request).then(response => {
  //     return response.json();
  //   }).catch(error => {
  //     return error;
  //   });
  // }
  //
  // static createCat(cat) {
  //   const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
  //   const request = new Request(`${process.env.API_HOST}/api/v1/cats`, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify({cat: cat})
  //   });
  //
  //
  //   return fetch(request).then(response => {
  //     return response.json();
  //   }).catch(error => {
  //     return error;
  //   });
  // }
  //
  // static deleteCat(cat) {
  //   const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
  //   const request = new Request(`${process.env.API_HOST}/api/v1/cats/${cat.id}`, {
  //     method: 'DELETE',
  //     headers: headers
  //   });
  //
  //   return fetch(request).then(response => {
  //     return response.json();
  //   }).catch(error => {
  //     return error;
  //   });
  // }


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
