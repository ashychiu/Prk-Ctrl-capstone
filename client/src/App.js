import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";
import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./admin/Login/Login";

import PrivateRoute from "./utils/private";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/users`);
      setUserList(data);
    })();
  }, []);

  return (
    <BrowserRouter>
      {/* <h1>Prk Ctrl</h1> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />;
        <Route path="/admin" component={AdminLogin} />;
      </Switch>
    </BrowserRouter>
  );
}

export default App;
