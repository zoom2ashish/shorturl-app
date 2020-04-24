import React from "react";
import classes from "./Auth.module.scss";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthContextConsumer, AuthContextValues } from "../../providers/AuthContext";
import AppLogo from '../../assets/images/app-logo.png';

export default class Auth extends React.Component<{}> {

  onSuccess(loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline, authContext: AuthContextValues) {
    const { tokenId, profileObj } = (loginResponse as GoogleLoginResponse);
    if (authContext.logIn) {
      authContext.logIn(tokenId, profileObj.name, profileObj.email);
    }
  }

  onError(reason: any) {
    console.log(reason);
  }

  render() {
    return (
      <AuthContextConsumer>
        {(authContext) => (
          <div className={classes.Auth}>
            <h1 className={classes.AppName}>
              <img alt="ShortURL App Logo" src={AppLogo}></img>
            </h1>
            <p>You are not signed in. Click here to sign in.</p>
            <GoogleLogin
              clientId={authContext.clientId}
              isSignedIn={true}
              onSuccess={(response) => {
                this.onSuccess(response, authContext);
              }}
              onFailure={this.onError.bind(this)}
            ></GoogleLogin>
          </div>
        )}
      </AuthContextConsumer>
    );
  }
}
