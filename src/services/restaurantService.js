import tokenService from './tokenService';

const BASE_URL = '/api/restaurants'

export default {
   createRestaurant,
   getRestaurant,
   addUser,
   addAdmin
};

function createRestaurant(restaurant) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(restaurant)
   };
   return fetch(BASE_URL, options).then(res => res.json());
}

function getRestaurant() {
   const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    };
   return fetch(`${BASE_URL}`, options).then(res => {
      if (res.ok) return res.json();
   }).catch(err => {
      if (err) err.json({msg: "You have not been added to a restaurant yet."})
   });
}

function addAdmin() {

}

function addUser(newUser, restaurantId) {
   const options = {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newUser)
   }
   return fetch(`${BASE_URL}/${restaurantId}`, options).then(res => {
      if (res.ok) return res.json();
      throw new Error('Email not Found!');
   });
}