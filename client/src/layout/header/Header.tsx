import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { PropsWithChildren } from 'react';
import classes from './Header.module.scss';
import { AuthContextConsumer } from '../../providers/AuthContext';
import { GoogleLogout } from 'react-google-login';

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
            authContext.isSignedIn && authContext.name ?
              (
                <React.Fragment>
                  <Typography className={classes.UserName} variant="h6" color="inherit">
                    {authContext.name}
                  </Typography>
                  <GoogleLogout
                    clientId={authContext.clientId}
                    onLogoutSuccess={authContext.logOut}
                    render={renderProps => (
                    <IconButton edge="start" className={classes.LogoutButton} color="inherit" aria-label="menu" onClick={renderProps.onClick}>
                      <ExitToAppIcon></ExitToAppIcon>
                    </IconButton>
                    )}>
                  </GoogleLogout>
                </React.Fragment>
              ) : null
          }
        </Toolbar>
      </AppBar>
      )}
    </AuthContextConsumer>

  );
}
