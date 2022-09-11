import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Spinner from "../../../assets/imgs/Spinner-1.gif";
import useStyles from "./styles";

export default function Loader({open=false}) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <div className={classes.loaderWrapper}>
        <img src={Spinner} alt="Spinner Img" className={classes.loaderImg} />
      </div>
    </Backdrop>
  );
}
