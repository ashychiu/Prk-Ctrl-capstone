import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.scss";
import logo from "../../assets/logo/white-logo-transparent.svg";

const API_URL = process.env.REACT_APP_API_URL;

const AdminLogin = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "PRK CTRL - Visitor Parking Made Easy";
  }, []);
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
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };

  return (
    <section className="admin-login">
      <img src={logo} alt="Prk Ctrl logo" className="admin-logo__logo" />
      <h1 className="admin-login__heading">Admin Login</h1>
      <form onSubmit={login} className="admin-login__form">
        <input
          type="text"
          name="username"
          placeholder="username"
          className="admin-login__input"
          onChange={() => setError("")}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="admin-login__input"
          onChange={() => setError("")}
        />
        <div className={error ? "show errorMessage" : "hide"}>{error}</div>
        <br />
        <button className="btn primary-btn admin-btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
