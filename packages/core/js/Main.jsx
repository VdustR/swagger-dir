import { css } from "@emotion/core";
import { memo } from "react";
import { HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Theme from "./Theme";
import Tree from "./Tree";

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

const App = () => (
  <HashRouter>
    <Theme>
      <div css={outerCss}>
        <Nav />
        <div css={contentCss}>
          <Tree />
        </div>
      </div>
    </Theme>
  </HashRouter>
);

export default memo(App);
