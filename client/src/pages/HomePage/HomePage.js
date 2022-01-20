import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import logo from "../../assets/logo/white-logo-transparent.svg";
import "./HomePage.scss";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import AdminLogin from "../../admin/AdminLogin/AdminLogin";
import { GrUserAdmin } from "react-icons/gr";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const inputRef = useRef(null);
  // const signupRef = useRef(null);
  // const adminRef = useRef(null);

  return (
    <>
      <section className="homepage">
        <div
          onClick={() => {
            setShowAdmin(true);
            setShowSignup(false);
            setShowLogin(false);
            inputRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="homepage__admin-button submitButton"
        >
          <GrUserAdmin value={{ className: "icon" }} />
        </div>
        <img className="homepage__logo" src={logo} alt="Prk Ctrl logo" />

        <div className="homepage__container">
          <div
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
              setShowAdmin(false);
              inputRef.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="homepage__button submitButton"
          >
            Login
          </div>
          <div
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
              setShowAdmin(false);
              inputRef.current.scrollIntoView({
                behavior: "smooth",
              });
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
        <div className={showAdmin ? "show" : "hide"}>
          <AdminLogin />
        </div>
      </section>
      <div ref={inputRef}></div>
    </>
  );
};

export default HomePage;
