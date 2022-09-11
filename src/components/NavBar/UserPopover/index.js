import * as React from "react";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import { List, ListItem, ListItemText } from "@mui/material";
import { USER_POPOVER } from "../../../constants/messages";
import Auth from "@aws-amplify/auth";



function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function BasicPopover({ isOpen, handleClose, anchorEl, userName, roles }) {

  const classes = useStyles();
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      className={classes.popOver}
    >
      <Typography component={"div"}>
        <div className={classes.userInfoBlock}>
          <div className={classes.userBasicInfo}>
            <Avatar className={classes.userProfileImg} alt="Profile img" />
            <div className={classes.userName}>
              <h4>{userName}</h4>
            </div>
          </div>

          {roles && roles.map((role, index) => (
            <span key={role} className={classes.roles}>
              {role} {roles.length !== index + 1 && " / "}
            </span>
          ))}
        </div>
        <div className={classes.btnListBlock}>
          <Navigation />
        </div>

        <div className={classes.versionBlock}>
          <AppFooter />
        </div>
      </Typography>
    </Popover>
  );
}

export default React.memo(BasicPopover);


const Navigation = React.memo(() => {
  const handleSignOut = React.useCallback(() => {
    Auth.signOut();
  }, []);

  const handleOpenGuide = React.useCallback(() => {
    window.open(process.env.REACT_APP_HELP_GUIDE, "_blank");
  }, []);

  return (<div>
    <List component="nav" >
      {/* <ListItemLink>
        <ListItemText primary={USER_POPOVER.GUIDE} onClick={handleOpenGuide} />
      </ListItemLink>
      <ListItemLink>
        <ListItemText primary={USER_POPOVER.SETTINGS} />
      </ListItemLink>
      <ListItemLink>
        <ListItemText primary={USER_POPOVER.APP_MAN} />
      </ListItemLink> */}
      <ListItemLink>
        <ListItemText primary={USER_POPOVER.LOGOUT} onClick={handleSignOut} />
      </ListItemLink>
    </List>
  </div>);
});

const AppFooter = React.memo(() => {
  return (
    <>
      <p>
        <span>{USER_POPOVER.APPLICATION_NAME} </span>
        <span>•.</span>   <span> {USER_POPOVER.ENVIRONMENT}  {process.env.REACT_APP_ENV} </span>
        <span>•.</span>   <span> {USER_POPOVER.VERSION} {process.env.REACT_APP_VERSION_NUMBER}</span>
      </p>
      <h4>{process.env.REACT_APP_RELEASE_YEAR}</h4>
    </>);

});
