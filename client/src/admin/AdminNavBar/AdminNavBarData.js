import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { logout } from "../../utils/loginStatus";

export const AdminNavBarData = [
  {
    title: "Who Is Here",
    path: "/admin/whoishere",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Bookings",
    path: "/admin/bookings",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/",
    icon: <IoIcons.IoMdHelpCircle onClick={logout} />,
    cName: "nav-text",
  },
];
