import * as React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import classes from "./Button.module.scss"

export const CLASS_TYPES=
     {ACTION_LISTING_BTN:"actionListingBtn",
      ACTION_FORM_BTN:"actionFormBtn",
      ACTION_SECONDARY_FORM_BTN:"actionSecondaryFormBtn"}



const CustomButton = ({ classType ,className=null , label  , ...props }) => {
  const classesValue=`${classes.common} ${classType?classes[classType]:""} ${className?className:""}`;
 
  return (
   <Button variant="contained" className={`${classesValue}`} {...props}>
    {label}
  </Button>);
}

export default React.memo(CustomButton);

CustomButton.propTypes = {
  classType: PropTypes.string,             // Class Type one of defined custom type ex: listing ,form 
  className: PropTypes.string,             // Pass custom class from calling component
  label: PropTypes.string.isRequired       // Button Label
};

