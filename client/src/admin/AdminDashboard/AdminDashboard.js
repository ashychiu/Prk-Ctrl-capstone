import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
// import "./AdminDashBoard.scss";
// import { FaAdn } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import AdminNavbar from "../AdminNavBar/AdminNavBar";
import WhoIsHere from "../WhoIsHere/WhoIsHere";
import axios from "axios";
import AllUsers from "../AllUsers/AllUsers";
import HomePage from "../../pages/HomePage/HomePage";
import AllBookings from "../AllBookings/AllBookings";

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
        console.log(response.data);
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
      <Switch>
        <Route path="/admin/whoishere" exact component={WhoIsHere} />
        <Route path="/admin/users" component={AllUsers} />
        <Route path="/admin/bookings" component={AllBookings} />
      </Switch>
      <h1>Welcome! {user}</h1>
      {/* <button onClick={logout}>Logout</button> */}
      <div>some text</div>

      {/* <WhoIsHere /> */}
      <Footer />
    </BrowserRouter>
  );
};

export default AdminDashboard;
