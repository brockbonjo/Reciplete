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
      const restaurantInput = this.state.newRestaurant &&
            <div className="form-group col-sm-6">
               <input 
                  id="restName" 
                  className="form-control"
                  type="text" 
                  placeholder="New Restaurant Name" 
                  value={this.state.restaurant.name} 
                  name="name" 
                  onChange={this.handleRestaurantChange} 
               />
            </div>;

      return (
         <div className="container col-6">
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit} >
               <div className={`form-row justify-content-center`}>
                  <div className="form-group col-sm-6">
                     <div className="input-group">
                        <span className="form-control bg-secondary text-light">Registering A New Restaurant?</span>
                        <div className="input-group-append">
                           <div className="input-group-text"> 
                              <input 
                                 type="checkbox" 
                                 checked={this.state.newRestaurant}
                                 onChange={() => this.setState(prevState => ({newRestaurant: !prevState.newRestaurant}))} 
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  {restaurantInput}
               </div>
               <div className="form-row">
                  <div className="form-group col-sm-6">
                     <label htmlFor="signupName">Name:</label>
                     <input 
                        id="signupName" 
                        className="form-control"
                        type="text" 
                        placeholder="Name" 
                        value={this.state.user.name} 
                        name="name" 
                        onChange={this.handleUserChange} 
                     />
                  </div>
                  <div className="form-group col-sm-6">
                     <label htmlFor="signupEmail">Email:</label>
                     <input 
                        id="signupEmail"
                        className="form-control"
                        type="email" 
                        placeholder="Email" 
                        value={this.state.user.email} 
                        name="email" 
                        onChange={this.handleUserChange} 
                     />
                  </div>
               </div>
               <div className="form-row">
                  <div className="form-group col-sm-6">
                     <label htmlFor="signupPassword">Password:</label>
                     <input 
                        id="signupPassword" 
                        className="form-control"
                        type="password" 
                        placeholder="Password" 
                        value={this.state.user.password} 
                        name="password" 
                        onChange={this.handleUserChange} 
                     />
                  </div>
                  <div className="form-group col-sm-6">
                     <label htmlFor="confirmPassword">Confirm Password:</label>
                     <input 
                        id="confirmPassword"
                        className="form-control"
                        type="password" 
                        placeholder="Confirm Password" 
                        value={this.state.user.passwordConf} 
                        name="passwordConf" 
                        onChange={this.handleUserChange} 
                     />
                  </div>
               </div>
               <label></label>
               <button className="btn btn-success" type="submit" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            </form>
         </div>
      );
   }

}

export default SignupPage;