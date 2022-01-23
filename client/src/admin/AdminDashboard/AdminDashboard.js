import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import "./AdminDashBoard.scss";
// import { FaAdn } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import WhoIsHere from "../WhoIsHere/WhoIsHere";
import axios from "axios";
import { logout } from "../../utils/loginStatus";
import AllUsers from "../AllUsers/AllUsers";

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
    <div>
      <h1>Welcome! {user}</h1>
      <button onClick={logout}>Logout</button>
      <div>some text</div>
      <AdminSideBar />
      <WhoIsHere />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
