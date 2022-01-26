import { React, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.scss";
import AdminNavbar from "../AdminNavBar/AdminNavBar";
import WhoIsHere from "../WhoIsHere/WhoIsHere";
import axios from "axios";
import AllUsers from "../AllUsers/AllUsers";
import AllBookings from "../AllBookings/AllBookings";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import AdminSupport from "../AdminSupport/AdminSupport";

const API_URL = process.env.REACT_APP_API_URL;

const AdminDashboard = () => {
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.firstName);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <AdminNavbar />
      <h2 className="dashboard__greeting">Hello! Admin</h2>
      <Switch>
        <Route path="/admin/whoishere" exact component={WhoIsHere} />
        <Route path="/admin/bookings" component={AllBookings} />
        <Route
          path="/admin/users"
          exact
          render={(routerProps) => (
            <AllUsers {...routerProps} userList={userList} />
          )}
        />
        <Route path="/admin/support" component={AdminSupport} />
        <Route
          path="/logout"
          exact
          render={(routerProps) => (
            <LogoutButton {...routerProps} logout={true} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminDashboard;
