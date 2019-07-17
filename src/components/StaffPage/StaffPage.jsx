import React from 'react';
import restaurantService from '../../services/restaurantService';
import AddStaffForm from '../AddStaffForm/AddStaffForm';

class StaffPage extends React.PureComponent {

   handleUpdateAdmin = (e, userData) => {
      e.preventDefault();
      restaurantService.addOrUpdateUser(userData, this.props.restaurant._id);
      this.props.hydrateRestaurantData();
   };

   handleRemoveUser = (e, userId) => {
      e.preventDefault();
      const payload = { userId: userId };
      restaurantService.removeUser(payload, this.props.restaurant._id);
      this.props.hydrateRestaurantData();
   };

   render() { 
      return ( 
         <div className="container col-9">
            <AddStaffForm
               restaurant={this.props.restaurant}
               history={this.props.history}
            />
            <hr/>
            <h2 className="font-weight-bold bg-secondary rounded text-center">Staff</h2>
            {this.props.restaurant ? this.props.restaurant.users.map(user => 
               <div key={user.name} className="card">
                  <div className="card-body d-flex align-items-center">
                     <h5 className="col-6">{user.name} - {user.email}</h5>
                     <div className="col-6 d-inline-flex">
                        <form className="mr-1" onSubmit={(e) => this.handleUpdateAdmin(e, {email: user.email, admin: !user.admin})}>
                           <input 
                              className="mr-1"
                              type="checkbox"
                              required/>
                           <button type="submit" className="btn btn-success">{user.admin ? 'Remove Admin Priveleges' : 'Add Admin Priveleges'}</button>
                        </form>
                        <form onSubmit={(e) => this.handleRemoveUser(e, user._id)}>
                           <button type="submit" className="btn btn-danger">Remove User</button>
                           <input 
                              className="ml-2"
                              type="checkbox"
                              required/>
                        </form>
                     </div>
                  </div>
               </div>
            ) : null}
         </div>
       );
   }
}
 
export default StaffPage;