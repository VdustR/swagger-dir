import { css } from "@emotion/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { memo, useCallback, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import useBaseDir from "./useBaseDir";

const titleCss = css`
  flex: 1;
`;

const Nav = () => {
  const baseDir = useBaseDir();
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const menuOpenHandler = useCallback((e) => setInfoAnchorEl(e.target), []);
  const isMenuOpened = useMemo(() => Boolean(infoAnchorEl), [infoAnchorEl]);
  const closeMenu = useCallback(() => setInfoAnchorEl(null), []);
  return (
    <AppBar position="static">
      <Toolbar>
        {baseDir === "/" ? null : (
          <IconButton edge="start" color="inherit" component={NavLink} to="/">
            <HomeIcon />
          </IconButton>
        )}
        <Typography css={titleCss} variant="h6">
          {baseDir}
        </Typography>
        <IconButton color="inherit" onClick={menuOpenHandler}>
          <InfoIcon />
        </IconButton>
        <Menu
          anchorEl={infoAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpened}
          onClose={closeMenu}
        >
          <ListItem>
            <ListItemText primary="Swagger DIR" secondary={corePkg.version} />
          </ListItem>
          <MenuItem
            component="a"
            target="_blank"
            rel="noreferrer noopener"
            href={corePkg.homepage}
          >
            GitHub
          </MenuItem>
          <MenuItem
            component="a"
            target="_blank"
            rel="noreferrer noopener"
            href={corePkg.bugs.url}
          >
            Report Bugs
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Nav);
