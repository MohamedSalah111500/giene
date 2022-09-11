import React, { memo } from "react";
import { connect } from "react-redux";
import { EMPTY_STATE, LOADING } from "../../constants/messages";
import classes from "./MaterialList.module.scss";
import MaterialRow from "./MaterialRow/MaterialRow";

const MaterialList = ({ presentMaterials, isLoading, progressLoading }) => {
  return (
    <>
      <div className={classes.MaterialListWrapper} >
        {(isLoading || progressLoading) && <div className={classes.Loading}> {LOADING} </div>}
        {presentMaterials?.length ? (presentMaterials.map((material, index) => <MaterialRow material={material} key={material.id} index={index} />)) :
          <p className={classes.EmptyState}>{EMPTY_STATE.MATERIALS}</p>}

      </div>
    </>
  )
};

const mapStateToProps = state => {
  return {
    presentMaterials: state.materials.presentMaterials,
    isLoading: state.materials.isLoadingMaterials,
  };
};



export default connect(mapStateToProps, null)(memo(MaterialList));
