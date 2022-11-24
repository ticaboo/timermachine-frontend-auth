import ThirdPartyEmailPassword, {
  Google,
  Github,
  Apple
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
  appInfo: {
    appName: 'From SuperTokens Demo App',
    apiDomain: 'https://app.timermachine.com',
    apiBasePath: '/.netlify/functions/auth',
    websiteDomain: 'https://front.timermachine.com',
    websiteBasePath: '/member'
  },
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    // ThirdPartyEmailPassword.init({
    //   signInAndUpFeature: {
    //     providers: [Github.init(), Google.init(), Apple.init(), ]
    //   }
    // }),
    EmailPassword.init(),
    Session.init()
  ]
};
