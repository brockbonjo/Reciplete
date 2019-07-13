import React, { Component } from 'react';
import recipesService from '../../services/recipesService'

class RecipeForm extends Component {
   state = {
      ...this.initializeState()
   };
   
   initializeState() {
      return {
            name: '',
            station: '',
            ingredients: [this.getNewIngredient()],
            technique: [this.getNewStep()]
      };
   }

   getNewStep() {
      return {content: ''}
   };

   getNewIngredient() {
      return {
         name: '',
         amount: ''
      }
   };

   handleReset = () => {
      this.setState(this.initializeState());
   };

   handleRecipeChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleIngredientChange = (e, idx) => {
      const ingredients = [...this.state.ingredients];
      const currentIngredient = ingredients[idx];
      currentIngredient[e.target.name] = e.target.value;
      ingredients[idx] = currentIngredient;
      this.setState({ ingredients });
   };

   handleStepChange = (e, idx) => {
      const technique = [...this.state.technique];
      const currentStep = technique[idx];
      currentStep[e.target.name] = e.target.value;
      technique[idx] = currentStep;
      this.setState({ technique });
   };

   handleAddIngredient = (idx) => {
      const ingredients = [...this.state.ingredients];
      ingredients.splice(idx + 1, 1, this.getNewIngredient());
      this.setState({ ingredients });
   };
   
   handleRemoveIngredient = (idx) => {
      const ingredients = [...this.state.ingredients];
      if (ingredients.length > 1) ingredients.splice(idx, 1);
      this.setState({ ingredients });
   };

   handleAddStep = (idx) => {
      const technique = [...this.state.technique];
      technique.splice(idx + 1, 1, this.getNewStep());
      this.setState({ technique });
   };
   
   handleRemoveStep = (idx) => {
      const technique = [...this.state.technique];
      if (technique.length > 1) technique.splice(idx, 1);
      this.setState({ technique });
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      recipesService.createRecipe(this.props.restaurant._id ,this.state);
      this.handleReset();
   };

   isFormInvalid() {
      return !(this.state.name && this.state.station && this.state.ingredients.length >= 1 && this.state.technique.length >= 1);
   }

   render() {
      return (
         <div className="container page">
            <h2 className="header-footer">Add New Recipe</h2>
            <form onSubmit={this.handleSubmit} >
               <div className="row">
                  <div className="form-group col-sm-6">
                     <label htmlFor="recipe-name">Recipe Name:</label>
                     <input id="recipe-name" type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleRecipeChange} />
                  </div>
                  <div className="form-group col-sm-6">
                     <label htmlFor="recipe-station">Station:</label>
                     <input id="recipe-station" type="text" className="form-control" placeholder="Station" value={this.state.station} name="station" onChange={this.handleRecipeChange} />
                  </div>
               </div>
               <div className="form-group">
                  <label>Ingredients:</label>
                  {this.state.ingredients.map((ing, idx) => 
                     <div className="row" key={`i${idx}`}>
                        <div className="col-sm-6">
                              <input type="text" className="form-control" placeholder="Ingredient Name" value={ing.name} name="name" onChange={(e) => this.handleIngredientChange(e, idx)} />
                        </div>
                        <div className="col-sm-4">
                              <input type="text" className="form-control" placeholder="Amount" value={ing.amount} name="amount" onChange={(e) => this.handleIngredientChange(e, idx)} />
                        </div>
                        <div className="col-sm-2 btn-group">
                           <button type="button" className="btn btn-sm btn-secondary" onClick={() => this.handleRemoveIngredient(idx)}>-</button>
                           <button type="button" className="btn btn-sm btn-secondary" onClick={() => this.handleAddIngredient(idx)}>+</button>
                        </div>
                     </div>
                     )}
                  </div>
               <div className="form-group justify-content-center">
                  <label>Technique:</label>
                  {this.state.technique.map((step, idx) => 
                     <div className="row"  key={`t${idx}`}>
                        <label htmlFor="stepRow">{`${idx + 1}`}: </label>
                        <div className="col-sm-10">
                           <textarea id="stepRow" type="text" className="form-control" placeholder="Enter a Technical Step" value={step.content} name="content" onChange={(e) => this.handleStepChange(e, idx)} />
                        </div>
                        <div className="col-sm-1 btn-group">
                           <button type="button" className="form-group btn btn-sm btn-secondary" onClick={() => this.handleRemoveStep(idx)}>-</button>
                           <button type="button" className="form-group btn btn-sm btn-secondary" onClick={() => this.handleAddStep(idx)}>+</button>
                        </div>
                     </div>
                  )}
               </div>
               <div className="form-row">
                  <div className="col-sm-12 text-center">
                     <button className="btn btn-success" disabled={this.isFormInvalid()}>Submit Recipe</button>&nbsp;&nbsp;
                     <button type="reset" className="btn btn-danger" onClick={this.handleReset}>Cancel</button>
                  </div>
               </div>
            </form>
         </div>
      );
   }
}

export default RecipeForm;