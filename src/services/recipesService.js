const BASE_URL = '/api/restaurants'

export default {
   createOrEditRecipe,
   updateRecipe,
   getStationList
};

function createOrEditRecipe(restaurantId, recipe, editMode) {
   const options = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(recipe)
   };
   return fetch(`${BASE_URL}/${restaurantId}/recipes`, options).then(res => res.json());
}

function updateRecipe() {

}

async function getStationList() {
   return fetch(BASE_URL, {method: 'GET'}).then(res => res.json());
}