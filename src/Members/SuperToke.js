import React from 'react';

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Facebook,
  Apple
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: 'timermachine',
    apiDomain: 'https://app.timermachine.com',
    websiteDomain: 'https://timermachine.com',
    apiBasePath: '/auth',
    websiteBasePath: '/auth'
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Github.init(), Google.init(), Facebook.init(), Apple.init()]
      }
    }),
    Session.init()
  ]
});

/* Your App */
class SuperToke extends React.Component {
  render() {
    return <SuperTokensWrapper>{/*Your app components*/}</SuperTokensWrapper>;
  }
}

export default SuperToke;
