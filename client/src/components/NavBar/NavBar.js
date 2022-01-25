import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { NavBarData } from "./NavBarData";
import "./NavBar.scss";
import { IconContext } from "react-icons";
import LogoutButton from "../LogoutButton/LogoutButton";
import logo from "../../assets/logo/logo-horizontal-left.svg";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  console.log("showsidebar ", sidebar);
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
          <ul
            className="nav-menu-items"
            onClick={window.innerWidth < 767 ? { showSidebar } : null}
          >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <img
                  src={logo}
                  // onClick={showSidebar}
                  className="navbar__logo"
                />
              </Link>
            </li>
            {NavBarData.map((item, index) => {
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

export default Navbar;
