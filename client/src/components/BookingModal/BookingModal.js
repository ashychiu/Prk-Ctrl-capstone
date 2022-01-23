import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import closeButton from "../../assets/icons/closeButton.svg";
import "./BookingModal.scss";

const API_URL = process.env.REACT_APP_API_URL;

const BookingModal = (props) => {
  console.log("booking props", props);
  const [error, setError] = useState("");
  const [requestDate, setRequestDate] = useState(new Date());
  const history = useHistory();

  if (!props.show) {
    return null;
  }

  const addBooking = (e) => {
    e.preventDefault();
    const requestDate = e.target.requestDate.value;
    const carPlate = e.target.carPlate.value;
    const unitNumber = e.target.unitNumber.value;
    const accessibility = e.target.accessibility.value;
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
          props.onCloseHandler();
          props.fetchMyBookings();
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
    <div className="signup-modal">
      <div className="signup-modal-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>

        <div className="signup-modal-header">
          <h4 className="signup-modal__title">
            {" "}
            {props.requestDate ? "Update" : "Rebook"}
          </h4>
          <div className="signup-modal__content">
            <form onSubmit={addBooking} className="booking-form">
              <label htmlFor="requestDate">
                Date of Visit{" "}
                <span className="tips">(Max one month in advance)</span>
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
                defaultValue={props.carPlate}
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
              <div className={error ? "show errorMessage" : "hide"}>
                {error}
              </div>
              <button className="btn primary-btn signup-btn" type="submit">
                {props.requestDate ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;
