import React, { PropsWithChildren } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import UrlList from './containers/url-list/UrlList';
import Layout from './layout/layout/Layout';
import { AuthContextProvider, AuthContextValues, AuthContextConsumer } from './providers/AuthContext';

interface AppState {
  isSignedIn: boolean;
  token: string;
  name: string;
  email: string;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: PropsWithChildren<any>) {
    super(props);
    this.state = {
      isSignedIn: false,
      token: "",
      name: "",
      email: "",
    };
  }

  onSignedIn(token: string, profile: any) {
    this.setState({
      isSignedIn: !!token,
      token,
      name: profile.name,
      email: profile.email,
    });
  }

  getRoutes(isSignedIn: boolean) {
    if (!isSignedIn) {
      return (
        <Switch>
          <Route path="/auth">
            <Auth></Auth>
          </Route>
          <Redirect to="/auth"></Redirect>
        </Switch>
      );
    } else {
      return (
        <Layout>
          <Switch>
            <Route exact path="/home" component={UrlList}></Route>
            <Redirect to="/home"></Redirect>
          </Switch>
        </Layout>
      );
    }
  }

  render() {
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <AuthContextConsumer>
            {
              (authContext: AuthContextValues) => this.getRoutes(authContext.isSignedIn)
            }
          </AuthContextConsumer>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}
