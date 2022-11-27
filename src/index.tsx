import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
//import App from './App';

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
//import { useNavigate } from 'react-router-dom';
import Session, { signOut } from 'supertokens-auth-react/recipe/session';

import { SuperTokensConfig } from './config';

//import AuthMenu from './AuthMenu';

SuperTokens.init(SuperTokensConfig);

const authSigninEl = document.getElementById('auth-signin') as HTMLElement;

console.log('authSigninEl', authSigninEl);

if (authSigninEl) {
  const authSigninRoot = ReactDOM.createRoot(authSigninEl);
  authSigninRoot.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <Router>
          <Routes>
            <Route
              path="/signin"
              element={
                /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                <SessionAuth>
                  <Home />
                </SessionAuth>
              }
            />
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </React.StrictMode>
  );
}

const AuthMenu = () => {
  let sessionContext = Session.useSessionContext();
  //const navigate = useNavigate();

  const logoutClicked = () => {
    console.log(sessionContext);
    signOut();
    // navigate("/auth");
  };
  const loginClicked = () => {
    // navigate('/signin'); /* curious - changes the path, but does not reload! intended for react-router-dom  use. */
    window.open('/signin', '_self');
  };

  if (sessionContext.loading) {
    return null;
  }

  if (sessionContext.doesSessionExist) {
    return <button onClick={logoutClicked}>Logout</button>;
  } else {
    return <button onClick={loginClicked}>Login</button>;
  }
};

const listTargets = document.getElementsByClassName('auth-menu');
for (var listTarget of Array.from(listTargets)) {
  const rootMenu = ReactDOM.createRoot(listTarget as HTMLElement);
  rootMenu.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<AuthMenu />} />
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </React.StrictMode>
  );
}
