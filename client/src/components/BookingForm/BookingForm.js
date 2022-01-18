import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

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
  };

  return (
    <section className="booking-form">
      <h1 className="hero">Prk Ctrl</h1>
      <form onSubmit={addBooking}>
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
        <label htmlFor="accessiblity">Accessiblity</label>
        <input
          type="text"
          name="accessibility"
          placeholder="Accessiblity"
          className="booking-form__input"
          onChange={() => setError("")}
        />
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
