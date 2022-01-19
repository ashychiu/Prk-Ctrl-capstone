import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./AdminLogin.scss";
const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [error, setError] = useState("");
  //   const [status, setStatus] = useState(false);
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/admin`, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data.accessToken);
        history.push("/admin/dashboard");
        // setStatus(true);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };

  return (
    <section className="login">
      <form onSubmit={login} className="login__form">
        <input
          type="text"
          name="username"
          placeholder="username"
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
        {error != "" ? <div className="errorMessage">{error}</div> : null}
        <button className="submitButton login-btn" type="submit">
          Go
        </button>
      </form>
    </section>
  );
}

export default Login;
