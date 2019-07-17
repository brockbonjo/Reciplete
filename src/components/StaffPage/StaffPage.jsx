import React from 'react';
import restaurantService from '../../services/restaurantService';
import AddStaffForm from '../AddStaffForm/AddStaffForm';

class StaffPage extends React.PureComponent {

   handleUpdateAdmin = (e, userData) => {
      e.preventDefault();
      restaurantService.addOrUpdateUser(userData, this.props.restaurant._id);
      this.props.hydrateRestaurantData();
   };

   render() { 
      return ( 
         <div className="container col-6">
            <AddStaffForm
               restaurant={this.props.restaurant}
               history={this.props.history}
            />
            <hr/>
            <h2 className="font-weight-bold bg-secondary rounded text-center">Staff</h2>
            {this.props.restaurant ? this.props.restaurant.users.map(user => 
               <div key={user.name} className="card">
                  <div className="card-body d-flex justify-content-center m-auto">
                     <h5 className="col-6">{user.name} - {user.email}</h5>
                     <form className="col-6" onSubmit={(e) => this.handleUpdateAdmin(e, {email: user.email, admin: !user.admin})}>
                        <input 
                           type="checkbox"
                           required/>
                        <button type="submit" className="btn btn-success">{user.admin ? 'Remove Admin Priveleges' : 'Add Admin Priveleges'}</button>
                     </form>
                  </div>
               </div>
            ) : null}
         </div>
       );
   }
}
 
export default StaffPage;