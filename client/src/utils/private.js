import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import { isLoggedIn } from "./loginStatus";

const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default Private;
