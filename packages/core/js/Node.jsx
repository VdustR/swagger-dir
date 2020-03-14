import { memo, useContext } from 'react';
import { css } from '@emotion/core';
import Dir from './Dir';
import Item from './Item';
import IndentContext from './IndentContext';

const nodeCss = css`
  &:hover {
    background: lightgrey;
  }
`;

const Node = ({ dir = '', node }) => {
  const indent = useContext(IndentContext);
  const indentCss = css`
    padding-left: ${16 * indent + 16}px;
  `;
  return typeof node === 'object' ? (
    <Dir css={[nodeCss, indentCss]} dir={dir} node={node} />
  ) : (
    <Item css={[nodeCss, indentCss]} dir={dir} file={node} />
  );
};
export default memo(Node);
