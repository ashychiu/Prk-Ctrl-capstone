import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DashBoard.scss";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import MyBookings from "../MyBookings/MyBookings";
import BookingForm from "../BookingForm/BookingForm";
import Navbar from "../../components/NavBar/NavBar";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Profile from "../Profile/Profile";
import Support from "../Support/Support";

const API_URL = process.env.REACT_APP_API_URL;

const DashBoard = (props) => {
  const [userList, setUserList] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const token = localStorage.getItem("token");
  console.log(token);

  const fetchProfile = () => {
    axios
      .get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("dashboard axios: ", response.data);
        setUser(response.data.firstName);
        setUnitNumber(response.data.unitNumber);
        setUserId(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  const fetchAllUsers = () => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProfile();
    fetchAllUsers();
  }, []);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="dashboard">
      <Router>
        <Navbar />
        <h1 className="dashboard__greeting">Hello! {user}</h1>
        <Switch>
          <Route
            path="/booking"
            exact
            render={(routerProps) => (
              <BookingForm {...routerProps} unitNumber={unitNumber} />
            )}
          />
          <Route
            path="/mybookings"
            exact
            render={(routerProps) => (
              <MyBookings
                {...routerProps}
                userId={userId}
                unitNumber={unitNumber}
              />
            )}
          />

          <Route
            path="/profile"
            exact
            render={(routerProps) => (
              <Profile {...routerProps} userList={userList} userId={userId} />
            )}
          />
          <Route
            path="/support"
            exact
            render={(routerProps) => (
              <Support {...routerProps} userList={userList} userId={userId} />
            )}
          />
          <Route
            path="/logout"
            exact
            render={(routerProps) => (
              <LogoutButton {...routerProps} logout={true} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default DashBoard;
