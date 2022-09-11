import * as React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import useStyles from "./styles";
import PopOver from "../UserPopover";

function UserProfile({ user }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleUserDialogClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserDialogClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className={classes.userProfileWrapper}>
   
      <div onClick={handleUserDialogClick} className={classes.userProfile}>
        <IconButton>
          <Avatar className={classes.userProfileImg} alt="Profile img" src={user ? user.userProfileImg : null} />
        </IconButton>
        <h5 className={classes.userProfileName}>{user ? user.fullname : ""}</h5>
      </div>
      <PopOver
        isOpen={open}
        handleClose={handleUserDialogClose}
        anchorEl={anchorEl}
        userName={user ? user.fullname : ""}
        roles={user ? user.roles : []}
      />
    </div>
  );
}

export default React.memo(UserProfile);
