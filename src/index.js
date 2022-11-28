import React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './AppDev';
import { BrowserRouter } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';
//import { hydrate, render } from 'react-dom';

/*
 for use in other applications: copy this indexDev  over index.js
 for building as widget to use in other appications:
 copy IndexProd.js over index.js and add
 "homepage": ".", to package.json as well.
*/

import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom
} from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './auth/Home';
import AuthMenu from './auth/AuthMenu';

import { SuperTokensConfig } from './auth/config';
SuperTokens.init(SuperTokensConfig);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

const authSigninEl = document.getElementById('auth-signin');
console.log('authSigninEl', authSigninEl);

if (authSigninEl) {
  const authSigninRoot = ReactDOMClient.createRoot(authSigninEl);
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
if (listTargets.length === 0) {
  console.log('no class="auth-menu"');
}
if (listTargets.length > 0) {
  for (var listTarget of Array.from(listTargets)) {
    const rootMenu = ReactDOMClient.createRoot(listTarget);
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
}
