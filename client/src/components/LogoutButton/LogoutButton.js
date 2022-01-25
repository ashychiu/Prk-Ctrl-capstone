import React from "react";
import { logout } from "../../utils/loginStatus";
import "./LogoutButton.scss";
import * as IoIcons from "react-icons/io5";

const LogoutButton = () => {
  return (
    <div className="logout">
      <button onClick={logout} className="primary-btn logout-btn">
        <IoIcons.IoLogOutSharp value={{ color: "#fafafa" }} />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
