import React, { useState, memo, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import classesStyle from "./SearchBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../Button/Button";
import { BUTTONS } from "../../../constants/messages";


const SearchBar = forwardRef(({ classes, placeholder, onSearchFun, clearInput }, ref) => {
  const [inputValue, setInputValue] = useState('');


  const onChangeHandler = (e) => {
    let value = e.target.value;
    onSearchFun(value);
    setInputValue(value);

  }

  const clearInputHandler = () => {
    setInputValue('')
    onSearchFun('')
  }

  // get refrance for this component to call functions from outside
  useImperativeHandle(ref, () => ({
    clearInput: clearInputHandler
  }));

  return (
    <>
      <div className={classesStyle.boxWrapper}>

        <div className={classesStyle.inputBlock + " " + classes}>
          <SearchIcon className={classesStyle.searchICON} />
          <input
            type="text"
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={inputValue}
          />

          {inputValue && <Button label={BUTTONS.CLEAR}
            className={classesStyle.clearBtn}
            color="primary" disableElevation
            onClick={clearInputHandler} />}
        </div>
        {/* {error && <p className={classesStyle.errorMessage}>{error}</p>} */}
      </div>
    </>
  );
});

export default memo(SearchBar);

SearchBar.propTypes = {
  placeholder: PropTypes.string,  // placeholder of type string 
  onSearchFun: PropTypes.func
};
