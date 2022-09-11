import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from "react";
import classes from "./Wells.module.scss";
import Selecto from "react-selecto";
import { Tooltip } from "@mui/material";
import { findObjFromArrayByProp, handelDateFormatter } from "../../constants/helps";
import { EMPTY_STATE } from "../../constants/messages";
import WellsStatus from "./WellsStatus/WellsStatus";
import "./Wells.css"


//single well component 
export const Well = ({ well }) => {
  let title = <>
    <p className={classes.TooltipText}>
      {`Material : ${well.materialName}`} <br />
      {`Strain : ${well.materialStrainName}`} <br />
      {`Antibiotic Resistance : ${well.materialStrainResistance}`} <br />
      {`Hand-Off Date : ${handelDateFormatter(well.handoffDate)}`} <br />
    </p>
  </>
  return (
    well.locationId ? (<Tooltip title={title} placement="top" className={classes.Tooltip} >
      <div className={classes.Well + ' cube activeWell'} id={well.id}>{well.number}</div>
    </Tooltip >) : (
      <div className={classes.Well + ' cube'}>{well.number}</div>
    ))
}



//single well Row component 
export const WellRow = ({ row }) => {
  return <div className={classes.WellRow}>{row.map((well, index) => <Well well={well} key={row[index].number} number={well.number} />)}</div>
}


const createCells = (obj, number, activeWells) => {
  let rowLength = Math.sqrt(number);
  let newCellsList = [];
  let wellStatus = { placed: 0, unplaced: 0 }
  for (let i = 0; i < rowLength; i++) {
    newCellsList.push({ row: [], number: i })
    for (let y = 0; y < rowLength; y++) {
      let wellNum = (i * rowLength) + (y + 1);
      if (findObjFromArrayByProp(activeWells, 'well', wellNum)) {
        newCellsList[i].row.push({ ...obj, number: wellNum, ...findObjFromArrayByProp(activeWells, 'well', wellNum) });
        wellStatus.placed++
      } else {
        newCellsList[i].row.push({ ...obj, number: wellNum })
        wellStatus.unplaced++
      }

    }
  }

  return [newCellsList, wellStatus]
}





const Wells = forwardRef(({ selectedCellsFun, numOfWells, activeWells, wellStatusFun }, ref) => {

  const bodyRef = useRef(null);
  let [myWellRow, wellStatus] = createCells({ number: 0 }, numOfWells, activeWells);

  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    resetWells: resetSelectedWells,
  }));


  const resetSelectedWells = async () => {
    let allWells = await document.getElementsByClassName(classes.Well);
    [...allWells].map(el => {
      el.classList.remove("selected");
    })
    selectedCellsFun([])
  }

  useMemo(() => {
    wellStatusFun(wellStatus)
    resetSelectedWells()
  }, [wellStatus.unplaced])

  return (
    <>
      <Selecto
        dragContainer={".elements"}
        selectableTargets={[".selecto-area .cube"]}
        hitRate={100}
        selectByClick={true}
        selectFromInside={true}
        toggleContinueSelect={["shift"]}
        ratio={0}
        onSelect={e => {
          e.added.forEach(el => {
            el.classList.add("selected");
            selectedCellsFun(e.selected);
          });
          e.removed.forEach(el => {
            el.classList.remove("selected");
            selectedCellsFun(e.selected)
          });
        }}
      ></Selecto>
      <div className={classes.PageWrapper + ' elements selecto-area'} id="selecto1">
        {myWellRow.length ? (<div className={classes.WellRow} ref={bodyRef}>
          {myWellRow.map(({ row }, index) => <WellRow row={row} key={index} />)}
        </div>) : (<p className={classes.EmptyState}>{EMPTY_STATE.WELLS}</p>)}
      </div>
      <WellsStatus unplaced={wellStatus.unplaced} placed={wellStatus.placed} />
    </>
  )
});

export default memo(Wells);
