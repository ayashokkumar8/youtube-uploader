import {
    createStyles,
    makeStyles,
    Theme,
    useTheme,
    withStyles
  } from "@material-ui/core/styles";
  import { ReactNode } from "react";
  import React from "react";
  
  const styles = (theme: Theme) => ({
    "@global": {
      // MUI typography elements use REMs, so you can scale the global
      // font size by setting the font-size on the <html> element.
      html: {
        fontSize: 16,
        [theme.breakpoints.down("lg")]: {
          fontSize: 14    
        },
      }
    }
  });
  
  const GlobalStyle = ({ children, ...rest }: { children: ReactNode }) => (
    <div {...rest}>{children}</div>
  );
  export default withStyles(styles)(GlobalStyle);
  