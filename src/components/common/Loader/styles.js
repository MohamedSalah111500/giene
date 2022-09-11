import { makeStyles } from "@mui/styles";

const styles = makeStyles(theme => ({
  backdrop: {
    zIndex: 1,
    color: "#000",
    backgroundColor: "rgba(0,0,0,0) !important"
  },
  loaderWrapper: {
    textAlign: "center"
  },
  loaderImg: {
    width: "80px",
    height: "83px"
  }
}));
export default styles;
