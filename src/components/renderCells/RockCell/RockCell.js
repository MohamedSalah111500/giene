import React from "react";

import classes from "./RockCell.module.scss"
const RockCell = ({ option, ...res }) => {

  return (
    <div className={classes.CellWrapper}  {...res}>
      <div>{option.name}</div>  
       {/* <span>{option.unplaced} unplaced</span> */}
    </div>
  )
};

export default RockCell;
