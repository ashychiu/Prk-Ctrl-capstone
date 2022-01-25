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
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
