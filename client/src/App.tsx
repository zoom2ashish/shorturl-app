import { makeStyles, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Header from './components/header/Header';
import UrlList from './components/url-list/UrlList';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  wrapperDiv: {
    display: 'flex',
    flex: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  mainContent: {
    margin: '60px'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapperDiv}>
      <Header></Header>
      <Container maxWidth="lg" className={classes.mainContent}>
        <UrlList></UrlList>
        <Copyright />
      </Container>
    </div>
  );
}
