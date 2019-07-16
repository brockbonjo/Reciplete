import React from 'react';
import restaurantService from '../../services/restaurantService';

class StaffPage extends React.PureComponent {
   state = { 
      user: null,
      admin: false
    };

   handleAddAdmin = () => {
      restaurantService.addAdmin(this.state.user);
   };

   render() { 
      return ( 
         <>
         </>
       );
   }
}
 
export default StaffPage;