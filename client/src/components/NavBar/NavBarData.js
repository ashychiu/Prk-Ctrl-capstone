import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export const NavBarData = [
  {
    title: "Book Now",
    path: "/booking",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Bookings",
    path: "/mybookings",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "My Profile",
    path: "/profile",
    icon: <CgProfile />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
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
