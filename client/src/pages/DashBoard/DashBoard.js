import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import "./DashBoard.scss";
// import { FaAdn } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const DashBoard = (props) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data.firstName);
        setUnitNumber(response.data.unitNumber);
        setUserId(response.data.id);
      });
  }, []);

  console.log("dashboard ", props);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <h1>Welcome! {user}</h1>
      <button onClick={logout}>Logout</button>
      <div>some text</div>
      <SideBar user={user} unitNumber={unitNumber} userId={userId} />
      <Footer />
    </div>
  );
};

export default DashBoard;
