import { makeStyles } from "@mui/styles";

const styles = makeStyles(theme => ({
  userProfileWrapper: {
    display: "flex",
    alignItems: "center",
    // marginLeft: "auto",
    position: "absolute",
    right: "0"
  },
  userProfileImg: {
    width: "38px",
    height: "38px",
    borderRadius: "50%"
  },
  userProfileName: {
    color: theme.palette.grey.mediumGrey1,
    marginLeft: "12px",
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily,
    cursor: "pointer"
  },
  cloudIcon: {
    width: "38px",
    height: "38px"
  },
  lineSeparator: {
    borderLeft: `2px solid ${theme.palette.grey.lightGrey3}`,
    margin: "0 20px",
    height: "50px",
    verticalAlign: "middle"
  },
  userProfile: {
    display: "flex"
  }
}));
export default styles;
