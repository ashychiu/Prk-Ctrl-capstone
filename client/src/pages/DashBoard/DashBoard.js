import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DashBoard.scss";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import MyBookings from "../MyBookings/MyBookings";
import BookingForm from "../../components/BookingForm/BookingForm";
import Navbar from "../../components/NavBar/NavBar";

const API_URL = process.env.REACT_APP_API_URL;

const DashBoard = (props) => {
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
        console.log(response.data);
        setUser(response.data.firstName);
        setUnitNumber(response.data.unitNumber);
        setUserId(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      setUser([]); //unmount
      setUnitNumber([]); //unmount
      setUserId([]); //unmount
    };
  }, []);

  console.log("dashboard ", props);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="dashboard">
      <Router>
        <Navbar />
        <h1>Welcome! {user}</h1>
        <div>some text</div>
        <Switch>
          <Route path="/booking" exact component={BookingForm} />
          <Route
            path="/mybookings"
            exact
            render={(routerProps) => (
              <MyBookings {...routerProps} userId={userId} />
            )}
          />
          {/* // <Route path="/mybookings" component={MyBookings} /> */}
          {/* /* <Route path="/profile" component={AllBookings} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default DashBoard;
