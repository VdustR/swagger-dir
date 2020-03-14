import { join } from 'path';
import { memo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

const Nav = () => (
  <AppBar position="static">
    <Toolbar>
      {!baseDir ? null : (
        <IconButton
          edge="start"
          color="inherit"
          component="a"
          href={join(process.env.PUBLIC_URL, 'dir')}
        >
          <HomeIcon />
        </IconButton>
      )}
      <Typography variant="h6">{`/${baseDir}`}</Typography>
    </Toolbar>
  </AppBar>
);

export default memo(Nav);
