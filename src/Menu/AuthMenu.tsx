//done in parent (init, wrap):
//import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
//SuperTokens.init(SuperTokensConfig);
//import { SuperTokensConfig } from './config';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import Session from 'supertokens-auth-react/recipe/session';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';

export default function AuthMenu(props: any) {
  let sessionContext = Session.useSessionContext();
  const navigate = useNavigate();

  // console.log('AuthMenu', sessionContext);
  async function logoutClicked() {
    console.log(sessionContext);
    await signOut();
    // navigate("/auth");
  }
  async function loginClicked() {
    navigate('/signin');
  }

  // console.log('sessionContext', sessionContext);

  if (sessionContext.loading) {
    return <span>Loading...</span>;
  }
  if (sessionContext.doesSessionExist) {
    return <button onClick={logoutClicked}>Logout</button>;
  } else {
    return <button onClick={loginClicked}>Login</button>;
  }
}
