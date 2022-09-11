import {cognito } from "./config";

//Add the provider
 const cognitoConfig={
  Auth: {
    region: cognito.REGION,
    userPoolId: cognito.USER_POOL_ID,
    userPoolWebClientId: cognito.USER_POOL_CLIENT_ID,
    oauth: {
      //  configure this same to one of the values added as 'Callback URL(s)' in congnito user pool app client settings
      redirectSignIn: cognito.REDIRECT_SIGN_ID,
      // configure this same to one of the values added as 'Sign out URL(s)' in congnito user pool app client settings
      redirectSignOut: cognito.REDIRECT_SIGN_OUT,
      domain: cognito.DOMAIN,
      scope: ["email", "openid", "aws.cognito.signin.user.admin","profile"],
      responseType: "code", // or code (but it's not working)
    }
  }
};

export default cognitoConfig;
