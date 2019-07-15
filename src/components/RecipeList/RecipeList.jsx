import React, { Component } from 'react';
import './RecipeList.css'

class RecipeList extends Component {

   render() { 
      const stationLinks = this.props.stations.map((station, idx) => 
         <button key={`st${idx}`}className="btn btn-primary m-1">{station}</button>
       );
      // Generates a styled recipe card for each recipe in the restaurant's catalog
      let recipeCards = this.props.user ? <div className="col-sm-12">
         {this.props.restaurant.recipes.map((recipe, idx) => {
               var ingredients = recipe.ingredients.map((ing, idx) => <li key={`r${idx}`}>{ing.name} - {ing.amount}</li> )
               var steps = recipe.technique.map((step, idx) => 
                  <li key={`s${idx}`} className="row">
                     <label htmlFor={`s${idx}`}>{`${idx + 1}:`}</label>
                     <p id={`s${idx}`} className="card-text">{step.content}</p>
                  </li> 
               )
               return(
                  <div key={`c${idx}`} className="card w-80">
                     <div className="card-header">
                        <h5 className="card-title">{recipe.name} - {recipe.station}</h5>
                     </div>
                     <div className="card-body">
                        <ul>{ingredients}</ul>
                        <ul>{steps}</ul>
                        <div className="form-inline">
                           <button className="btn btn-primary mr-1" onClick={(e) => this.props.handleEditRecipe(e, recipe)}>Edit</button>
                           {this.props.user.admin ? 
                              <form className="input-group" onSubmit={() => this.props.handleDeleteRecipe(recipe)}>
                                 <input type="submit" className="btn btn-danger" value="Delete"/>
                                 <div className="input-group-append">
                                    <div className="input-group-text">
                                       <input type="checkbox" required/> 
                                    </div>
                                 </div>
                                 <p className="my-auto">(confirm delete)</p>
                              </form>
                           : null}
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
         : null;


      // End Block, actual render return: 
      return ( 
         <>
            <div className="container justify-content-center d-flex">{stationLinks}</div>
            <div className="container"> {recipeCards} </div>
         </>
       );
   }
}
 
export default RecipeList;