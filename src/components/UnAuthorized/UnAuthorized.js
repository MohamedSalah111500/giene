import React from "react";
import useStyles from "./styles";
import Button,{CLASS_TYPES} from "../common/Button/Button";
import BlockIcon from "@mui/icons-material/Block";
import { ROLES } from "../../config/securityConfig";
import { useSelector } from "react-redux";
import {UNAUTHORIZED} from "../../constants/messages";

const UnAuthorized = () => {
  const classes = useStyles();
  const authUser = useSelector((state) => state.user);
  const handleContactSupport = () => {
    let body = `Please route this ticket to ${process.env.REACT_APP_ACCESS_REQUEST_QUEUE_NAME}.%0D%0A%0D%0AHello ${process.env.REACT_APP_ACCESS_REQUEST_APP_OWNER_NAME},%0D%0A%0D%0AKindly approve access to Genie Next Application in environment: ${process.env.REACT_APP_ENV}.%0D%0A%0D%0APlease reply to ${process.env.REACT_APP_ACCESS_REQUEST_SUPPORT_EMAIL} specifying the appropriate roles from (${Object.keys(ROLES).join(", ")}) to be assigned for `;
    window.location.href = `mailto:${process.env.REACT_APP_ACCESS_REQUEST_SERVICENOW_EMAIL};${process.env.REACT_APP_ACCESS_REQUEST_APP_OWNER_EMAIL}?cc=${process.env.REACT_APP_ACCESS_REQUEST_SUPPORT_EMAIL}&subject=${process.env.REACT_APP_ACCESS_REQUEST_MAIL_SUBJECT} - ${process.env.REACT_APP_ENV}&body=${body} ${authUser.fullname} (${authUser.email}).`;
  };


  return (
    <div className={classes.UnAuthorizedWrapper}>
      <div className={classes.UnAuthorizedBody}>      
        <BlockIcon className={classes.UnAuthorizedIcon} />
        <h2 className={classes.headerTitle}>{UNAUTHORIZED.TITLE}</h2>
        <p className={classes.headerText}>
         {UNAUTHORIZED.MESSAGE(authUser)}
        </p>
        <ul className={classes.list}>
          {Object.keys(ROLES).map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        <Button  label={UNAUTHORIZED.REQUEST_BTN_LBL} className={classes.contactSupport}
          color="secondary" classType={CLASS_TYPES.ACTION_LISTING_BTN}
          onClick={handleContactSupport} />
      </div>    
   </div>
  );
};

export default React.memo(UnAuthorized);
