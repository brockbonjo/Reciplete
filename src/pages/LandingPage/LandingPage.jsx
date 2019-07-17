import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (props) => {
   return ( 
      <div className="container col-10">
         <div className="jumbotron">
            <h1 className="display-4">Welcome to Recip..whatever!</h1>
            <p className="lead">This is a place for cooks to collaborate on recipe tweaks and have it all in one place.</p>
            <hr className="my-4" />
            <h5><span class="badge badge-info">Chefs - sign in with a new restaurant to start adding recipes. Edit, delete, and see past recipe versions.</span></h5>
            <h5><span class="badge badge-info">Cooks - sign up and have your manager add you to the team to begin contributing.</span></h5>
            <p className="lead mt-2">
            <Link className="btn btn-primary btn-lg mr-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary btn-lg" to="/signup" role="button">Signup</Link>
            </p>
         </div>
      </div>
    );
}
 
export default LandingPage;