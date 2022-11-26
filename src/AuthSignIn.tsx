import './App.css';

import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import Home from './Home';
//import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
//import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';

//import l from './logging';

/*
 was app - with routing (which may be useful in future)-eg signin - welcome page / home ...
 convert to dom targeting (/index) with init,wrapper
 nb: sessionAuth triggers signin dialog if not signed in.
*/

function AuthSignIn() {
  return (
    <div className="fill">
      <SessionAuth>
        <Home />
      </SessionAuth>
    </div>
  );
  // <div className="">
  //   <Router>
  //     <div className="fill">
  //       <Routes>
  //         {/* This shows the login UI on "/auth" route */}
  //         {getSuperTokensRoutesForReactRouterDom(require('react-router-dom'))}

  //         <Route
  //           path="/member"
  //           element={
  //             /* This protects the "/" route so that it shows
  //                               <Home /> only if the user is logged in.
  //                               Else it redirects the user to "/auth" */
  //             <SessionAuth>
  //               <Home />
  //             </SessionAuth>
  //           }
  //         />
  //       </Routes>
  //     </div>
  //   </Router>
  // </div>
  // );
}

export default AuthSignIn;
