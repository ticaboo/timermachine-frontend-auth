import React from 'react';
import ReactDOM from 'react-dom/client';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom
} from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import AuthMenu from './AuthMenu';

import { SuperTokensConfig } from './config';
SuperTokens.init(SuperTokensConfig);

const authSigninEl = document.getElementById('auth-signin');
console.log('authSigninEl', authSigninEl);

if (authSigninEl) {
  const authSigninRoot = ReactDOM.createRoot(authSigninEl);
  authSigninRoot.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <Router>
          <Routes>
            {/* This shows the login UI on "/auth" route */}
            {getSuperTokensRoutesForReactRouterDom(require('react-router-dom'))}
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

const listTargets = document.getElementsByClassName('auth-menu');
for (var listTarget of Array.from(listTargets)) {
  const rootMenu = ReactDOM.createRoot(listTarget);
  rootMenu.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <Router>
          <Routes>
            <Route path="*" element={<AuthMenu />} />
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </React.StrictMode>
  );
}
