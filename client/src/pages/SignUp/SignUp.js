import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = process.env.REACT_APP_API_URL;

function SignUp() {
  const [error, setError] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  //   const [status, setStatus] = useState(false);
  const history = useHistory();

  function onRecaptchaChange(value) {
    setRecaptcha(true);
    console.log("Captcha value:", value);
  }
  const signup = (e) => {
    e.preventDefault();
    if (!recaptcha) setError("Please prove you're not a robot!");
    else {
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
          // console.log(response);
          // console.log(user);
          // console.log(history);
          window.location.href = "/";
          // setStatus(true);
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
        <ReCAPTCHA
          sitekey="6LfE8SMeAAAAALZ3eYN1fLVcX_YE0gBRDS31Dv9H"
          onChange={onRecaptchaChange}
          theme="dark"
        />
        {error !== "" ? <div>{error}</div> : ""}
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default SignUp;
