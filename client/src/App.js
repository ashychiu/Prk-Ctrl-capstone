import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";
import DashBoard from "./pages/DashBoard/DashBoard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./admin/AdminLogin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SeeYou from "./pages/SeeYou/SeeYou";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";

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
        <Route path="/sidebar" component={SideBar} />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />;
        <Route path="/logout" component={SeeYou} />;
        <Route path="/admin" component={AdminLogin} />;
        <PrivateRoute path="/dashboard" exact component={DashBoard} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
