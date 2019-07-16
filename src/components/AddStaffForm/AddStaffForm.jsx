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
         await restaurantService.addUser(this.state, this.props.restaurant._id);
         alert(`Successfully added ${this.state.email} to staff!`);
         // this.props.history.push('/staffpage');
       } catch (error) {
         alert(error.message);
       }
    }

   render() { 
      return ( 
         <div className="container">
            <h5>Add Staff Member</h5>
            <form onSubmit={this.handleAddStaffMember}>
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Staff Email address</label>
                  <input 
                     type="email" 
                     className="form-control" 
                     id="exampleInputEmail1" 
                     aria-describedby="emailHelp" 
                     value={this.state.email} 
                     onChange={this.handleUpdateEmail}
                     placeholder="Enter staff email"></input>
               </div>
               <div className="form-group form-check">
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

