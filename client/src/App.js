import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./styles/global.scss";
import DashBoard from "./pages/DashBoard/DashBoard";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./admin/AdminLogin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";
import Visitor from "./pages/Visitor/Visitor";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect path="/home" to="/" component={HomePage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignUp} />;
        <Route path="/visitor" component={Visitor} />
        <PrivateRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        />
        <Redirect path="/admin/bookings" to="/admin/dashboard" />
        <Redirect path="/admin/users" to="/admin/dashboard" />
        <Redirect path="/admin/whoishere" to="/admin/dashboard" />
        <Route path="/admin" component={AdminLogin} />;
        <Redirect path="/booking" to="/dashboard" />
        <Redirect path="/mybookings" to="/dashboard" />
        <Redirect path="/profile" to="/dashboard" />
        <Redirect path="/support" to="/dashboard" />
        <PrivateRoute path="/dashboard" exact component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
