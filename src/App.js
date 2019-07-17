import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import userService from './services/userService';
import recipesService from './services/recipesService';
import restaurantService from './services/restaurantService';
import NavBar from './components/NavBar/NavBar';
import RecipeForm from './components/RecipeForm/RecipeForm';
import StaffPage from './components/StaffPage/StaffPage';
import RecipeList from './components/RecipeList/RecipeList';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LandingPage from './pages/LandingPage/LandingPage';


class App extends React.PureComponent {
  state = { 
    restaurant: null,
    searchResults: [],
    stations: [],
    user: userService.getUser(),
    recipe: {
      name: '',
      station: '',
      ingredients: [this.getNewIngredient()],
      technique: [this.getNewStep()]
    },
    editMode: false,
    query: '',
    toggle: true
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
  
  handleCreateRecipe = (e) => {
    e.preventDefault();
    recipesService.createRecipe(this.state.restaurant._id ,this.state.recipe);
    this.handleReset();
    this.props.history.push('/');
  };
  
  handleEditRecipe = (recipe) => {
    this.setState({ recipe, editMode: true });
    this.props.history.push('/form');
  }

  handleSubmitEdit = async (e) => {
    e.preventDefault();
    await recipesService.updateRecipe(this.state.restaurant._id ,this.state.recipe);
    this.handleReset();
    this.hydrateRestaurantData();
    this.props.history.push('/');
  }

  handleDeleteRecipe = async (e, recipe) => {
    e.preventDefault();
    await recipesService.deleteRecipe(this.state.restaurant._id, recipe._id);
    this.handleReset();
    this.hydrateRestaurantData();
    this.props.history.push('/');
  };
  
  handleUpdateQuery = (e) => {
    const query = e.target.value;
    // filter it here
    const searchResults = this.state.restaurant.recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()));
    // set the state with the results here
    this.setState({ query, searchResults });
  };

  handleStationQuery = (query) => {
    if (query) {
      let searchResults = this.state.restaurant.recipes.filter(recipe => recipe.station.toLowerCase().includes(query.toLowerCase()));
      this.setState({ searchResults });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  hydrateRestaurantData = async () => {
    const restaurant = await restaurantService.getRestaurant();
    let stations = [];
    if (restaurant) stations = [...new Set(restaurant.recipes.map(recipe => recipe.station))];
    this.setState(prevState => ({restaurant, stations, toggle: !prevState.toggle}));
  }


  // During Signup/Login/Load:
  handleSignupOrLogin = () => {
    let user = userService.getUser()
    this.setState({user});
    this.hydrateRestaurantData();
  };

  handleLogout = () => {
    userService.logout();
    this.setState({
      restaurant: null,
      stations: [],
      user: null,
      ...this.initializeState()
    });
  };

  handleNewRestaurant = async (newRestaurant) => {
    const user = await userService.getUser();
    if (user) { newRestaurant.users.push(user._id) 
    this.setState({ restaurant: newRestaurant });
    restaurantService.createRestaurant(newRestaurant);
    };
  };

  async componentDidMount() {
    if (this.state.user) { 
      const restaurant = await restaurantService.getRestaurant();
      let stations = [];
      if (restaurant) stations = [...new Set(restaurant.recipes.map(recipe => recipe.station))];
      this.setState({restaurant, stations}, () => {
        this.hydrateRestaurantData();
      });
    }
  }

  render() { 
    return (
      <div>
        <NavBar 
          user={this.state.user}
          restaurant={this.state.restaurant}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
          handleReset={this.handleReset}
          query={this.state.query}
          handleUpdateQuery={this.handleUpdateQuery}
        />
        <Switch>
          <Route exact path="/" render={() => (
              this.state.user ?
                <RecipeList
                  stations={this.state.stations}
                  searchResults={this.state.searchResults}
                  handleEditRecipe={this.handleEditRecipe}
                  handleDeleteRecipe={this.handleDeleteRecipe}
                  handleStationQuery={this.handleStationQuery}
                  user={this.state.user}
                  restaurant={this.state.restaurant}
                />
              :
              <Redirect to="/landing" />
            )
          }/>
          <Route exact path="/form" render={() =>
            <RecipeForm
              editMode={this.state.editMode}
              recipe={this.state.recipe}
              restaurant={this.state.restaurant}
              handleReset={this.handleReset}
              handleCreateRecipe={this.handleCreateRecipe}
              handleSubmitEdit={this.handleSubmitEdit}
              handleRecipeChange={this.handleRecipeChange}
              handleIngredientChange={this.handleIngredientChange}
              handleAddIngredient={this.handleAddIngredient}
              handleRemoveIngredient={this.handleRemoveIngredient}
              handleStepChange={this.handleStepChange}
              handleAddStep={this.handleAddStep}
              handleRemoveStep={this.handleRemoveStep}
            />
          }/>
          {this.state.user ? this.state.user.admin ? 
            <Route exact path="/staffpage" render={({ history }) => 
              <StaffPage 
                hydrateRestaurantData={this.hydrateRestaurantData}
                restaurant={this.state.restaurant}
                history={history}
              />
            } />
            : null : null}
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
          <Route exact path='/landing' render={({ history }) => 
            <LandingPage 
              history={history}
            />
          }/>
        </Switch>
      </div>
    );
  }
}
 
export default App;
