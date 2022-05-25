import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SignupModal from "../SignupModal/SignupModal";
import "./MobileLogin.scss";

const API_URL = process.env.REACT_APP_API_URL;

const MobileLogin = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const { username, password } = props;

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios
      .post(`${API_URL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        history.push("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };
  return (
    <section className="mobile-login">
      <div className="mobile-login__card">
        <h1 className="mobile-login__heading">Welcome!</h1>
        <form onSubmit={login} className="mobile-login__form">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="mobile-login__input"
            value={username ? username : ""}
            onChange={() => setError("")}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password ? password : ""}
            className="mobile-login__input"
            onChange={() => setError("")}
          />

          <button className="btn primary-btn" type="submit">
            Log In
          </button>
          <div className={error ? "show errorMessage light-theme" : "hide"}>
            {error}
          </div>
        </form>
        <p className="mobile-login__signup">
          New user?{" "}
          <span className="light-theme" onClick={() => setShowModal(true)}>
            Sign up here.
          </span>
        </p>
      </div>
      <SignupModal show={showModal} onCloseHandler={onCloseHandler} />
    </section>
  );
};

export default MobileLogin;
