import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
   state = {
      query: ''
   };

   handleUpdateQuery = (e) => {
      const query = e.target.value;
      this.setState({ query });
   };

   handleSubmitSearch = (e) => {
      this.props.handleSearch(e, this.state.query);
      this.setState({ query: '' });
   }

   render() {
      let user = this.props.user ? this.props.user.name : 'Chef';
      let admin = this.props.user ? this.props.user.admin ?
         <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Staff
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
               <Link className="dropdown-item" to='/'>View Staff</Link>
               <Link className="dropdown-item" to="/">Add/Promote</Link>
            </div>
         </li>
         : null : null;

      let navbar = this.props.user ? 
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Reciplete{this.props.restaurant ? ` - ${this.props.restaurant.name}` : null}</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                  {admin}
                  <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Recipes
                     </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                     <Link className="dropdown-item" to="/">View All</Link>
                     <Link className="dropdown-item" to="/form">Add a Recipe</Link>
                  </div>
                  </li>
                  <li className="nav-item active">
                     <Link className="nav-link" to='/' onClick={() => this.props.handleLogout()}>Log Out {this.props.user.name}</Link>
                  </li>
               </ul>
               <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmitSearch}>
                  <input 
                     className="form-control mr-sm-2" 
                     type="search" 
                     placeholder="Recipe Name" 
                     aria-label="Search" 
                     name="query" 
                     value={this.state.query} 
                     onChange={this.handleUpdateQuery}
                  />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search Recipes</button>
               </form>
            </div>
         </nav>
         :
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Reciplete</Link>
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
            <h2>Hello, {user}</h2>
         </div>
      );
   }
}
 
export default NavBar;