import { css, Global } from "@emotion/core";
import deepOrange from "@material-ui/core/colors/deepOrange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React, { memo } from "react";

const globalCss = css`
  *:focus {
    outline: none;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
  typography: {
    fontFamily: [
      "Victor Mono",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const Theme = ({ children }) => (
  <>
    <CssBaseline />
    <Global styles={globalCss} />
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  </>
);

export default memo(Theme);
