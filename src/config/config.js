export const cognito = {
  //Authentication Configuration
  AUTH_CUSTOM_PROVIDER: process.env.REACT_APP_COGNITO_AUTH_CUSTOM_PROVIDER,
  REGION: process.env.REACT_APP_COGNITO_REGION,
  USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  USER_POOL_CLIENT_ID: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  DOMAIN: process.env.REACT_APP_COGNITO_DOMAIN,
  REDIRECT_SIGN_ID: process.env.REACT_APP_COGNITO_REDIRECT_SIGN_ID,
  REDIRECT_SIGN_OUT: process.env.REACT_APP_COGNITO_REDIRECT_SIGN_OUT
};
