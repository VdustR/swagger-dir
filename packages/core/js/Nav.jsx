import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import useBaseDir from "./useBaseDir";

const Nav = () => {
  const baseDir = useBaseDir();
  return (
    <AppBar position="static">
      <Toolbar>
        {!baseDir === "/" ? null : (
          <IconButton edge="start" color="inherit" component={NavLink} to="/">
            <HomeIcon />
          </IconButton>
        )}
        <Typography variant="h6">{baseDir}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Nav);
