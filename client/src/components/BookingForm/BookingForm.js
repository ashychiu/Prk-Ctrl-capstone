import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
// import { FaQuestionCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.scss";
import question from "../../assets/icons/question.png";

const API_URL = process.env.REACT_APP_API_URL;

function BookingForm(props) {
  console.log(props);
  const [requestDate, setRequestDate] = useState(new Date());
  const [error, setError] = useState("");

  //   const [status, setStatus] = useState(false);
  const history = useHistory();
  const addBooking = (e) => {
    e.preventDefault();
    const requestDate = e.target.requestDate.value;
    const carPlate = e.target.carPlate.value;
    const unitNumber = e.target.unitNumber.value;
    const accessibility = e.target.accessibility.value;
    console.log(e.target.accessibility.value);
    const remarks = e.target.remarks.value;
    if (!requestDate || !carPlate || !unitNumber)
      setError("Please fill out all required fields");
    else if (carPlate.length < 2 || carPlate.length > 8) {
      setError("Please provide a valid North American licence plate");
    } else {
      axios
        .post(`${API_URL}/bookings/add`, {
          requestDate,
          carPlate,
          unitNumber,
          accessibility,
          remarks,
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
    }
    e.target.reset();
    history.push("/dashboard/mybookings");
  };

  return (
    <section className="booking">
      <h1 className="hero">Create New Booking</h1>
      <form onSubmit={addBooking} className="booking-form">
        <label htmlFor="requestDate">
          Date of Visit <span className="tips">(Max one month in advance)</span>
        </label>
        {/* minDate= today, can't request a date in the past
        maxDate=  one month from now (in milliseconds) */}
        <DatePicker
          name="requestDate"
          selected={requestDate}
          minDate={new Date()}
          maxDate={Date.now() + 2629800000}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setRequestDate(date)}
          closeOnScroll={true}
        />
        <label htmlFor="carPlate">License Plate</label>
        <input
          type="text"
          name="carPlate"
          placeholder="licence plate"
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <label htmlFor="unitNumber">Unit Number</label>
        <input
          type="number"
          name="unitNumber"
          placeholder="unit number"
          defaultValue={props.unitNumber}
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <div className="form-field">
          <label htmlFor="accessibility" className="form-field__label">
            Accessible parking needed?
          </label>
          <div className="flex-2-col">
            <label htmlFor="Yes" className="radio-btn">
              <input
                type="radio"
                name="accessibility"
                value="Yes"
                onChange={() => setError("")}
              />
              Yes
            </label>
            <label htmlFor="No" className="radio-btn">
              <input
                type="radio"
                name="accessibility"
                value="No"
                checked
                onChange={() => setError("")}
              />
              No
            </label>
          </div>
        </div>
        <label htmlFor="unitNumber">Remarks</label>
        <input
          type="text"
          name="remarks"
          placeholder="remarks"
          className="booking-form__input"
          onChange={() => setError("")}
        />
        <button className="btn primary-btn" type="submit">
          Submit
        </button>
      </form>
      {error != "" ? <div>{error}</div> : ""}
    </section>
  );
}

export default BookingForm;
