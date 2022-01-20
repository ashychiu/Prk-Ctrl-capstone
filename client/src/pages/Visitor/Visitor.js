import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "./Visitor.scss";

const API_URL = process.env.REACT_APP_API_URL;

function Visitor() {
  const [error, setError] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [carPlate, setCarPlate] = useState("");
  const [greeting, setGreeting] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("checkin-token");
  const licence = localStorage.getItem("licence");
  const history = useHistory();

  //If user have a "checkin-token", checkout form will be shown"
  useEffect(() => {
    if (token) {
      setCheckedIn(true);
      setGreeting("Ready to check out?");
      setCarPlate(localStorage.getItem("licence"));
    }
    if (!token && licence) {
      setCarPlate(localStorage.getItem("licence"));
      setGreeting("Welcome Back!");
    }
  }, []);

  const checkin = (e) => {
    e.preventDefault();
    console.log(e.target.carPlate.value);
    axios
      .patch(`${API_URL}/bookings/checkin`, {
        carPlate: e.target.carPlate.value,
      })
      .then((response) => {
        // const checkToken = uuid();
        localStorage.setItem("checkin-token", response.data);
        localStorage.setItem("licence", e.target.carPlate.value);
        setMessage(
          "Awesome! You are now checked in. Please remember to scan QR code again when check out."
        );
        setCarPlate(e.target.carPlate.value);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };

  const checkout = (e) => {
    e.preventDefault();
    console.log(e.target.carPlate.value);
    axios
      .patch(`${API_URL}/bookings/checkout`, {
        id: token,
        carPlate: e.target.carPlate.value,
      })
      .then((response) => {
        localStorage.removeItem("checkin-token");
        setMessage(
          "Goodbye! Please remember to wait for the gate to close when you leave."
        );
        const timeout = setTimeout(redirect, 10000);
        function redirect() {
          history.push("/");
        }
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
      <div className={checkedIn ? "hide" : "show"}>
        <h2>{greeting}</h2>
        <form onSubmit={checkin} className="login__form">
          <input
            type="text"
            name="carPlate"
            placeholder="Licence Plate"
            defaultValue={carPlate}
            className="login__input"
            onChange={() => setError("")}
          />
          {error != "" ? <div className="errorMessage">{error}</div> : null}
          <button className="submitButton login-btn" type="submit">
            Check In
          </button>
        </form>
        <span>{message}</span>
      </div>
      <div className={checkedIn ? "show" : "hide"}>
        <h2>{greeting}</h2>
        <form onSubmit={checkout} className="login__form">
          <input
            type="text"
            name="carPlate"
            placeholder="Please Input License Plate"
            defaultValue={carPlate}
            className="login__input"
            onChange={() => setError("")}
          />
          {error != "" ? <div className="errorMessage">{error}</div> : null}
          <button className="submitButton login-btn" type="submit">
            Check Out
          </button>
        </form>
        <span>{message}</span>
      </div>
    </section>
  );
}

export default Visitor;
