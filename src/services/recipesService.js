const BASE_URL = '/api/restaurants'

export default {
   createRecipe,
   updateRecipe,
   getStationList,
   deleteRecipe
};

function createRecipe(restaurantId, recipe) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(recipe)
   };
   return fetch(`${BASE_URL}/${restaurantId}/newrecipe`, options).then(res => res.json());
}

function updateRecipe(restaurantId, recipe) {
   const options = {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(recipe)
   };
   return fetch(`${BASE_URL}/${restaurantId}/editrecipe`, options).then(res => res.json());
}

function deleteRecipe(restaurantId, recipeId) {
   return fetch(`${BASE_URL}/${restaurantId}/deleterecipe/${recipeId}`, {method: 'DELETE'}).then(res => res.json());
}

async function getStationList() {
   return fetch(BASE_URL, {method: 'GET'}).then(res => res.json());
}