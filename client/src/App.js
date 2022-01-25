import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";
import DashBoard from "./pages/DashBoard/DashBoard";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./admin/AdminLogin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import BookingForm from "./components/BookingForm/BookingForm";
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";
import AllUsers from "./admin/AllUsers/AllUsers";
import Visitor from "./pages/Visitor/Visitor";
import WhoIsHere from "./admin/WhoIsHere/WhoIsHere";
import MyBookings from "./pages/MyBookings/MyBookings";
import AdminNavbar from "./admin/AdminNavBar/AdminNavBar";

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
        <Redirect path="/home" to="/" component={HomePage} />
        <Route path="/sidebar" component={SideBar} />
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignUp} />;
        <Route path="/visitor" component={Visitor} />
        {/* <PrivateRoute path="/booking" component={BookingForm} />; */}
        <PrivateRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        />
        <Route path="/admin/users" component={AllUsers} />;
        <Route path="/admin/whoishere" component={WhoIsHere} />;
        <Route path="/admin" component={AdminLogin} />;
        <Redirect path="/booking" to="/dashboard" />
        <Redirect path="/mybookings" to="/dashboard" />
        <PrivateRoute path="/dashboard" exact component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
