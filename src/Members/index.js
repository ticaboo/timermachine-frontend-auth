import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

const Members = () => {
  return (
    <Auth0Provider
      domain="dev-lulfxkqb.us.auth0.com"
      clientId="FhcjUJvBxb8hWusHgSmG7P3M8zoUr2T3"
      redirectUri={window.location.origin + '/members'}>
      <div className="baseWhite">
        Members Area
        <LoginButton />
      </div>
      ;
    </Auth0Provider>
  );
};

export default Members;
