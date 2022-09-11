import { makeStyles } from "@mui/styles";

const styles = makeStyles(theme => ({
  popOver: {
    "& .MuiPopover-paper": {
      width: "360px"
    }
  },
  roles: {
    margin: "0",
    fontSize: "16px",
    color: theme.palette.grey.mediumGrey,
    fontFamily: theme.typography.fontFamily,
    marginTop: "5px",
    fontWeight: "500"
  },

  userInfoBlock: {
    padding: "16px ",
    borderBottom: ` 1px solid ${theme.palette.semiGrey}`
  },
  userBasicInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    "& .MuiAvatar-root": {
      width: "70px",
      height: "70px",
      borderRadius: "50%"
    },
    "& h4": {
      margin: "0 10px 30px",
      fontSize: "16px",
      fontWeight: "900"
    },
    "& p": {
      margin: "0 10px "
    }
  },
  btnListBlock: {
    borderBottom: ` 1px solid ${theme.palette.semiGrey}`,
    color: theme.palette.grey.darkGrey,

    "& .MuiListItem-root": {
      padding: "0 16px !important"
    }
  },
  versionBlock: {
    color: theme.palette.grey.mediumGrey,
    padding: "16px",
    "& h4": {
      margin: "0 ",
      fontSize: "16px",
      fontWeight: "normal"
    },
    "& p": {
      margin: "0 ",
      display: "flex",
      alignItems: "center",
      "& span": {
        marginInlineEnd: "15px",
        display: "block"
      }
    }
  }
}));
export default styles;
