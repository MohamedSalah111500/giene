
import React, { useCallback, useEffect, useRef, useState, memo, useMemo, forwardRef, useImperativeHandle } from "react";
import { Container } from "@mui/system";
import { DateRangePicker } from "react-date-range";
import { connect } from "react-redux";
import { BUTTONS, CONFIRM_EXPIRE_BUTTON, CONFIRM_UNEXPIRE_BUTTON, DIALOG_MSG, DROPDOWN, ERROR_MESSAGE, LABEL, SEARCH_BOX, SELECT_TABS, SUCCESS_MESSAGE } from "../../constants/messages";
import * as lookupsActions from "../../redux/actions/materialsActions"
import CustomTabs from "../common/CustomTabs/CustomTabs";
import RowContainer from "../common/RowContainer/RowContainer";
import SearchBar from "../common/SearchBar/SearchBar";
import MaterialList from "../MaterialList/MaterialList";
import CustomButton, { CLASS_TYPES } from "../common/Button/Button"
import SelectInput from "../SelectInput/SelectInput";
import classes from "./DNAMaterials.module.scss";
import { Grid, Popover } from "@mui/material";
import { sortMaterials, filterMaterials, getMaterialsCategoriesCount, filterByProps, filterByDateRange, sortListHorizontal, sortListVertical, filterMatchByProps, replaceObjInListByProps } from "../../constants/helps";
import AuthorizationWrapper from "../authorization/AuthorizationWrapper";
import { EDIT_ROLES } from "../../config/securityConfig";
import { placeMaterialsToWells, setUnplaceMaterials, setUnexpire, setExpire } from "../../api/materialsApi";
import SnackbarUI from "../common/SnackbarUI/SnackbarUI";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";
import { callsHistory } from "../../dataStructure/stackHelps";



const sortOptions = [
  { id: "1", name: "Construct Number (Highest)", key: "descending" },
  { id: "2", name: "Construct Number (Lowest)", key: "ascending" },
  { id: "3", name: "Hand-Off Date (Newest)", key: "nto" },
  { id: "3", name: "Hand-Off Date (Oldest)", key: "otn" }]
const initTabList = [
  { label: SELECT_TABS.ALL, key: "all", count: 0 },
  { label: SELECT_TABS.PLACED, key: "placed", count: 0 },
  { label: SELECT_TABS.UNPLACED, key: "unplaced", count: 0 },
  { label: SELECT_TABS.EXPIRED, key: "expired", count: 0 }]



