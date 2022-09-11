import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Breadcrumbs, Container } from "@mui/material";
import CustomButton, { CLASS_TYPES } from "../common/Button/Button";
import { BUTTONS, CONFIRM_UNPLACE_EXPIRE_BUTTON, DIALOG_MSG, DROPDOWN, ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages";
import RowContainer from "../common/RowContainer/RowContainer";
import classes from "./DeviceName.module.scss";
import RockCell from "../renderCells/RockCell/RockCell";
import Wells from "../Wells/Wells";
import { connect } from "react-redux";
import { GenerateDropDownList } from "../../constants/helps";
import { getStrainLocation } from "../../api/strainApi";
import SelectInputChange from "../SelectInputChange/SelectInputChange";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";
import { EDIT_ROLES } from "../../config/securityConfig";
import SnackbarUI from "../common/SnackbarUI/SnackbarUI";
import { setExpire, setUnplaceMaterials } from "../../api/materialsApi";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";
import { callsHistory } from "../../dataStructure/stackHelps";


const DeviceName = forwardRef(({ wellsInfoFn, deviceConfigRedux, wellsRedux, wellChangedFu }, ref) => {
  const [racks, setRacks] = useState([]);
  const [defaultRack, setDefaultRack] = useState();
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedWells, setSelectedWells] = useState(null);

  const [boxes, setBoxes] = useState([]);
  const [defaultBox, setDefaultBox] = useState();
  const [selectedBox, setSelectedBox] = useState(null);

  const [wellsActiveLocation, setWellsActiveLocation] = useState([]);
  const [wellStatus, setWellStatus] = useState({});
  const [isActiveUnplaceBtn, setIsActiveUnplacedBtn] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, title: '', name: '', confirmLabel: null });



  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ status: 'success', message: '' });

  const rackInputRef = useRef();
  const boxInputRef = useRef();
  const wellsRef = useRef();

  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    updateWells: () => { getStrainLocationFun(deviceConfigRedux.id, selectedRack, selectedBox) }
  }));


  useEffect(() => {
    if (wellsRedux?.length) {
      setWellsActiveLocation(prev => [...prev, ...wellsRedux])
    }
  }, [wellsRedux])

  const getStrainLocationFun = async (deviceConfigId, rack, box) => {
    const locations = await getStrainLocation(deviceConfigId, rack, box);
    setWellsActiveLocation(locations);
    wellsRef.current.resetWells();
  }

  // call API when rack dropdown change value 
  const selectRack = async (_, rack) => {
    setSelectedRack(rack?.number)
    if (!deviceConfigRedux || !rack || selectedBox === null) return
    getStrainLocationFun(deviceConfigRedux.id, rack.number, selectedBox)
  };

  // call API when box dropdown change value 
  const selectBox = async (_, box) => {
    setSelectedBox(box?.number)
    if (!deviceConfigRedux || !box || selectedBox === null) return
    getStrainLocationFun(deviceConfigRedux.id, selectedRack, box.number)
  };



  const openAlertHandler = (status, message) => {
    setOpenAlert(true)
    setAlertInfo({ status: status, message: message });
  }


  const generateAllLists = async () => {
    // generate dynamic list for box & racks dropdowns depend on api response
    let rackList = await GenerateDropDownList(deviceConfigRedux.numOfRacks, 'Rack', {});
    let boxesList = await GenerateDropDownList(deviceConfigRedux.numOfBoxes, 'Box', {});

    // extract default value depend on api response and set it in local state
    let defaultRack = await rackList[+deviceConfigRedux?.defaultRack - 1];
    let defaultBox = await boxesList[+deviceConfigRedux?.defaultBox - 1];
    await setDefaultRack(defaultRack);
    await setDefaultBox(defaultBox);

    // set selected box & racks in local statue to use in in dropdown change 
    await setSelectedBox(defaultBox?.number);
    await setSelectedRack(defaultRack?.number);

    // call API to get well active location 
    await getStrainLocationFun(deviceConfigRedux.id, defaultRack.number, defaultBox.number)
    await setRacks(rackList);
    await setBoxes(boxesList)

  }



  // handel calling dialog to confirm functions 
  const handleConfirmDialog = (name) => {
    switch (name) {
      case "expired":
        handleExpiredMaterials()
        break;

      default:
        break;
    }
  }


  const selectedCellsHandler = (wells) => {
    let wellsInfo = {
      transFreezerFK: deviceConfigRedux?.id,
      numOfWells: deviceConfigRedux?.numOfWells,
      wells: wells,
      rack: selectedRack,
      box: selectedBox,
    }
    wellsInfoFn(wellsInfo)
    setSelectedWells(wellsInfo)
    if (wells && wells.length) {
      let notIncludeFlag = false;

      wells?.map(well => {
        if (!well?.classList.contains("activeWell")) {
          return notIncludeFlag = true;
        }
      });

      setIsActiveUnplacedBtn(!notIncludeFlag)
    } else {
      setIsActiveUnplacedBtn(false)
    }
  }



  const handleUnplacingMaterials = () => {
    let body = []
    selectedWells.wells.map(well => {
      let setMaterialsBody = {
        transFreezerFK: selectedWells.transFreezerFK,
        rack: selectedWells.rack,
        box: selectedWells.box,
        wellPos: +well?.innerText,
        agroGlycerol: +well.id
      }
      body.push(setMaterialsBody)
    })

    setUnplaceMaterials(body)
      .then((res) => {
        openAlertHandler('success', SUCCESS_MESSAGE.UNPLACED_MATERIAL);
        getStrainLocationFun(deviceConfigRedux.id, selectedRack, selectedBox);
        wellChangedFu(res);
        //this function use to fill history stack for undo/redo functionally 
        callsHistory.push({ reqMethod: "Unplaced", reqParam: body })

      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_UNPLACED_MATERIAL)
      })


  }

  const handleExpiredMaterials = () => {
    let materialsIds = selectedWells.wells.map(well => +well.id)
    setExpire(materialsIds)
      .then((res) => {
        openAlertHandler('success', SUCCESS_MESSAGE.EXPIRE_MATERIAL);
        getStrainLocationFun(deviceConfigRedux.id, selectedRack, selectedBox);
        wellChangedFu(res);

        //this function use to fill history stack for undo/redo functionally 
        callsHistory.push({ reqMethod: "Expired", reqParam: materialsIds });
      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_UPDATE_MATERIAL);
      })
      .finally(() => setDialogInfo(prev => ({ ...prev, isOpen: false })));
  }




  useEffect(() => {
    if (!deviceConfigRedux) return
    generateAllLists();
  }, [deviceConfigRedux])

  const wellStatusHandler = useCallback((status) => {
    setTimeout(() => setWellStatus(status), 0)
  }, [setWellStatus])

  const renderOption = (props, option) => {
    return <li {...props}><RockCell key={option.id} option={option} /></li>
  }

  // useEffect(()=>{setRacks(racks)})
  return <div className={classes.compWrapper}>
    <RowContainer >
      <Container maxWidth="100%">
        <Breadcrumbs >
          <p className={classes.DeviceName}>{deviceConfigRedux?.name ?? "Device name"}</p>

          <SelectInputChange className={classes.RackDropDown} optionsWidth="200px" ref={rackInputRef}
            disableClearable renderOption={renderOption} value={defaultRack}
            placeholder={DROPDOWN.SELECT_RACK}
            propsType="object" options={racks} onChange={selectRack} />

          <SelectInputChange className={classes.RackDropDown} optionsWidth="200px" ref={boxInputRef}
            placeholder={DROPDOWN.SELECT_BOX} disableClearable renderOption={renderOption} value={defaultBox}
            options={boxes} propsType="object" onChange={selectBox} />

        </Breadcrumbs>
      </Container>
    </RowContainer>
    <RowContainer >
      <Container maxWidth="100%" className={classes.AddressWrapper}>
        <p className={classes.BoxPosition}>{selectedBox ? ('Box ' + selectedBox) : DROPDOWN.SELECT_BOX}
          <span>{wellStatus?.unplaced + ' unplaced '}</span></p>
        <AuthorizationWrapper allowedRoles={EDIT_ROLES}>

          <div className={classes.ActionWrapper}>
            <CustomButton className={classes.BoxButtons}
              onClick={handleUnplacingMaterials}
              label={BUTTONS.UNPLACE}
              classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
              disabled={!isActiveUnplaceBtn}
            />

            <CustomButton
              onClick={() => setDialogInfo((prev) => ({ ...prev, isOpen: true, title: DIALOG_MSG.UNPLACE_AND_EXPIRE, name: 'expired', confirmLabel: CONFIRM_UNPLACE_EXPIRE_BUTTON }))}
              label={BUTTONS.EXPIRE}
              classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
              className={classes.BoxButtons}
              disabled={!isActiveUnplaceBtn}
            />

          </div>
        </AuthorizationWrapper>
      </Container>
    </RowContainer>
    <Container maxWidth="100%" >
      <Wells ref={wellsRef} selectedCellsFun={selectedCellsHandler} activeWells={wellsActiveLocation} wellStatusFun={wellStatusHandler} numOfWells={deviceConfigRedux?.numOfWells || 0} />
    </Container>
    <SnackbarUI open={openAlert} alertInfo={alertInfo}></SnackbarUI>
    <ConfirmationDialog
      {...dialogInfo}
      handleCancelDialog={() => setDialogInfo((prev) => ({ ...prev, isOpen: false }))}
      handleConfirmAction={(name) => handleConfirmDialog(name)}
    />
  </div>;
});

const mapStateToProps = state => {
  return {
    deviceConfigRedux: state.deviceConfig.deviceConfig,
    wellsRedux: state.materials.wells,
  };
};



export default connect(mapStateToProps, null, null, { forwardRef: true })(memo(DeviceName));
