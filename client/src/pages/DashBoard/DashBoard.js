import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import "./DashBoard.scss";
import { FaAdn } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import SideBar from "../../components/SideBar/SideBar";

const DashBoard = (props) => {
  console.log(props);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/logout");
  };

  return (
    <div>
      <h1>Welcome, </h1>
      <button onClick={logout}>Logout</button>
      <div>some text</div>
      <SideBar />
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
