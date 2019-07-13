import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import userService from './services/userService';
import restaurantService from './services/restaurantService';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';


class App extends React.PureComponent {
  state = { 
    restaurant: null,
    recipes: [],
    user: null
   }

  handleSignupOrLogin = async () => {
    const user = userService.getUser();
    if (user) {
      this.setState({user});
    }
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

  handleAddUser = (userId) => {
    const restaurant = this.state.restaurant;
    restaurant.users.push(userId);
  };

  handleSearch = (query) => {
    console.log(query);
  };

  handleSubmitRecipe = () => {
    
  }

  async componentDidMount() {
    const user = userService.getUser();
    const restaurant = await restaurantService.getRestaurant(user._id);
    if (user) {
      this.setState({user, restaurant});
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
        />
        <Switch>
          <Route exact path='/' render={() => 
            <HomePage
              user={this.state.user}
              restaurant={this.state.restaurant}
              recipes={this.state.recipes}
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
