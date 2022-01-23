import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import "./DashBoard.scss";
// import { FaAdn } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const DashBoard = (props) => {
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
      });
  }, []);

  console.log(props);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/logout");
  };

  return (
    <div>
      <h1>Welcome! {user}</h1>
      <button onClick={logout}>Logout</button>
      <div>some text</div>
      <SideBar user={user} unitNumber={unitNumber} />
      {/* <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<FaAdn />}>
            Dashboard
            <Link to="/" />
          </MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}
      <DatePicker />
      <Footer />
    </div>
  );
};

export default DashBoard;
