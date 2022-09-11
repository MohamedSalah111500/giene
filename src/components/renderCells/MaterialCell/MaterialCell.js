import React from "react";
import classes from "./MaterialCell.module.scss";

const MaterialCell = ({ option, ...res }) => {
  return (
    <div className={classes.CellWrapper}  {...res}>
      <div>{option.name}</div>  
       {/* <span>{option.unplaced} unplaced</span> */}
    </div>
  )
};

export default MaterialCell;
