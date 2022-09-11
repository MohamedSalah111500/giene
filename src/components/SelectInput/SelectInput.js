import React, { forwardRef, useRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import classes from "./SelectInput.module.scss";

const SelectInput = forwardRef(({ options, optionsWidth = "100%", presentsProps = 'name', propsType = "name", value = null, defaultValue = null, label = null, disabled = false, placeholder, onChange, ...rest }, ref) => {
  const [inputValue, setInputValue] = useState('');


  const onChangeHandler = (_, e) => {
    onChange(_, e)
  }


  useEffect(() => {
    if (typeof defaultValue === "object") { onChange('setDefualt', defaultValue) }
  }, [defaultValue]);




  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    clearSelect: clearSelectInput,
    setValue:(value)=> {
      setTimeout(()=>setInputValue(value) ,1000)
      }
  }));


  const clearSelectInput = () => {
    setInputValue('')
    onChange(null, '')
  }

  return <div className={classes.basicClass}>
    {/* /////////// render Autocomplete with default value /////////// */}


    {options && defaultValue &&
      <Autocomplete
        disabled={disabled || !options.length}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => { setInputValue(newInputValue) }}
        onChange={(_, e) => onChangeHandler(_, e)}
        defaultValue={defaultValue ?? null}
        options={options.map(option => propsType === "name" ? option[presentsProps] : option)}
        renderInput={(params) => <TextField    {...params} placeholder={placeholder} label={label} />}
        PaperComponent={(props) => <Paper {...props} sx={{ width: optionsWidth }} />}
        getOptionLabel={(option) => propsType === "name" ? option : option[presentsProps]}
        {...rest}
      />}
    {/* /////////// render Autocomplete without default value /////////// */}
    {!defaultValue &&
      <Autocomplete
        disabled={disabled || !options.length}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => { if (_) setInputValue(newInputValue) }}
        onChange={(_, e) => onChangeHandler(_, e)}
        options={options.map(option => propsType === "name" ? option[presentsProps] : option)}
        renderInput={(params) => <TextField   {...params} placeholder={placeholder} label={label} />}
        PaperComponent={(props) => <Paper {...props} sx={{ width: optionsWidth }} />}
        getOptionLabel={(option) => propsType === "name" ? option : option[presentsProps]}
        {...rest}
      />}

  </div>;
});
export default React.memo(SelectInput);
