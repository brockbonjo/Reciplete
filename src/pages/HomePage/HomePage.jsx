import React from 'react';
import MainPane from '../../components/MainPane/MainPane';

const HomePage = (props) => {
   let user = props.user ? props.user.name : 'Chef';
   return ( 
      <>
         <h2>Hello, {user}</h2>
         <MainPane 
            history={props.history}
            restaurant={props.restaurant}
         />
      </>
    );
}
 
export default HomePage;