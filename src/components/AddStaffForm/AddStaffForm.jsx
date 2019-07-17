import React from 'react';
import restaurantService from '../../services/restaurantService';

class AddStaffForm extends React.PureComponent {
   state = { 
      email: '',
      admin: false
    }

   handleUpdateEmail = (e) => {
      this.setState({ email: e.target.value });
   };

   handleCancel = () => {
      this.setState({ email: '', admin: false });
   };

   handleAddStaffMember = async (e) => {
      e.preventDefault();
      try {
         await restaurantService.addOrUpdateUser(this.state, this.props.restaurant._id);
         alert(`Successfully added ${this.state.email} to staff!`);
       } catch (error) {
         alert(error.message);
       }
    }

   render() { 
      return ( 
         <div className="container">
            <h2 className="font-weight-bold bg-secondary rounded text-center">Add Staff Member:</h2>
            <form onSubmit={this.handleAddStaffMember}>
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="bg-light rounded p-1">Staff Email address</label>
                  <input 
                     type="email" 
                     className="form-control" 
                     id="exampleInputEmail1" 
                     aria-describedby="emailHelp" 
                     value={this.state.email} 
                     onChange={this.handleUpdateEmail}
                     placeholder="Enter staff email"></input>
               </div>
               <div className="form-group form-check bg-light rounded pl-4 col-3">
                  <input 
                     type="checkbox" 
                     className="form-check-input" 
                     id="exampleCheck1" 
                     checked={this.state.admin}
                     onChange={() => this.setState(prevState => ({admin: !prevState.admin}))}></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Make Admin?</label>
               </div>
               <button type="submit" className="btn btn-primary mr-1">Submit</button>
               <button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
            </form>
         </div>
      );
   }
}
 
export default AddStaffForm;

