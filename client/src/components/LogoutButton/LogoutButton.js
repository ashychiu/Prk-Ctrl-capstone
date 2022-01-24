import React from "react";
import { logout } from "../../utils/loginStatus";
import "./LogoutButton.scss";

const LogoutButton = () => {
  return (
    <div className="logout">
      <button onClick={logout} className="primary-btn logout-btn">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
