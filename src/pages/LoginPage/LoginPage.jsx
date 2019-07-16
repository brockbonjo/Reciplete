import React, { Component } from 'react';
import userService from '../../services/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <div className='container'>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="loginEmail">Email:</label>
              <input 
                  id="loginEmail" 
                  className="form-control"
                  type="email" 
                  placeholder="Email" 
                  value={this.state.email} 
                  name="email" 
                  onChange={this.handleChange} 
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="loginPassword">Password:</label>
              <input 
                  id="loginPassword"
                  className="form-control"
                  type="password" 
                  placeholder="Password" 
                  value={this.state.pw} 
                  name="pw" 
                  onChange={this.handleChange} 
              />
            </div>
          </div>
          <button className="btn btn-success" type='submit'>Log In</button>
        </form>
      </div>
    );
  }
};

export default LoginPage;