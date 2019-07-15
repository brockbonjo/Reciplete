import React from 'react';

class AddStaffForm extends React.PureComponent {
   state = { 
      email: '',
      admin: false
    }

   handleUpdateEmail = (e) => {
      this.setState({ email: e.target.value });
   }

   render() { 
      return ( 
         <div className="container">
            <h5>Add Staff Member</h5>
            <form onSubmit={(e) => this.props.handleAddStaffMember(e, this.state)}>
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
                     onChange={() => this.setState(prevState => ({admin: !prevState.admin}))}></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Make Admin?</label>
               </div>
               <button type="submit" className="btn btn-primary">Submit</button>
            </form>
         </div>
      );
   }
}
 
export default AddStaffForm;

