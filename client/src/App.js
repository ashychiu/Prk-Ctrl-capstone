import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
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
      <h1>Prk Ctrl</h1>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={DashBoard} />; }} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />;
      </Switch>
    </BrowserRouter>
  );
}

export default App;
