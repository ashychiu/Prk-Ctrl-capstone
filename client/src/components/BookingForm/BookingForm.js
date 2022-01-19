import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./BookingForm.scss";

const API_URL = process.env.REACT_APP_API_URL;

function BookingForm() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  //   const [status, setStatus] = useState(false);
  const history = useHistory;
  const addBooking = (e) => {
    e.preventDefault();
    console.log(e.target.requestDate.value);
    console.log(e.target.remarks.value);
    axios
      .post(`${API_URL}/bookings/add`, {
        requestDate: e.target.requestDate.value,
        carPlate: e.target.carPlate.value,
        unitNumber: e.target.unitNumber.value,
        // accessibilty: e.target.accessibilty.value,
        remarks: e.target.remarks.value,
      })

      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
    // emailjs
    //   .sendForm(
    //     "service_29uiqee",
    //     "test",
    //     e.target,
    //     "user_gFo8xcRNMy2j88a8nymdp"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    e.target.reset();
  };

  return (
    <section className="booking">
      <h1 className="hero">Prk Ctrl</h1>
      <form onSubmit={addBooking} className="booking-form">
        <label htmlFor="requestDate">Request Date</label>
        <input
          type="text"
          name="requestDate"
          placeholder="When is your visitor coming?"
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="carPlate">License Plate</label>
        <input
          type="text"
          name="carPlate"
          placeholder="Licese Plate"
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="unitNumber">Unit Number</label>
        <input
          type="number"
          name="unitNumber"
          placeholder="unit"
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <div className="booking-form__accessibility">
          <label htmlFor="accessiblity">Yes</label>
          <input
            type="radio"
            name="accessibility"
            value="Yes"
            className="booking-form__input"
            onChange={() => setError("")}
          />
          <label htmlFor="accessiblity">No</label>
          <input
            type="radio"
            name="accessibility"
            value="No"
            className="booking-form__input"
            onChange={() => setError("")}
          />
        </div>
        <label htmlFor="remarks">Remarks</label>
        <input
          type="text"
          name="remarks"
          placeholder="Remarks"
          className="booking-form__input"
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

export default BookingForm;
