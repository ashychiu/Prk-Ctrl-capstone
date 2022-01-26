import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Support.scss";

const API_URL = process.env.REACT_APP_API_URL;

const Support = (props) => {
  //This is a dummy page, no submit functionality

  const [error, setError] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const [user, setUser] = useState("");

  function onRecaptchaChange(value) {
    setRecaptcha(true);
  }

  const { userId, userList } = props;
  const fetchUser = () => {
    const foundUser = userList.find((user) => userId === user.id);
    setUser(foundUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="support">
      <div className="support-content">
        <h1 className="support__title">Contact Support</h1>
        <div className="support__content">
          <form className="support__form">
            <div className="flex-2-col">
              <div className="form-field">
                <label htmlFor="firstName" className="form-field__label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
                  defaultValue={user.email}
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
                  defaultValue={user.phone}
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
                  disabled
                  type="text"
                  name="unitNumber"
                  defaultValue={user.unitNumber}
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
                      checked={user.status === "Owner" ? "selected" : null}
                      onChange={() => setError("")}
                    />
                    Owner
                  </label>
                  <label htmlFor="resident" className="radio-btn">
                    <input
                      type="radio"
                      name="status"
                      checked={user.status === "Resident" ? "selected" : null}
                      value="Resident"
                      onChange={() => setError("")}
                    />
                    Resident
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-field__label">
                Message
              </label>
              <textarea
                row="10"
                type="text"
                name="message"
                className="form-field__input"
                placeholder="Message"
                onChange={() => setError("")}
              />
            </div>
            <div className="flex-2-col recaptcha">
              <ReCAPTCHA
                sitekey="6LfE8SMeAAAAALZ3eYN1fLVcX_YE0gBRDS31Dv9H"
                onChange={onRecaptchaChange}
                theme="light"
                className="recaptcha"
              />

              <p className="support__terms">
                By clicking submit below, you argee to our{" "}
                <span className="support__terms-link">terms of service.</span>
              </p>
            </div>
            <div className={error ? "show errorMessage" : "hide"}>{error}</div>
            <button disabled className="btn primary-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Support;
