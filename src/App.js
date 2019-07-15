import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import userService from './services/userService';
import recipesService from './services/recipesService';
import restaurantService from './services/restaurantService';
import NavBar from './components/NavBar/NavBar';
import RecipeForm from './components/RecipeForm/RecipeForm';
import RecipeList from './components/RecipeList/RecipeList';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';


class App extends React.PureComponent {
  state = { 
    restaurant: null,
    stations: [],
    user: null,
    recipe: {
      name: '',
      station: '',
      ingredients: [this.getNewIngredient()],
      technique: [this.getNewStep()]
    },
    editMode: false
  }

  initializeState() {
    return {
      recipe: {
          name: '',
          station: '',
          ingredients: [this.getNewIngredient()],
          technique: [this.getNewStep()]
      },
      editMode: false
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
      const recipe = {...this.state.recipe};
      recipe[e.target.name] = e.target.value;
      this.setState({ recipe });
  };

  handleIngredientChange = (e, idx) => {
      const recipe = {...this.state.recipe}
      const ingredients = [...recipe.ingredients];
      const currentIngredient = {...ingredients[idx]};
      currentIngredient[e.target.name] = e.target.value;
      ingredients[idx] = currentIngredient;
      recipe.ingredients = ingredients;
      this.setState({ recipe });
  };

  handleStepChange = (e, idx) => {
      const recipe = {...this.state.recipe}
      const technique = [...recipe.technique];
      const currentStep = {...technique[idx]};
      currentStep[e.target.name] = e.target.value;
      technique[idx] = currentStep;
      recipe.technique = technique;
      this.setState({ recipe });
  };

  handleAddIngredient = (idx) => {
      const recipe = {...this.state.recipe}
      const ingredients = [...recipe.ingredients];
      ingredients.splice(idx + 1, 0, this.getNewIngredient());
      recipe.ingredients = ingredients;
      this.setState({ recipe });
  };

  handleRemoveIngredient = (idx) => {
      const recipe = {...this.state.recipe}
      const ingredients = [...recipe.ingredients];
      if (ingredients.length > 1) ingredients.splice(idx, 1);
      recipe.ingredients = [...ingredients];
      this.setState({ recipe });
  };

  handleAddStep = (idx) => {
      const recipe = {...this.state.recipe}
      const technique = [...recipe.technique];
      technique.splice(idx + 1, 0, this.getNewStep());
      recipe.technique = technique;
      this.setState({ recipe });
  };

  handleRemoveStep = (idx) => {
      const recipe = {...this.state.recipe};
      const technique = [...recipe.technique];
      if (technique.length > 1) technique.splice(idx, 1);
      recipe.technique = technique;
      this.setState({ recipe });
  };

  handleSubmitEdit = () => {

  };
  
  handleEditRecipe = (recipe) => {
    this.setState({ recipe });
    this.props.history.push('/form');
  }

  handleDeleteRecipe = (e, recipe) => {
    
    console.log(recipe);
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    recipesService.createRecipe(this.props.restaurant._id ,this.state.recipe);
    this.handleReset();
    this.props.history.push('/');
  };

  handleSearch = (e, query) => {
    e.preventDefault();
    console.log(query);
  };

  // During Signup/Login/Load:
  handleSignupOrLogin = () => {
      this.setState({user: userService.getUser()});
  };

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  };

  handleNewRestaurant = (newRestaurant) => {
    const user = userService.getUser();
    if (user) { newRestaurant.users.push(user._id) };
    this.setState({ restaurant: newRestaurant });
    restaurantService.createRestaurant(newRestaurant);
  };

  async componentDidMount() {
    const user = userService.getUser();
    const restaurant = await restaurantService.getRestaurant(user._id);
    const stations = await recipesService.getStationList();
    this.setState({user, restaurant, stations});
  }

  render() { 
    return (
      <div>
        <NavBar 
          user={this.state.user}
          restaurant={this.state.restaurant}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
        />
        <Switch>
          <Route exact path="/" render={() => 
            <RecipeList
              stations={this.state.stations}
              handleEditRecipe={this.handleEditRecipe}
              handleDeleteRecipe={this.handleDeleteRecipe}
              user={this.state.user}
              restaurant={this.state.restaurant}
            />
          }/>
          <Route exact path="/form" render={() =>
            <RecipeForm
              editMode={this.editMode}
              recipe={this.state.recipe}
              restaurant={this.state.restaurant}
              handleReset={this.handleReset}
              handleSubmit={this.handleSubmit}
              handleRecipeChange={this.handleRecipeChange}
              handleIngredientChange={this.handleIngredientChange}
              handleAddIngredient={this.handleAddIngredient}
              handleRemoveIngredient={this.handleRemoveIngredient}
              handleStepChange={this.handleStepChange}
              handleAddStep={this.handleAddStep}
              handleRemoveStep={this.handleRemoveStep}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
              handleNewRestaurant={this.handleNewRestaurant}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
      </div>
    );
  }
}
 
export default App;
