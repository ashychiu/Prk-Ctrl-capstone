import React from "react";
import { logout } from "../../utils/loginStatus";
import "./LogoutButton.scss";
import * as IoIcons from "react-icons/io5";

const LogoutButton = (props) => {
  if (!props.logout) {
    return null;
  }
  localStorage.clear();
  window.location.href = "/";

  return <div className="logout"></div>;
};

export default LogoutButton;
