import React, { memo } from "react";
import classes from "./WellsStatus.module.scss";


//single well component 
const WellsStats = ({ unplaced, placed }) => {

  return <div className={classes.WellStatus}>
    <div>
      <p className={classes.Unplaced}><span></span> Unplaced ({unplaced})</p>
      <p className={classes.Placed}><span></span> Placed ({placed})</p>
    </div>

  </div>
}


export default memo(WellsStats);

