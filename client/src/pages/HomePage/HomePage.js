import React, { useState, useRef } from "react";
import MediaQuery from "react-responsive";
import logo from "../../assets/logo/logo-horizontal-center.png";
import "./HomePage.scss";
import Login from "../../components/Login/Login";
import MobileLogin from "../../components/MobileLogin/MobileLogin";
import SignUp from "../SignUp/SignUp";
import AdminLogin from "../../admin/AdminLogin/AdminLogin";
import { GrUserAdmin } from "react-icons/gr";
import homepageHero from "../../assets/images/homepage-hero-crop.png";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const inputRef = useRef(null);

  return (
    <main className="homepage">
      <div className="homepage__container">
        <h1 className="homepage__heading">Welcome!</h1>
        <img className="homepage__logo" src={logo} alt="Prk Ctrl Logo" />
        <img
          className="homepage__image"
          src={homepageHero}
          alt="Prk Ctrl Homepage Image"
        />
      </div>
      <div className="homepage__login">
        <MediaQuery minWidth={768}>
          <Login />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <MobileLogin />
        </MediaQuery>
      </div>
    </main>
  );
};

export default HomePage;
