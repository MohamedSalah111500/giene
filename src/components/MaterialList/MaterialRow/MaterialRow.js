import React, { memo } from "react";
import { connect } from "react-redux";
import classes from "./MaterialRow.module.scss";
import * as lookupsActions from "../../../redux/actions/materialsActions"
import { handelDateFormatter } from "../../../constants/helps";

const MaterialRow = ({ material,index, updateCurrentMaterialFn,setSelectedMaterialsFn }) => {
  let M = material

  const classesValue = `${classes.MaterialRowWrapper} ${M.selected ? classes.Selected : ""}`;

  return (
    <div className={classesValue} onClick={() => {
      updateCurrentMaterialFn({material,index})
      setSelectedMaterialsFn(material)
    }}>
      <div>
        
        <p className={classes.MaterialName}>{M.materialName} {M.expired && <span>Expired {M.expiredDate && `on ${handelDateFormatter(M.expiredDate)}`}</span>}</p>
        {M.locationId ? <p className={classes.MaterialLocation}><span>{M.transFreezerName}  / Rack {M.rack} / Box {M.box} / Well {M.well}</span></p> :
          <p className={classes.MaterialLocation}> Unplaced</p>
        }
      </div>
      <div className={classes.DateSide}>
        <p className={classes.MaterialCell}>{M.materialStrainName}</p>
        <p className={classes.MaterialDate}>{handelDateFormatter(M.handoffDate)}</p>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  updateCurrentMaterialFn: lookupsActions.updateCurrentMaterial,
  setSelectedMaterialsFn:lookupsActions.setSelectedMaterials

};

export default connect(null, mapDispatchToProps)(memo(MaterialRow));
