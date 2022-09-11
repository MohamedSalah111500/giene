import React, { useState, memo, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import DeviceName from "../../components/DeviceName/DeviceName";
import DNAMaterials from "../../components/DNAMaterials/DNAMaterials";
import TopBar from "../../components/TopBar/TopBar";


const StoreStock = () => {
  const [wellsInfo, setWellsInfo] = useState(0);
  const dnaMaterialsCompRef = useRef();
  const deviceNameCompRef = useRef();

  // this function use component reference to trigger function inside components
  const triggerWellChangedFun = (updatedWells) => {
    dnaMaterialsCompRef.current.sendUpdateMaterial(updatedWells)
  }

  // this function use component reference to trigger function inside components
  const triggerMaterialChangedFun = (updatedWells) => {
    deviceNameCompRef.current.updateWells()
  }
  
  return <div> <Box sx={{ flexGrow: 1 }}>
    <TopBar />
    <Grid container >
      <Grid item xs={6}>
        <DNAMaterials wellsInfo={wellsInfo} ref={dnaMaterialsCompRef} materialChangedFu={triggerMaterialChangedFun} />
      </Grid>
      <Grid item xs={6}>
        <DeviceName wellsInfoFn={(wells) => setWellsInfo(wells)} wellChangedFu={triggerWellChangedFun} ref={deviceNameCompRef} />
      </Grid>
    </Grid>
  </Box>
  </div>;
};




export default memo(StoreStock);

