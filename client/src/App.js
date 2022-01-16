import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/Login/Login";

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
      <Switch>
        <Route
          path="/dashboard"
          render={(Props) => {
            return <DashBoard {...Props} />;
          }}
        />
        <Route path="/login" component={Login} />;
      </Switch>
    </BrowserRouter>
  );
}

export default App;
