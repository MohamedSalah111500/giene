import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AppLogo from "./AppLogo/AppLogo";
import classes from "./NavBar.module.scss";
import UserProfile from "./UserProfile";

const ResponsiveAppBar = ({ user }) => {
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <div className={classes.identityWrapper}>
          <AppLogo />
          <h2> Store Stock</h2>
          </div>
          <UserProfile user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default React.memo(ResponsiveAppBar);
