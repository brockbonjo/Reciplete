const BASE_URL = '/api/restaurants'

export default {
   createRestaurant,
   getRestaurant,
   addUser,
};

function createRestaurant(restaurant) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(restaurant)
   };
   return fetch(BASE_URL, options).then(res => res.json());
}

function getRestaurant(userId) {
   return fetch(`${BASE_URL}/${userId}`, { method: 'GET' }).then(res => res.json());
}

function addUser(newUser, restaurantId) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newUser)
   }
   return fetch(`${BASE_URL}/${restaurantId}`, options).then(res => res.json());
}