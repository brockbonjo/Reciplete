import React, { Component } from 'react';
import userService from '../../services/userService';

class SignupPage extends Component {
   state = {
      newRestaurant: false,
      user: {
         name: '',
         email: '',
         admin: false,
         password: '',
         passwordConf: ''
      },
      restaurant: {
         name: '',
         users: [],
         recipes: []
      }
   };

   handleUserChange = (e) => {
      const user = this.state.user;
      user[e.target.name] = e.target.value;
      if (this.state.newRestaurant) user.admin = true;
      this.setState({ user });
   }

   handleNewRestaurantToggle = () => {
      let newRestaurant = this.state.newRestaurant;
      if (newRestaurant === false) {
         newRestaurant = true;
      } else { newRestaurant = false; };
      this.setState({ newRestaurant });
   }

   handleRestaurantChange = (e) => {
         const restaurant = this.state.restaurant;
         restaurant.name = e.target.value;
         this.setState({restaurant});
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      await userService.signup(this.state.user);
      this.props.handleSignupOrLogin();
      if (this.state.newRestaurant && this.state.restaurant.name) {
         this.props.handleNewRestaurant(this.state.restaurant)
      };
      this.props.history.push('/');
   }

   isFormInvalid = () => {
      return !(this.state.user.name && this.state.user.email && this.state.user.password === this.state.user.passwordConf);
   }

   render() {
      const restaurantName = this.state.newRestaurant ?
            <label>Restaurant Name:</label>
            : null;
      const restaurantInput = this.state.newRestaurant ? 
            <input type="text" placeholder="Restaurant Name" value={this.state.restaurant.name} name="name" onChange={this.handleRestaurantChange} />
            : null;

      return (
      <div className='page'>
         <h2>Sign Up</h2>
         <label>Are You Registering A New Restaurant?:</label>
         <input type="checkbox" onChange={this.handleNewRestaurantToggle} />
         <form onSubmit={this.handleSubmit} >
            {restaurantName}
            {restaurantInput}
            <label>Name:</label>
            <input type="text" placeholder="Name" value={this.state.user.name} name="name" onChange={this.handleUserChange} />
            <label>Email:</label>
            <input type="email" placeholder="Email" value={this.state.user.email} name="email" onChange={this.handleUserChange} />
            <label>Password:</label>
            <input type="password" placeholder="Password" value={this.state.user.password} name="password" onChange={this.handleUserChange} />
            <label>Confirm Password:</label>
            <input type="password" placeholder="Confirm Password" value={this.state.user.passwordConf} name="passwordConf" onChange={this.handleUserChange} />
            <label></label>
            <button disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
         </form>
      </div>
      );
   }

}

export default SignupPage;