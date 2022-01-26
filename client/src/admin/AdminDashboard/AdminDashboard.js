import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.scss";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
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

  const history = useHistory();
  const adminLogout = () => {
    localStorage.clear();
    history.push("/logout");
  };

  return (
    <BrowserRouter>
      <AdminNavbar />
      <h2 className="dashboard__greeting">Hello! Admin</h2>
      <Switch>
        <Route path="/admin/whoishere" exact component={WhoIsHere} />

        <Route path="/admin/bookings" component={AllBookings} />
        <Route path="/admin/users" component={AllUsers} />
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
