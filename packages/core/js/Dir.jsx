import { css } from "@emotion/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import ForwardIcon from "@material-ui/icons/Forward";
import { join } from "path";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { resolve } from "url";
import Copy from "./Copy";
import IndentContext from "./IndentContext";
import Node from "./Node";

const expandCss = css`
  transition: transform ease-in-out 0.3s;
`;

const openCss = css`
  transform: rotate(180deg);
`;

const Dir = ({ dir, node, root = false, ...props }) => {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen((open) => !open), []);
  const indent = useContext(IndentContext);

  const href = useMemo(
    () => resolve(window.location.href, join("#/", dir, `${node.dir}/`)),
    [dir, node.dir]
  );

  const to = useMemo(() => join(dir, `${node.dir}/`), [dir, node.dir]);
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
            <IconButton component={NavLink} to={to}>
              <ForwardIcon />
            </IconButton>
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
