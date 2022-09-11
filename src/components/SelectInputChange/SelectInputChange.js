import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import classes from "./SelectInputChange.module.scss";

const SelectInputChange = forwardRef(({ options, value = null, optionsWidth = "100%", presentsProps = 'name', propsType = "name", label = null, disabled = false, placeholder, onChange, ...rest }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [localValue, setLocalValue] = useState(value);


  useEffect(() => setLocalValue(value), [value]);
  const onChangeHandler = (_, e) => {
    onChange(_, e)
    setLocalValue(e)
  }

  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    clearSelect: clearSelectInput,
  }));


  const clearSelectInput = () => {
    setInputValue('')
  }

  return <div className={classes.basicClass}>
    {options &&
      <Autocomplete
        disabled={disabled || !options.length}
        inputValue={inputValue}
        value={localValue ?? null}
        onInputChange={(_, newInputValue) => { setInputValue(newInputValue) }}
        onChange={(_, e) => onChangeHandler(_, e)}
        options={options.map(option => propsType === "name" ? option[presentsProps] : option)}
        renderInput={(params) => <TextField   {...params} placeholder={placeholder} label={label} />}
        PaperComponent={(props) => <Paper {...props} sx={{ width: optionsWidth }} />}
        getOptionLabel={(option) => propsType === "name" ? option : option[presentsProps]}
        {...rest}
      />}

  </div>;
});
export default React.memo(SelectInputChange);
