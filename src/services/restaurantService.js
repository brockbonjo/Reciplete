import tokenService from './tokenService';

const BASE_URL = '/api/restaurants'

export default {
   createRestaurant,
   getRestaurant,
   addOrUpdateUser,
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

function addOrUpdateUser(user, restaurantId) {
   const options = {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(user)
   }
   return fetch(`${BASE_URL}/${restaurantId}`, options).then(res => {
      if (res.ok) return res.json();
      throw new Error('Email not Found!');
   });
}