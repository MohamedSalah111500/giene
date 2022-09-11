import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import RoutesList from "./routes/Routes";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import * as userActions from "./redux/actions/userActions";
import WithAuthenticator from './WithAuthenticator';
import WithOutAuthenticator from './WithOutAuthenticator';
import * as userApi from "./api/userApi"
import { connect } from "react-redux";






function App({ user, customState, setLoggedInUserInfo }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (customState && customState !== location.pathname) {
      navigate(customState);
    }
    setLoggedInUserInfo(user);

    userApi.login(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ThemeProvider theme={Theme}>
      <NavBar user={user} />
      <RoutesList loggedInUser={user} />
    </ThemeProvider>
  );
}

const mapDispatchToProps = {
  setLoggedInUserInfo: userActions.setLoggedInUserInfo
};


const app = process.env.REACT_APP_ENABLE_AUTHENTICATION === "true" ? WithAuthenticator(App) : WithOutAuthenticator(App);


export default connect(null, mapDispatchToProps)(app);
// export default app