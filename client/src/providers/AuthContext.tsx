import React, { Component, Children, PropsWithChildren } from "react";

export interface AuthState {
  isSignedIn: boolean;
  token: string;
  name: string;
  email: string;
}

export interface AuthContextValues extends AuthState {
  logIn?: (token: string, name: string, email: string) => void;
  logOut?:  () => void;
}

const INITIAL_STATE = { isSignedIn: false, token: '', name: '', email: '' };

export const AuthContext = React.createContext<AuthContextValues>(INITIAL_STATE);

export class AuthContextProvider extends Component {
  state: AuthState;

  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = INITIAL_STATE;
  }

  logIn(token: string, name: string, email: string) {
    const isSignedIn = !!token && !!email;
    this.setState({ isSignedIn, token, name, email });
  }

  logOut() {
    this.setState(INITIAL_STATE);
  }

  render() {
    const providerValues: AuthContextValues = {
      ...this.state,
      logOut: this.logOut.bind(this),
      logIn: this.logIn.bind(this)
    };

    return (
      <AuthContext.Provider value={providerValues}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
