import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./AdminSupport.scss";

const AdminSupport = (props) => {
  //This is a dummy page, no submit functionality
  const [recaptcha, setRecaptcha] = useState(false);
  function onRecaptchaChange(value) {
    setRecaptcha(true);
  }

  return (
    <div className="admin-support">
      <div className="admin-support-content">
        <h1 className="admin-support__title">Contact Support</h1>
        <div className="admin-support__content">
          <form className="admin-support__form">
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
                />
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
                placeholder="type your message here"
              />
            </div>
            <div className="flex-2-col recaptcha">
              <ReCAPTCHA
                sitekey="6LfE8SMeAAAAALZ3eYN1fLVcX_YE0gBRDS31Dv9H"
                onChange={onRecaptchaChange}
                theme="light"
                className="recaptcha"
              />

              <p className="admin-support__terms">
                By clicking submit below, you argee to our{" "}
                <span className="admin-support__terms-link">
                  terms of service.
                </span>
              </p>
            </div>

            <button disabled className="btn primary-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminSupport;
