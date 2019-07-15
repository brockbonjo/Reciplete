import React from 'react';
import './RecipeForm.css';

const RecipeForm = (props) => {

   const isFormInvalid = () => {
         return !(props.recipe.name && props.recipe.station && props.recipe.ingredients.length >= 1 && props.recipe.technique.length >= 1);
   }

   return (
      <div className="container">
         <h2 className="header-footer">{props.editMode ? `Editing ${props.recipe.name}` : 'Add New Recipe'}</h2>
         <form onSubmit={props.handleSubmitRecipe} >
            <div className="row">
               <div className="form-group col-sm-6">
                  <label htmlFor="recipe-name">Recipe Name:</label>
                  <input id="recipe-name" type="text" className="form-control" placeholder="Name" value={props.recipe.name} name="name" onChange={(e) => props.handleRecipeChange(e)} />
               </div>
               <div className="form-group col-sm-6">
                  <label htmlFor="recipe-station">Station:</label>
                  <input id="recipe-station" type="text" className="form-control" placeholder="Station" value={props.recipe.station} name="station" onChange={(e) => props.handleRecipeChange(e)} />
               </div>
            </div>
            <div className="form-group">
               <label>Ingredients:</label>
               {props.recipe.ingredients.map((ing, idx) => 
                  <div className="row" key={`i${idx}`}>
                     <div className="col-sm-6">
                           <input type="text" className="form-control" placeholder="Ingredient Name" value={ing.name} name="name" onChange={(e) => props.handleIngredientChange(e, idx)} />
                     </div>
                     <div className="col-sm-4">
                           <input type="text" className="form-control" placeholder="Amount" value={ing.amount} name="amount" onChange={(e) => props.handleIngredientChange(e, idx)} />
                     </div>
                     <div className="col-sm-2 btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => props.handleRemoveIngredient(idx)}>-</button>
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => props.handleAddIngredient(idx)}>+</button>
                     </div>
                  </div>
                  )}
               </div>
            <div className="form-group justify-content-center">
               <label>Technique:</label>
               {props.recipe.technique.map((step, idx) => 
                  <div className="row tech-row"  key={`t${idx}`}>
                     <label htmlFor="stepRow">{`${idx + 1}`}: </label>
                     <div className="col-sm-10 step-box">
                        <textarea id="stepRow" type="text" className="form-control" placeholder="Enter a Technical Step" value={step.content} name="content" onChange={(e) => props.handleStepChange(e, idx)} />
                     </div>
                     <div className="col-sm-2 btn-group button-box">
                        <button type="button" className="form-group btn btn-sm btn-outline-secondary" onClick={() => props.handleRemoveStep(idx)}>-</button>
                        <button type="button" className="form-group btn btn-sm btn-outline-primary" onClick={() => props.handleAddStep(idx)}>+</button>
                     </div>
                  </div>
               )}
            </div>
            <div className="form-row">
               <div className="col-sm-12 text-center">
                  <button className="btn btn-success" disabled={isFormInvalid()}>Submit Recipe</button>&nbsp;&nbsp;
                  <button type="reset" className="btn btn-danger" onClick={() => props.handleReset()}>Cancel</button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default RecipeForm;