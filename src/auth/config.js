// import ThirdPartyEmailPassword, {
//   Google,
//   Github,
//   Apple
// } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
  appInfo: {
    appName: 'From SuperTokens Demo App',
    apiDomain: 'https://app.timermachine.com',
    apiBasePath: '/.netlify/functions/auth',
    websiteDomain: 'https://timermachine.com',
    websiteBasePath: '/signin'
  },
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    // ThirdPartyEmailPassword.init({
    //   signInAndUpFeature: {
    //     providers: [Github.init(), Google.init(), Apple.init(), ]
    //   }
    // }),

    //for menu want this to stay on whatever page, and not direct to
    EmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          return '/member';
        }
        return '/'; //default return
      },
      palette: {
        background: '#333',
        error: '#ad2e2e',
        textTitle: 'white',
        textLabel: 'white',
        textInput: '#a9a9a9',
        textPrimary: 'white',
        textLink: '#a9a9a9'
      }
    }),
    Session.init()
  ]
};
