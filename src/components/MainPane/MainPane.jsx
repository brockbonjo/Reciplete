import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';

const MainPane = (props) => {
   return ( 
      <>
         <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
               <a className="nav-link active" id="recipes-tab" data-toggle="tab" href="#recipes" role="tab" aria-controls="recipes" aria-selected="true">Recipes</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" id="staff-tab" data-toggle="tab" href="#staff" role="tab" aria-controls="staff" aria-selected="false">Staff</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" id="revisions-tab" data-toggle="tab" href="#revisions" role="tab" aria-controls="revisions" aria-selected="false">Revisions</a>
            </li>
         </ul>
         <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
               <RecipeForm 
                  restaurant={props.restaurant}
               />
            </div>
            <div className="tab-pane fade" id="staff" role="tabpanel" aria-labelledby="staff-tab">...</div>
            <div className="tab-pane fade" id="revisions" role="tabpanel" aria-labelledby="revisions-tab">...</div>
         </div>
      </>
    );
}
 
export default MainPane;