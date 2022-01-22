import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./MobileLogin.scss";

const API_URL = process.env.REACT_APP_API_URL;

function MobileLogin() {
  const [buttonStatus, setButtonStatus] = useState("disabled");
  const [error, setError] = useState("");
  const history = useHistory();
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
            onChange={() => setError("")}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
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
          <Link to="/signup" className="light-theme">
            Sign up here.
          </Link>
        </p>
      </div>
    </section>
  );
}

export default MobileLogin;
