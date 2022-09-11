import React, { useEffect, useState, memo } from "react";
import { Container } from "@mui/material";
import { BUTTONS, DROPDOWN } from "../../constants/messages";
import { connect } from "react-redux";
import * as lookupsActions from "../../redux/actions/materialsActions";
import * as strainActions from "../../redux/actions/strainActions";
import * as deviceConfigActions from "../../redux/actions/deviceConfigActions";



import CustomButton, { CLASS_TYPES } from "../common/Button/Button";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import SelectInput from "../SelectInput/SelectInput";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper"

import classes from "./TopBar.module.scss";
import MaterialCell from "../renderCells/MaterialCell/MaterialCell";
import { EDIT_ROLES } from "../../config/securityConfig";
import { getMaterialsTypesList } from "../../api/materialsApi";
import { getCropsList } from "../../api/cropsApi";
import { callsHistory } from "../../dataStructure/stackHelps";


const TopBar = ({ getMaterialsListRedux, getDeviceConfigRedux, getStrainListRedux }) => {
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedMaterialType, setSelectedMaterialType] = useState();
  const [crops, setCropsList] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState();
  const [callsHistoryIsEmpty, setCallsHistoryIsEmpty] = useState(true);
  const [callsHistoryCount, setCallsHistoryCount] = useState(0);


  let num = 15

  const redo = () => {
    callsHistory.redo();

   
  };
  const undo = () => {
    callsHistory.undo();

  };

 

  const renderOption = (props, option) => {
    return <li {...props}><MaterialCell key={option.id} option={option} /></li>
  }



  const selectCropHandler = (_, crop) => {
    setSelectedCrop(crop);
    if (crop && selectedMaterialType) { getMaterials(selectedMaterialType, crop.id) };

  }

  const selectMaterialHandler = (_, material) => {
    setSelectedMaterialType(material)
    if (selectedCrop && selectedMaterialType) { getMaterials(material, selectedCrop.id) };

  }

  // call API for get all materials depend on matiral & transgroup id
  const getMaterials = async (materialType, transGroupId) => {
    if (materialType && transGroupId) {
      await getMaterialsListRedux(materialType.id, transGroupId);
      await getDeviceConfigRedux(materialType.deviceType.id, transGroupId);
      await getStrainListRedux(materialType.id, transGroupId);

    } else {
      console.error(`materialTypeId is ${materialType} or transGroupId ${transGroupId}`)
    }
  }


  //call API to set default values to dropdown in top par component
  const getMaterialsTypes = async () => {
    const materialTypes = await getMaterialsTypesList();
    setMaterialTypes(materialTypes)
  }

  const getListCrops = async () => {
    const crops = await getCropsList();
    setCropsList(crops)
  }


  // initially call API for materials type & crop list here 
  useEffect(() => {
    getMaterialsTypes()
    getListCrops()
  }, [])

  return (
    <div className={classes.TopBarWrapper}>
      <Container maxWidth="100%">
        {/* <SearchBar placeholder="Search DNA Materials" /> */}
        <div className={classes.DropDownWrapper}>
          <SelectInput options={materialTypes} defaultValue={materialTypes[0]} renderOption={renderOption} propsType="object" placeholder={DROPDOWN.DNA_MATERIALS}
            onChange={selectMaterialHandler} disableClearable optionsWidth="130%" className={classes.DropDownStyle} />
          <SelectInput presentsProps="cropName" onChange={selectCropHandler} options={crops} propsType="object" placeholder={DROPDOWN.CROP_NAME} className={classes.DropDownStyle} />

        </div>
        <AuthorizationWrapper allowedRoles={EDIT_ROLES}>
          <div className={classes.ActionWrapper}>
            <CustomButton
              onClick={undo}
              label={BUTTONS.UNDO}
              classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
              startIcon={<UndoIcon />}
             // disabled={callsHistoryIsEmpty}

            />

            <CustomButton
              onClick={redo}
              label={BUTTONS.REDO}
              classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
              startIcon={<RedoIcon />}
            // disabled={callsHistoryCount >= callsHistory.maxSize}

            />
          
          </div>
        </AuthorizationWrapper>
      </Container>
    </div>
  );
};

const mapDispatchToProps = {
  getMaterialsListRedux: lookupsActions.getMaterials,
  getDeviceConfigRedux: deviceConfigActions.getDeviceConfig,
  getStrainListRedux: strainActions.getStrains,
};

export default connect(null, mapDispatchToProps)(memo(TopBar));
