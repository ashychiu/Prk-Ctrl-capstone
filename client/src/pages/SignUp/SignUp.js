import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;
function SignUp() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  //   const [status, setStatus] = useState(false);
  const history = useHistory;
  const signup = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/users/signup`, {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        unitNumber: e.target.unitNumber.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        status: e.target.status.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);

        // setUser({ name: response.data.firstName, email: response.data.email });
        console.log(user);
        // sessionStorage.setItem("token", response.data.token);

        console.log(history);
        history.push("/login");
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
    <section className="signup">
      <h1 className="hero">Prk Ctrl</h1>
      <form onSubmit={signup}>
        <label htmlFor="pronouns">Pronouns</label>
        <input
          type="text"
          name="pronoucn"
          placeholder="pronouns"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="firstname"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="firstName">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="lastname"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="firstName">Unit Number</label>
        <input
          type="number"
          name="unitNumber"
          placeholder="unit"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="firstName">phone</label>
        <input
          type="number"
          name="phone"
          placeholder="phone"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="firstName">email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="status">status</label>
        <input
          type="text"
          name="status"
          placeholder="status"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="signup-form__input"
          onChange={() => setError("")}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
      {error != "" ? <div>{error}</div> : ""}
    </section>
  );
}

export default SignUp;
