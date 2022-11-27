import React from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';

const AuthMenu = (props: any) => {
  let sessionContext = Session.useSessionContext();
  const navigate = useNavigate();

  const logoutClicked = () => {
    console.log(sessionContext);
    signOut();
    // navigate("/auth");
  };
  const loginClicked = () => {
    navigate('/signin');
  };
  return (
    <div>
      Test AuthMenu <button onClick={logoutClicked}>Logout</button>
      <button onClick={loginClicked}>Login</button>;
    </div>
  );
};

export default AuthMenu;
