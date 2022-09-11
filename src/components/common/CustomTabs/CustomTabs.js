import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import classes from "./CustomTabs.module.scss";

const CustomTabs = forwardRef(({ tabList = [], selectHandler }, ref) => {
  const [value, setValue] = useState(tabList[0].key);

  //useEffect(() => { setValue(tabList[0].key) }, [tabList])
  const handleChange = (_e, newValue) => {
    setValue(newValue);
    selectHandler(newValue)
  };
  const setTabsHandler = (value) => {
    setValue(value)
    selectHandler(value)
  }


  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    setTabs: setTabsHandler
  }));
  return (
    <div className={classes.CustomTabsWrapper}>

      <Tabs value={value} onChange={handleChange} >
        {tabList.map((tab, i) => <Tab key={i} value={tab.key} label={`${tab.label} (${tab.count}) `} />)}
      </Tabs>
    </div>
  );
});
export default React.memo(CustomTabs);

CustomTabs.propTypes = {
  tabList: PropTypes.array.isRequired,    // list of tabs should be exist
  selectHandler: PropTypes.func,             // function call from this comp to return selected tab
};
