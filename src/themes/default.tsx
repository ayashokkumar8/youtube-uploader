import createMuiTheme, {
    ThemeOptions
  } from "@material-ui/core/styles/createMuiTheme";
  import merge from "lodash/merge";
  import { responsiveFontSizes } from "@material-ui/core/styles";
  import { Overrides } from "@material-ui/core/styles/overrides";
  import { PaletteOptions } from "@material-ui/core/styles/createPalette";
  import { borderColor } from "@material-ui/system";
  
  
  export const themeFonts = ["'Lato'", "sans-serif"] as const;
  
  export const defaultFonts = themeFonts.join(",");
  
  type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
  >
    ? ElementType
    : never;
  
  export type DefaultFontsType = ElementType<typeof themeFonts>;
  
  // crete object of overrides
  const overrides: Overrides = {
    MuiGrid: {
      container: {
        margin: "0 !important",
        width: "100% !important"
      }
    },
    MuiButton: {
      contained: {
        color: "white"
      },
      root: {
        textTransform: "none"
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "black",
        },
        "&$error": {
          color: "black",
        }
      }
    }
  };
  
  const palette: PaletteOptions = {
    common: {
      black: "#000000",
      white: "#FFFFFF"
    },
    background: {
      paper: "#FFFFFF",
      default: "#E5E6E6"
    },
    primary: {
      light: "#4f83cc",
      main: "#01579b",
      dark: "#002f6c",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#FFFFFF"
    },
    error: {
      light: "#e57373",
      main: "#CC0000",
      dark: "#CC0000",
      contrastText: "#fff"
    },
    text: {
      primary: "#000000",
      secondary: "#928F88",
      disabled: "#B5B7BA",
      hint: "#00000099"
    }
  };
  
  // get mui theme
  const muiTheme = createMuiTheme({
    palette: {
      ...palette
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 667,
        md: 812,
        lg: 1024,
        xl: 1920,
      }
    },
    typography: {
      fontFamily: defaultFonts,
      fontSize: 14,
      // fontWeightLight: 300, // Work Sans
      // fontWeightRegular: 400, // Work Sans
      // fontWeightMedium: 700 // Roboto Condensed
    },
    shape: {
      borderRadius: 4
    },
    props: {
      // MuiButtonBase: {
      //   // The properties to apply
      //   disableRipple: true // No more ripple, on the whole application 💣!
      // },
      MuiLink: {
        underline: "always",
        color: "textPrimary"
      },
      // MuiMenu: {
      //   transitionDuration: 0
      // }
    },
    // transitions: {
    //   // So we have `transition: none;` everywhere
    //   create: () => 'none',
    // },
    overrides: {
      ...overrides
    }
  });
  
  // add overrides to the app theme
  const theme = responsiveFontSizes(muiTheme);
  
  export default theme;
  