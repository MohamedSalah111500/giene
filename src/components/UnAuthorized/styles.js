import { makeStyles } from "@mui/styles";

const styles = makeStyles(theme => ({
  UnAuthorizedWrapper: {
    background: "#EDF0F5",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent:" space-around",
    alignItems:"center",
  },
  UnAuthorizedBody: {
    alignItems: "center",
    width: "40%",
    background: "#fff",
    padding:"50px"
  },
  UnAuthorizedIcon: {
    fontSize: "95px !important",
    color: "#EB4B4A"
  },

  headerTitle: {
    fontSize: "18px",
    fontWeight: "bold"
  },
  headerText: {
    fontSize: "14px",
    color: "#536876"
  },
  list: {
    width: "fit-content",
    margin: "20px auto",
    fontSize: "14px",
    color: "#536876",
    textAlign:"start"
  },

  userProfileName: {
    color: "#354052",
    marginLeft: "12px",
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily
  },
  contactSupport:{
    width:"165px"
  }
}));
export default styles;
