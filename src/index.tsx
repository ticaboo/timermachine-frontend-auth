import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AuthMenu from './Menu/AuthMenu';
import SignIn from './AuthSignIn';

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';

import { SuperTokensConfig } from './config';
import l from './logging';

l('info', 'SuperTokensConfig', SuperTokensConfig);
SuperTokens.init(SuperTokensConfig);

/*
    auth-signin id
    auth-menu  class

*/

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

if (document.getElementById('auth-signin')) {
  ReactDOM.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <SignIn />
      </SuperTokensWrapper>
    </React.StrictMode>,
    document.getElementById('auth-signin')
  );
} else {
  console.log('prod mount: No id: auth-signin');
}

const listTargets = document.getElementsByClassName('auth-menu');
for (var listTarget of Array.from(listTargets)) {
  ReactDOM.render(
    <React.StrictMode>
      <SuperTokensWrapper>
        <AuthMenu />
      </SuperTokensWrapper>
    </React.StrictMode>,
    listTarget
  );
}