const DNAMaterials = forwardRef(({
  wellsInfo,
  materialListRedux,
  filteredMateriaRedux,
  groupedMateriaRedux,
  presentMaterialsRedux,
  strainList = [],
  setGroupSelectedMaterialsFn,
  setSelectedMaterialsFn,
  setGroupingMaterialsFn,
  sortMaterialsFn,
  updateAllMaterialsFn,
  updateActiveWellsFn,
  updateCurrentMaterialFn,
  filterMaterialsFn,
  selectedMaterials,
  resetSelectedMaterialsFn,
  selectedType,
  selectedCropType,
  materialChangedFu
}, ref) => {




  const [selectedDate, handleDateChange] = useState(DROPDOWN.PERIOD);
  const [tabList, setTabList] = useState(initTabList);
  const [selectedTab, setSelectedTab] = useState(null);
  const [proLoading, setProLoading] = useState(false);
  const [selectedWillPositions, setSelectedWillPositions] = useState([]);
  const [disablePlaceButtons, setDisablePlaceButtons] = useState(false);
  const [selectAllMaterialFlag, setSelectAllMaterialFlag] = useState(false);
  const [filters, setFilters] = useState({ search: '', strain: '', date: '', sortKey: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState({
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'dateRange'
    }
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ status: 'success', message: '' });
  const [dialogInfo, setDialogInfo] = useState({ isOpen: false, title: '', name: '', confirmLabel: null });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;





  const getWellsPositions = (willList) => {
    if (!willList) return;
    let willPositions = []
    willPositions = willList.map(well => {
      return { number: well?.innerText, occupied: well?.classList.contains("activeWell") }
    });
    setSelectedWillPositions(willPositions)
  };


  const cellsLength = useMemo(() => { getWellsPositions(wellsInfo?.wells); return (wellsInfo?.wells?.length || 0) }, [wellsInfo?.wells]);
  const materialsLength = useMemo(() => (selectedMaterials.length || 0), [selectedMaterials]);
  const searchBarRef = useRef();
  const sortInputRef = useRef();
  const strainInputRef = useRef();
  const tabsRef = useRef();



  const updateAllMaterials = (updatedMaterials) => {
    updateMaterialAfterAPICallSuccessfully(updatedMaterials)
  }
  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    sendUpdateMaterial: updateAllMaterials,
  }));



  const openAlertHandler = (status, message) => {
    setOpenAlert(true)
    setAlertInfo({ status: status, message: message });
  }



  // this function response for making place buttons disabled or not  
  const updatePlaceButtons = () => {
    if (materialsLength > cellsLength || (cellsLength <= 0 || materialsLength <= 0)) {
      setDisablePlaceButtons(true)
    } else {
      setDisablePlaceButtons(false)
    }
  }




  // this useEffect used to check if selected materials equal wells  
  useEffect(() => {
    updatePlaceButtons()
  }, [materialsLength, cellsLength]);



  // reset all filters use component references
  const resetFilters = () => {
    searchBarRef?.current?.clearInput();
    sortInputRef?.current?.clearSelect();
    strainInputRef?.current?.clearSelect();
    setSelectedTab(null)
    tabsRef?.current?.setTabs("all");
    setFilters({ search: '', strain: '', date: '', sortKey: '' });
    handleDateChange(DROPDOWN.PERIOD)
  }
  useEffect(() => {
    resetFilters()
  }, [materialListRedux]);





  // sort materials list depend on key (props)
  const onSort = (selected) => {
    if (!presentMaterialsRedux || !selected?.key) return;
    setProLoading(true)
    setFilters((prev) => ({ ...prev, sortKey: selected?.key }))
    setTimeout(() => {
      sortMaterialsFn(sortMaterials(presentMaterialsRedux, selected?.key));
      return setProLoading(false)
    }, 0);

  }


  const handleClickDateRange = (event) => {
    if (!materialListRedux?.length) return
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDateRange = () => {
    setAnchorEl(false);
  };


  // filter materials list on date range comes from dateRange input
  const handleDateChangeFn = (list, date) => {
    setDateRange({ ...dateRange, ...date });
    if (!list || !date.dateRange) return;
    let editDate = { start: date.dateRange.startDate, end: date.dateRange.endDate };
    if (date.dateRange.startDate.getDay() === date.dateRange.endDate.getDay()) {
      editDate.start = new Date('Dec 1, 1990');
      editDate.end = date.dateRange.startDate
    } else {
      handleDateChange(date.dateRange.startDate.toLocaleDateString() + ' - ' + date.dateRange.endDate.toLocaleDateString());
      handleCloseDateRange();
    }
    return filterByDateRange(list, editDate.start, editDate.end);
  }



  // handel how materials Grouping by helpers fun pass to it list and prop name ,
  // return new array  
  const groupingByTabs = (selectedTab) => {
    if (!filteredMateriaRedux || !selectedTab) return;
    setProLoading(true);
    setSelectedTab(selectedTab)
    setTimeout(() => {
      let newList = filterMaterials(filteredMateriaRedux, selectedTab)
      if (filters.sortKey) newList = sortMaterials(newList, filters.sortKey)
      setGroupingMaterialsFn(newList);
      resetSelectedMaterialsFn();
      // sortInputRef.current.clearSelect();
      return setProLoading(false)
    }, 0);
  }

  // this useEffect used to initialize tabs vales first time || every materials list change 
  useEffect(() => {
    if (filteredMateriaRedux) setTabList(getMaterialsCategoriesCount(filteredMateriaRedux, initTabList));
  }, [filteredMateriaRedux]);








  const selectAllMaterials = () => {
    let newList = [...presentMaterialsRedux]
    newList = newList.map((material) => {
      return { ...material, selected: !selectAllMaterialFlag }
    })
    sortMaterialsFn(newList)
    selectAllMaterialFlag ? setGroupSelectedMaterialsFn([]) : setGroupSelectedMaterialsFn(newList)
    setSelectAllMaterialFlag(!selectAllMaterialFlag)
  }


  // handel functionally for unexpire materials 
  const unexpiredMaterialsHandler = () => {
    if (selectedMaterials.length !== 1) return openAlertHandler('error', "you shouldn't choose more than one material ");
    if (!selectedMaterials[0]?.expired) return openAlertHandler('error', "you should choose expired material ");
    setDialogInfo((prev) => ({ ...prev, isOpen: true, title: DIALOG_MSG.UNEXPIRE, name: 'unexpired', confirmLabel: CONFIRM_UNEXPIRE_BUTTON }))
  }

  // handel API call for unexpire materials 
  const handleConfirmToUnexpireMaterial = () => {
    setUnexpire(selectedMaterials[0]?.id)
      .then((res) => {
        updateAllMaterialsFn(replaceObjInListByProps(materialListRedux, [res], 'id'));
        openAlertHandler('success', SUCCESS_MESSAGE.UNEXPIRE_MATERIAL);
        //this function use to fill history stack for undo/redo functionally 
        callsHistory.push({ reqMethod: "Unexpired", reqParam: selectedMaterials[0]?.id });
      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_UPDATE_MATERIAL)
      })
      .finally(() => setDialogInfo(prev => ({ ...prev, isOpen: false })));

  }






  // handel functionally for expire materials conditions
  const expiredMaterialsHandler = () => {
    let includeFlag = false
    selectedMaterials.map(m => {
      if (m.expired) {
        openAlertHandler('error', "you should choose unexpired material ")
        return includeFlag = true
      }
    })

    if (!includeFlag) setDialogInfo((prev) => ({ ...prev, isOpen: true, title: DIALOG_MSG.EXPIRE, name: 'expired', confirmLabel: CONFIRM_EXPIRE_BUTTON }))
  }
  // handel API call for expire materials 
  const handleConfirmToExpireMaterial = () => {
    let materialsIds;
    materialsIds = selectedMaterials.map(m => m.id)

    setExpire(materialsIds)
      .then((res) => {
        updateAllMaterialsFn(replaceObjInListByProps(materialListRedux, res, 'id'))
        openAlertHandler('success', SUCCESS_MESSAGE.EXPIRE_MATERIAL);
      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_UPDATE_MATERIAL);
        setDialogInfo((prev) => ({ ...prev, isOpen: false }))
      })
      .finally(() => setDialogInfo(prev => ({ ...prev, isOpen: false })));

  }


  // this function use to update all material list with the response that come from unplace / expire material 
  // get updated material list as params to replace it with current shown materials  
  const updateMaterialAfterAPICallSuccessfully = (responseList) => {
    updateAllMaterialsFn(replaceObjInListByProps(materialListRedux, responseList, 'id'));
    responseList = responseList.map((m) => ({ ...m, selected: true }))
    let newList
    setTimeout(() => {
      newList = replaceObjInListByProps(materialListRedux, responseList, 'id');
      newList = filterMaterials(newList, "unplaced");
      tabsRef?.current?.setTabs("unplaced")
    }, 1000)

    setTimeout(() => {
      setGroupingMaterialsFn(newList)
      setGroupSelectedMaterialsFn(responseList)
    }, 2000)
    materialChangedFu()
  }

  const handleUnplacingMaterials = () => {
    let includeFlag = false
    selectedMaterials.map(m => {
      if (!m?.locationId) {
        openAlertHandler('error', "you shouldn't choose unplaced material ");
        return includeFlag = true
      };
    });

    if (includeFlag) return

    let body = []
    selectedMaterials.map(m => {
      let setMaterialsBody = {
        transFreezerFK: m.transFreezerFK,
        rack: m.rack,
        box: m.box,
        wellPos: m.well,
        agroGlycerol: m.id
      }
      body.push(setMaterialsBody)
    })


    setUnplaceMaterials(body)
      .then((res) => {
        updateMaterialAfterAPICallSuccessfully(res);
        openAlertHandler('success', SUCCESS_MESSAGE.UNPLACED_MATERIAL);

      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_UNPLACED_MATERIAL)
      })
      .finally(() => {
        // setOpenConfirmation(false)
      })

  }



  const handleConfirmDialog = (name) => {
    switch (name) {
      case "unexpired":
        handleConfirmToUnexpireMaterial()
        break;

      case "expired":
        handleConfirmToExpireMaterial()
        break;

      default:
        break;
    }
  }
  // handel search

  useEffect(() => {
    if (!materialListRedux) return;
    let newList = [...materialListRedux];
    if (filters.search) newList = filterByProps(newList, 'constructName', filters.search);
    if (filters.strain) newList = filterMatchByProps(newList, 'materialStrainName', filters.strain.name);
    if (filters.date) newList = handleDateChangeFn(newList, filters.date);
    if (filters.sortKey) newList = sortMaterials(newList, filters.sortKey)

    filterMaterialsFn(newList)
    if (selectedTab) newList = filterMaterials(newList, selectedTab);
    setGroupingMaterialsFn(newList)
    resetSelectedMaterialsFn()
    // sortInputRef.current.clearSelect();
  }
    , [filters])




  const placeMaterials = (crossType) => {
    let sortPositions;
    let validData = true

    crossType === 'across' ? (sortPositions = sortListVertical(selectedWillPositions)) : (sortPositions = sortListHorizontal(selectedWillPositions, wellsInfo.numOfWells))
    let selectedMaterialsList = selectedMaterials.map((m, i) => {
      if (m?.locationId || m?.expired || sortPositions[i]?.occupied) {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_PLACE_MATERIAL)
        return validData = false;
      }
      let setMaterialsBody = {
        transFreezerFK: wellsInfo.transFreezerFK,
        rack: wellsInfo.rack,
        box: wellsInfo.box,
        wellPos: +sortPositions[i].number,
        agroGlycerol: m.id
      }
      return setMaterialsBody
    })
    if (!validData) return;
    setDisablePlaceButtons(true);
    placeMaterialsToWells(selectedMaterialsList)
      .then((res) => {
        updateAllMaterialsFn(replaceObjInListByProps(materialListRedux, res, 'id'));
        updateActiveWellsFn(res);
        openAlertHandler('success', SUCCESS_MESSAGE.PLACE_MATERIAL);

        //this function use to fill history stack for undo/redo functionally 
        callsHistory.push({ reqMethod: "Place", reqParam: selectedMaterialsList });

      })
      .catch((error) => {
        openAlertHandler('error', ERROR_MESSAGE.CAN_NOT_PLACE_MATERIAL)

      })
      .finally(() => {
        setTimeout(() => setOpenAlert(false), 5000);
      })
    setDisablePlaceButtons(false);
  }


  return <div className={classes.compWrapper}>
    <RowContainer >
      <Container maxWidth="100%" className={classes.SearchWrapper}>
        <SearchBar ref={searchBarRef} placeholder={SEARCH_BOX.PLACEHOLDER + (selectedType?.name ?? '') + ' Material'} onSearchFun={(e) =>
          setFilters((prev) => ({ ...prev, search: e }))
        } />
        <CustomButton
          onClick={() => {
            if (materialListRedux) setTabList(getMaterialsCategoriesCount(materialListRedux, initTabList));
            setTimeout(() => updateAllMaterialsFn(materialListRedux), 1000)
            resetFilters()

          }}
          label={BUTTONS.CLEAR_FILTERS}
          disableElevation
        />
      </Container>
    </RowContainer>

    <RowContainer className={classes.ShowWrapper}>

      <Container maxWidth="100%" >
        <p>{LABEL.SHOW}</p>
        <CustomTabs tabList={tabList} selectHandler={groupingByTabs} ref={tabsRef} />
      </Container>

    </RowContainer>

    <RowContainer className={classes.ShowWrapper}>
      <Container maxWidth="100%" >

        <div className={classes.FilterSide}>
          <p>{LABEL.FILTER}</p>
          <SelectInput className={classes.StrainDropDown} ref={strainInputRef}
            disableClearable propsType="object" disabled={!materialListRedux?.length}
            options={strainList} placeholder={DROPDOWN.STRAIN} onChange={(_, strain) =>
              setFilters((prev) => ({ ...prev, strain: strain }))} />
          <CustomButton className={classes.PeriodDropDown} aria-describedby={id}
            variant="contained" onClick={handleClickDateRange} disableElevation
            label={selectedDate} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseDateRange}

            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <DateRangePicker
              onChange={(date) => setFilters((prev) => ({ ...prev, date: date }))}
              months={2}
              color='#ffeb3b'
              maxDate={new Date()}
              ranges={[dateRange.dateRange]}
              direction="horizontal"
              staticRanges={[]}
              inputRanges={[]}
            />;
          </Popover>


        </div>

        <div className={classes.SortSide}>
          <p>{LABEL.SORT}</p>
          <SelectInput className={classes.sortDropDown} optionsWidth="235px" ref={sortInputRef}
            disableClearable propsType="object" disabled={!presentMaterialsRedux?.length}
            options={sortOptions} placeholder={DROPDOWN.SORT_CRITERIA} onChange={(_, selected) => onSort(selected)} />


        </div>
      </Container>
    </RowContainer>

    <Container maxWidth="100%" >
      <AuthorizationWrapper allowedRoles={EDIT_ROLES}>
        <div className={classes.ButtonsWrapper}>
          <CustomButton
            onClick={() => selectAllMaterials()}
            label={selectAllMaterialFlag ? BUTTONS.UNSELECT_ALL : BUTTONS.SELECT_ALL}
            classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
          />
          <CustomButton
            onClick={handleUnplacingMaterials}
            label={BUTTONS.UNPLACE}
            classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
            disabled={!selectedMaterials.length}

          />
          <CustomButton
            onClick={expiredMaterialsHandler}
            label={BUTTONS.EXPIRE}
            classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
            disabled={!selectedMaterials.length}

          />
          <CustomButton
            onClick={unexpiredMaterialsHandler}
            label={BUTTONS.UNEXPIRE}
            classType={CLASS_TYPES.ACTION_SECONDARY_FORM_BTN}
            disabled={selectedMaterials.length !== 1}

          />
        </div>
      </AuthorizationWrapper>

      <Grid container>
        <Grid item xs={9}>
          <MaterialList progressLoading={proLoading} />
        </Grid>
        <Grid item xs={3}  >
          <AuthorizationWrapper allowedRoles={EDIT_ROLES}>
            <div className={classes.PlacesButtonsWrapper}>
              <CustomButton
                onClick={() => placeMaterials('across')}
                label={BUTTONS.PLACE_ACROSS}
                className={classes.PlacesButton}
                disableElevation
                disabled={disablePlaceButtons}
              />

              <CustomButton
                onClick={() => placeMaterials('down')}
                label={BUTTONS.PLACE_DOWN}
                className={classes.PlacesButton}
                disableElevation
                disabled={disablePlaceButtons}

              />
            </div>
          </AuthorizationWrapper>
          <p className={classes.Counter}><span>{materialsLength}</span>materials selected</p>
          <p className={classes.Counter}><span>{cellsLength}</span>well selected</p>
          {(disablePlaceButtons && materialsLength > 0) && <p className={classes.WarningMessage}>{ERROR_MESSAGE.MATERIALS_MORE_WELLS}</p>}


        </Grid>
      </Grid>

      <SnackbarUI open={openAlert} alertInfo={alertInfo}></SnackbarUI>
      <ConfirmationDialog
        {...dialogInfo}
        handleCancelDialog={() => setDialogInfo((prev) => ({ ...prev, isOpen: false }))}
        handleConfirmAction={(name) => handleConfirmDialog(name)}
      />
    </Container>


  </div>;
});
const mapStateToProps = state => {
  return {
    materialListRedux: state.materials.materials,
    filteredMateriaRedux: state.materials.filteredMaterials,
    groupedMateriaRedux: state.materials.groupedMaterials,
    presentMaterialsRedux: state.materials.presentMaterials,
    selectedMaterials: state.materials.selectedMaterials,
    strainList: state.strains.strains,
  };
};

const mapDispatchToProps = {
  filterMaterialsFn: lookupsActions.filterMaterials,
  updateAllMaterialsFn: lookupsActions.updateAllMaterials,
  updateActiveWellsFn: lookupsActions.updateActiveWells,
  sortMaterialsFn: lookupsActions.sortMaterials,
  resetSelectedMaterialsFn: lookupsActions.resetSelectedMaterials,
  updateCurrentMaterialFn: lookupsActions.updateCurrentMaterial,
  setGroupSelectedMaterialsFn: lookupsActions.setGroupSelectedMaterials,
  setSelectedMaterialsFn: lookupsActions.setSelectedMaterials,
  setGroupingMaterialsFn: lookupsActions.setGroupingMaterials,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(memo(DNAMaterials));
