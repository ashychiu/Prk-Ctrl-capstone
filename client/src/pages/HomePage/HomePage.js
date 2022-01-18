import React, { useState } from "react";
import logo from "../../assets/logo/white-logo-transparent.svg";
import "./HomePage.scss";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <section className="homepage">
      <img className="homepage__logo" src={logo} alt="Prk Ctrl logo" />
      <div className="homepage__container">
        <div
          onClick={() => {
            setShowLogin(true);
            setShowSignup(false);
          }}
          className="homepage__button submitButton"
        >
          Login
        </div>
        <div
          onClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          className="homepage__button submitButton"
        >
          Register
        </div>
      </div>
      <div className={showSignup ? "show" : "hide"}>
        <SignUp />
      </div>

      <div className={showLogin ? "show" : "hide"}>
        <Login />
      </div>
    </section>
  );
};

export default HomePage;
