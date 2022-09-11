import { createTheme } from "@mui/material/styles";
import variables  from "./scss/abstracts/_colors.scss"

const theme = createTheme({
  palette: {
    primary: {
      main: variables.mainPrimary,
      light: "#86CEE2"
    },
    secondary: {
      main: "#71840A",
      light: "#B0C313",
      darkOrange: "#EE7100",
      lightOrange: "#F9B200",
      pink: "#FF7976",
      green: "#29BC4F",
      blue: "#2571B3"
    },
    grey: {
      darkGrey: "#203442 ",
      mediumGrey: "#536876",
      mediumGrey1: "#354052",
      lightGrey: "#EDF0F5",
      lightGrey1: "#D3DAE3",
      lightGrey2: "#BBC5D5",
      lightGrey3: "#E2E7EE",
      lightGrey4: "#919EA7",
      lightGrey5: "#D3DBE3",
      lightGrey6: "#eeeeee",
      lightGrey7: "#8D99AE",
      lightGrey8: "#bdbdbd"
    },
    white: "#fff",
    red: "#EA4648",
    semiGrey: "#00000029"
  },

  typography: {
    fontFamily: "'Noto Sans', sans-serif",
    fontFamilyRegular: "'Noto Sans', sans-serif",
    fontWeight: "Bold",
    fontFamilyLight: "Noto Sans Light"
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "capitalize" }
      }
    }
  }
});

const Theme = createTheme(theme);

export default Theme;
