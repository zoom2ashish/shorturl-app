import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon></MenuIcon>
        </IconButton>
        <Typography variant="h6" color="inherit">
          ShortURL
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
