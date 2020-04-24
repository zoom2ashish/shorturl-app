import React from "react";
import classes from "./Auth.module.scss";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthContextConsumer, AuthContextValues } from "../../providers/AuthContext";

const CLIENT_ID = "788121941524-7qadls9jrv1ke6dv8jie704g9ipckuph.apps.googleusercontent.com";


export default class Auth extends React.Component<{}> {

  onSuccess(loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline, authContext: AuthContextValues) {
    const { tokenId, profileObj } = (loginResponse as GoogleLoginResponse);
    if (authContext.logIn) {
      authContext.logIn(tokenId, profileObj.name, profileObj.email);
    }
  }

  onError(reason: GoogleLoginResponse) {
    console.log(reason);
  }

  render() {
    return (
      <AuthContextConsumer>
        {(authContext) => (
          <div className={classes.Auth}>
            <h1>Signin Page</h1>
            <p>You are not signed in. Click here to sign in.</p>
            <GoogleLogin
              clientId={CLIENT_ID}
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
