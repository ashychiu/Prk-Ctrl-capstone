import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/customBootstrap.scss";
import "./Login.scss";
import logo from "../../assets/logo/logo-horizontal-transparent.png";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) setError("ERROR");
    else {
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
    }
  };

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__card">
          <img src={logo} className="login__logo" alt="Prk Ctrl Logo" />
          <div className="login__form-container">
            <form onSubmit={login} className="login__form">
              <input
                type="text"
                name="email"
                placeholder="email address"
                className="login__input"
                onChange={() => setError("")}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="login__input"
                onChange={() => setError("")}
              />

              <button className="btn primary-btn" type="submit">
                Log In
              </button>
              <div className={error ? "show errorMessage" : "hide"}>
                {error}
              </div>
            </form>
            <p className="login__signup">New user? Sign up here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;