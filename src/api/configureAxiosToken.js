import configureAllToken from "./configureAxiosToken.all";
import configureDevToken from "./configureAxiosToken.dev";

export const configureAxiosToken = config => {
  if (process.env.REACT_APP_ENABLE_AUTHENTICATION === "true") {
    return configureAllToken(config);
  } else {
    return configureDevToken(config);
  }
};
