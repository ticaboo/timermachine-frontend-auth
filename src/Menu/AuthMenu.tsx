import Session from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/session';

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
    return <button onClick={logoutClicked}>LOGOUT</button>;
  } else {
    return <button onClick={loginClicked}>LOGIN/REGISTER</button>;
  }
};

export default AuthMenu;
