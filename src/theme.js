import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#bb7a5d",
      main: "#7e4b35",
      dark: "#362017",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffd580",
      main: "#cf9114",
      dark: "#805600",
      contrastText: "#000",
    },
    grey: {
      main: "#373b37",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
