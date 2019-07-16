import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import cleaver from '../../images/cleaver.ico';

class NavBar extends React.Component {

   handleSubmitSearch = (e) => {
      this.props.handleSearch(e, this.state.query);
      this.setState({ query: '' });
   };

   render() {
      let user = this.props.user ? this.props.user.name : 'Chef';
      let admin = this.props.user ? this.props.user.admin ?
         <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Staff
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
               <Link className="dropdown-item" to="/staffpage" onClick={this.props.handleReset}>View Staff</Link>
               <Link className="dropdown-item" to="/addstaff" onClick={this.props.handleReset}>Add/Promote</Link>
            </div>
         </li>
         : null : null;

      let navbar = this.props.user ? 
         <nav className="navbar navbar-expand-lg navbar-light" style={{background: "rgb(155, 155, 155, .6)", borderBottom: "3px solid black"}}>
            <Link className="navbar-brand" to="/" onClick={this.props.handleReset}>
                <img src={cleaver} className="nav-img" alt="cleaverIcon"/>
                Reciplete{this.props.restaurant ? ` - ${this.props.restaurant.name}` : null}
            </Link>
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
                     <Link className="dropdown-item" to="/" onClick={this.props.handleReset}>View All</Link>
                     <Link className="dropdown-item" to="/form" onClick={this.props.handleReset}>Add a Recipe</Link>
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
                     placeholder="Search Recipe Names" 
                     aria-label="Search" 
                     name="query" 
                     value={this.props.query} 
                     onChange={(e) => this.props.handleUpdateQuery(e)}
                  />
               </form>
            </div>
         </nav>
         :
         <nav className="navbar navbar-expand-lg navbar-light" style={{background: "rgb(155, 155, 155, .6)", borderBottom: "3px solid black"}}>
            <Link className="navbar-brand" to="/" onClick={this.props.handleReset}>Reciplete</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link" to='/login' onClick={this.props.handleReset}>Login</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to='/signup' onClick={this.props.handleReset}>Signup</Link>
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