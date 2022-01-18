import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./Login.scss";
const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  //   const [status, setStatus] = useState(false);
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    axios
      .post(`${API_URL}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response.data.firstName);

        setUser({ name: response.data.firstName, email: response.data.email });
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data.accessToken);
        history.push("/dashboard");
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
          type="email"
          name="email"
          placeholder="email"
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
        <Button className="submitButton login-btn" type="submit">
          Go
        </Button>
      </form>
    </section>
  );
}

export default Login;
