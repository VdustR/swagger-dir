import { memo } from 'react';
import { css } from '@emotion/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import teal from '@material-ui/core/colors/teal';
import Nav from './Nav';
import Tree from './Tree';

const outerCss = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const contentCss = css`
  flex: 1;
  overflow: auto;
`;

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
  typography: {
    fontFamily: [
      'Victor Mono',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const App = () => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <div css={outerCss}>
        <Nav />
        <div css={contentCss}>
          <Tree />
        </div>
      </div>
    </ThemeProvider>
  </StylesProvider>
);

export default memo(App);
