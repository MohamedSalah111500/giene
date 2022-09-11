import * as React from "react";
import logo from "../../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import classes from "./AppLogo.module.scss"


const AppLogo = () => {
  return (

    <Link to="/">
      <img src={logo} alt="App Logo Img" className={classes.imgLogo} />
    </Link>
   
  );
};

export default AppLogo ;
