import Auth from "@aws-amplify/auth";

export default async function addAccessTokenToHeader(config) {
  const session = await Auth.currentSession();
  const idToken = session.getIdToken().getJwtToken();
  config.headers.Authorization = `Bearer ${idToken}`;
  config.headers.JWT_TYPE = "ID";
  return config;
}
