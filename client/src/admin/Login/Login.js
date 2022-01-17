import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  //   const [status, setStatus] = useState(false);
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/admin`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response.data.firstName);

        setUser({ name: response.data.firstName, email: response.data.email });
        console.log(user);
        localStorage.setItem("token", response.data.token);
        console.log(history);
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
      <h1 className="hero">Prk Ctrl</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={() => setError("")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={() => setError("")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error != "" ? <div>{error}</div> : ""}
    </section>
  );
}

export default Login;
