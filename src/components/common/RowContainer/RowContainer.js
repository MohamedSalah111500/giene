import React from "react";
import classes from "./RowContainer.module.scss"



const RowContainer = ({ children, className, ...res }) => {
  return (
    <div className={classes.RowWrapper + ' ' + className} {...res}>
      {children}
    </div>);
}

export default React.memo(RowContainer);

