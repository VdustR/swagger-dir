import { resolve } from 'url';
import { join } from 'path';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { css } from '@emotion/core';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import Copy from './Copy';
import Link from './Link';
import Node from './Node';
import IndentContext from './IndentContext';

const publicUrl = process.env.PUBLIC_URL;

const expandCss = css`
  transition: transform ease-in-out 0.3s;
`;

const openCss = css`
  transform: rotate(180deg);
`;

const Dir = ({ dir, node, root = false, ...props }) => {
  const [open, setOpen] = useState(true);
  const handleClick = useCallback(() => setOpen(open => !open), []);
  const indent = useContext(IndentContext);

  const href = useMemo(
    () =>
      resolve(
        window.location.href,
        join(publicUrl, 'dir', baseDir, dir, node.dir)
      ),
    [dir, node.dir]
  );
  return (
    <>
      {root ? null : (
        <ListItem {...props}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={node.dir} />
          <ListItemSecondaryAction>
            <Copy href={href} />
            <Link href={href} />
            <IconButton onClick={handleClick}>
              <ExpandMoreIcon css={[expandCss, open && openCss]} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
      <Collapse in={open || root} timeout="auto" unmountOnExit>
        <IndentContext.Provider value={root ? indent : indent + 1}>
          <List component="div" disablePadding>
            {node.children.map((child, index) => (
              <Node key={index} dir={join(dir, node.dir)} node={child} />
            ))}
          </List>
        </IndentContext.Provider>
      </Collapse>
    </>
  );
};

export default memo(Dir);
