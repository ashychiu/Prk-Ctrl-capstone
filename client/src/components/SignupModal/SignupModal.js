import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import closeButton from "../../assets/icons/closeButton.svg";
import "./SignupModal.scss";

const API_URL = process.env.REACT_APP_API_URL;

const SignupModal = (props) => {
  const [error, setError] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const history = useHistory();

  if (!props.show) {
    return null;
  }

  function onRecaptchaChange(value) {
    setRecaptcha(true);
  }
  const signup = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const unitNumber = e.target.unitNumber.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const status = e.target.status.value;
    const password = e.target.password.value;

    if (
      !firstName ||
      !lastName ||
      !unitNumber ||
      !phone ||
      !email ||
      !status ||
      !password
    ) {
      setError("All fields are required");
    } else if (!recaptcha) setError("Please prove you're not a robot!");
    else {
      axios
        .post(`${API_URL}/users/signup`, {
          firstName,
          lastName,
          unitNumber,
          phone,
          email,
          status,
          password,
        })
        .then((response) => {
          window.location.href = "/";
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
    <div className="signup-modal">
      <div className="signup-modal-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>

        <div className="signup-modal-header">
          <h4 className="signup-modal__title">Sign Up</h4>
          <div className="signup-modal__content">
            <form onSubmit={signup} className="signup-modal__form">
              <div className="flex-2-col">
                <div className="form-field">
                  <label htmlFor="firstName" className="form-field__label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-field__input"
                    placeholder="first name"
                    onChange={() => setError("")}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lastName" className="form-field__label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-field__input"
                    placeholder="last name"
                    onChange={() => setError("")}
                  />
                </div>
              </div>
              <div className="flex-2-col">
                <div className="form-field">
                  <label htmlFor="email" className="form-field__label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-field__input"
                    placeholder="email"
                    onChange={() => setError("")}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lastName" className="form-field__label">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    className="form-field__input"
                    placeholder="phone"
                    onChange={() => setError("")}
                  />
                </div>
              </div>
              <div className="flex-2-col">
                <div className="form-field">
                  <label htmlFor="unitNumber" className="form-field__label">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    name="unitNumber"
                    className="form-field__input"
                    placeholder="unit number"
                    onChange={() => setError("")}
                  />
                </div>
                <div className="form-field form-status">
                  <label htmlFor="status" className="form-field__label">
                    Status
                  </label>
                  <div className="flex-2-col form-status-button">
                    <label htmlFor="owner" className="radio-btn">
                      <input
                        type="radio"
                        name="status"
                        value="Owner"
                        onChange={() => setError("")}
                      />
                      Owner
                    </label>
                    <label htmlFor="resident" className="radio-btn">
                      <input
                        type="radio"
                        name="status"
                        value="Resident"
                        onChange={() => setError("")}
                      />
                      Resident
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password" className="form-field__label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-field__input"
                  placeholder="password"
                  onChange={() => setError("")}
                />
              </div>
              <div className="flex-2-col recaptcha">
                <ReCAPTCHA
                  sitekey="6LfE8SMeAAAAALZ3eYN1fLVcX_YE0gBRDS31Dv9H"
                  onChange={onRecaptchaChange}
                  theme="dark"
                  className="recaptcha"
                />

                <p className="signup-modal__terms">
                  By clicking submit below, you argee to our{" "}
                  <span className="signup-modal__terms-link">
                    terms of service.
                  </span>
                </p>
              </div>
              <div className={error ? "show errorMessage" : "hide"}>
                {error}
              </div>
              <button className="btn primary-btn signup-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupModal;
