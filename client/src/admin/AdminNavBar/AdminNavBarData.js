import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";

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
  {
    title: "Logout",
    path: "/logout",
    icon: <IoIcons5.IoLogOutSharp />,
    cName: "nav-text",
  },
];
