import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { AdminNavBarData } from "./AdminNavBarData";
import "./AdminNavBar.scss";
import { IconContext } from "react-icons";
import { logout } from "../../utils/loginStatus";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

function AdminNavbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <main>
      <IconContext.Provider value={{ color: "#fafafa" }}>
        <div className="navbar">
          <div className="navbar__container">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars />
              </Link>
            </li>
            {AdminNavBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <LogoutButton />
          </ul>
        </nav>
      </IconContext.Provider>
    </main>
  );
}

export default AdminNavbar;
