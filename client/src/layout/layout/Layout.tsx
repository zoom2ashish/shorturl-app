import React, { PropsWithChildren } from "react";
import Header from "../header/Header";
import { Container } from "@material-ui/core";
import classes from "./Layout.module.scss";
import Copyright from "../copy-right/Copyright";
import {
  AuthContextConsumer,
  AuthContextValues,
} from "../../providers/AuthContext";

const Layout = (props: PropsWithChildren<any>) => {
  return (
    <AuthContextConsumer>
      {(authContext: AuthContextValues) => (
        <div className={classes.Layout}>
          <Header></Header>
          <Container maxWidth="lg" className={classes.Container}>
            {props.children}
            <Copyright />
          </Container>
        </div>
      )}
    </AuthContextConsumer>
  );
};

export default Layout;
