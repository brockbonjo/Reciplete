const BASE_URL = '/api/restaurants'

export default {
   createRecipe,

};

function createRecipe(restaurantId, recipe) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(recipe)
   };
   return fetch(`${BASE_URL}/${restaurantId}/recipes`, options).then(res => res.json());
}