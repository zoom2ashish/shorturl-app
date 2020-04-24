import { AppBar, IconButton, makeStyles, Toolbar, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { PropsWithChildren } from 'react';
import classes from './Header.module.scss';
import { AuthContextConsumer } from '../../providers/AuthContext';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function Header(props: PropsWithChildren<{}>) {
  const styles = useStyles();

  return (
    <AuthContextConsumer>
      {(authContext) => (
        <AppBar position="fixed" className={classes.Header}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.Title}>
            ShortURL
          </Typography>
          {
            authContext.name ? <Button>{authContext.name}</Button> : null
          }
          {
            authContext.isSignedIn ? <Button onClick={authContext.logOut}>Logout</Button> : null
          }
        </Toolbar>
      </AppBar>
      )}
    </AuthContextConsumer>

  );
}
