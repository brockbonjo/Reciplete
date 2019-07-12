import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './NavBar.module.css';

class NavBar extends React.Component {
   state = {
      query: ''
   };

   handleQuery = (e) => {
      this.setState({[e.target.name]: e.target.value});
   }

   render() {
   let admin = this.props.user ? this.props.user.admin ?
      <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Staff
         </a>
         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to='/'>View Staff</Link>
            <a className="dropdown-item" href="/">Add/Promote</a>
         </div>
      </li>
      : null : null;

   let navbar = this.props.user ? 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a className="navbar-brand" href="/">RecipYeet{this.props.restaurant ? ` - ${this.props.restaurant.name}` : null}</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
               <li className="nav-item active">
                  <a className="nav-link" href="/">Dashboard<span className="sr-only">(current)</span></a>
               </li>
               <li className="nav-item active">
                  <Link className="nav-link" to='/' onClick={() => this.props.handleLogout()}>Log Out</Link>
               </li>
               {admin}
               <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Recipes
                  </a>
               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/">View All</a>
                  <a className="dropdown-item" href="/">Create New</a>
                  <a className="dropdown-item" href="/">Something else here</a>
               </div>
               </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={() => this.props.handleSearch(this.state.query)}>
               <input 
                  className="form-control mr-sm-2" 
                  type="search" 
                  placeholder="Recipe Name" 
                  aria-label="Search" 
                  name="query" 
                  value={this.state.query} 
                  onChange={this.handleQuery}
               />
               <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search Recipes</button>
            </form>
         </div>
      </nav>
      :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a className="navbar-brand" href="/">RecipYeet</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
               <li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link" to='/signup'>Signup</Link>
               </li>
            </ul>
         </div>
      </nav>
      return ( 
         <div className='NavBar'>
            {navbar}
         </div>
      );
   }
}
 
export default NavBar;