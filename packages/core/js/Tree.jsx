import { memo } from 'react';
import { css } from '@emotion/core';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Dir from './Dir';

const treeCss = css`
  max-width: 800px;
  margin: auto;
  padding: 16px;
  box-sizing: content-box;
`;

const tree = {
  dir: '',
  children: [],
};

const getName = v => (typeof v === 'string' ? v : v.dir);

const sort = (a, b) => {
  const aName = getName(a);
  const bName = getName(b);
  return aName.localeCompare(bName);
};

files.forEach(file => {
  if (baseDir) file = file.substr(baseDir.length + 1);
  const route = file.split('/');
  let pointer = tree;
  route.forEach((dir, index) => {
    if (index === route.length - 1) {
      // is file
      pointer.children = [...pointer.children, dir].sort(sort);
      return;
    }
    let subTree = pointer.children.find(child => child.dir === dir);
    if (!subTree) {
      subTree = {
        dir,
        children: [],
      };
      pointer.children = [...pointer.children, subTree].sort(sort);
    }
    pointer = subTree;
  });
});

const Tree = () => (
  <div css={treeCss}>
    {files.length === 0 ? (
      <Typography>No file</Typography>
    ) : (
      <List component="nav">
        {/* files.map(file => (
          <Item key={file} file={file} />
        )) */}
        <Dir dir="" node={tree} root />
      </List>
    )}
  </div>
);

export default memo(Tree);
