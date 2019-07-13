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

   handleIngredientChange = (e) => {
      const ingredients = [...this.state.ingredients];
      const currentIngredient = ingredients[ingredients.length - 1];
      currentIngredient[e.target.name] = e.target.value;
      ingredients[ingredients.length - 1] = currentIngredient;
      this.setState({ ingredients });
   };

   handleStepChange = (e) => {
      const technique = [...this.state.technique];
      const currentStep = technique[technique.length - 1];
      currentStep[e.target.name] = e.target.value;
      technique[technique.length - 1] = currentStep;
      this.setState({ technique });
   };

   handleAddIngredient = () => {
      const ingredients = [...this.state.ingredients];
      ingredients.push(this.getNewIngredient());
      this.setState({ ingredients });
   };
   
   handleRemoveIngredient = (e) => {
      console.log(e.target.name);
      const ingredients = [...this.state.ingredients];
      if (ingredients.length > 1) ingredients.splice(parseInt(e.target.name), 1);
      this.setState({ ingredients });
   };

   handleAddStep = () => {
      const technique = [...this.state.technique];
      technique.push(this.getNewIngredient());
      this.setState({ technique });
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      recipesService.createRecipe(this.props.restaurant._id ,this.state);

   };

   isFormInvalid() {
      return !(this.state.name && this.state.station && this.state.ingredients.length >= 1 && this.state.technique.length >= 1);
   }

   render() {
      return (
         <div className="container page">
            <h2 className="header-footer">Add New Recipe</h2>
            <form onSubmit={this.handleSubmit} >
               <div className="row justify-content-lg-center">
                  <div className="form-group col-sm-12">
                     <label htmlFor="recipe-name">Recipe Name:</label>
                     <input id="recipe-name" type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleRecipeChange} />
                  </div>
                  <div className="form-group col-sm-12">
                     <label htmlFor="recipe-station">Recipe Station:</label>
                     <input id="recipe-station" type="text" className="form-control" placeholder="Station" value={this.state.station} name="station" onChange={this.handleRecipeChange} />
                  </div>
               </div>
               <h3>Ingredients:</h3>
               {this.state.ingredients.map((ing, idx) => 
                  <div className="row" key={`i${idx}`}>
                     <div className="form-group">
                        <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Ingredient Name" value={ing.name} name="name" onChange={this.handleIngredientChange} />
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Ingredient Amount" value={ing.amount} name="amount" onChange={this.handleIngredientChange} />
                        </div>
                     </div>
                     <button type="button" className="form-group btn btn-sm btn-secondary" onClick={this.handleAddIngredient}>+</button>
                     <button type="button" className="form-group btn btn-sm btn-secondary" name={idx} onClick={this.handleRemoveIngredient}>-</button>
                  </div>
                  )}
               <h3>Technique:</h3>
               {this.state.technique.map((step, idx) => 
                  <div className="row"  key={`t${idx}`}>
                     <label for="stepRow" className="col-sm-2 col-form-label">Step {`${idx + 1}`}: </label>
                     <div className="col-sm-12">
                        <textarea id="stepRow" type="text" className="form-control" placeholder="Enter a Technical Step" value={step.content} name="content" onChange={this.handleStepChange} />
                     </div>
                     <button type="button" className="form-group btn btn-sm btn-secondary" onClick={this.handleAddIngredient}>+</button>
                     <button type="button" className="form-group btn btn-sm btn-secondary" name={idx} onClick={this.handleRemoveIngredient}>-</button>
                  </div>
               )}
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