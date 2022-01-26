import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Visitor.scss";
import checkinImage from "../../assets/images/homepage-hero-crop.png";
import checkoutImage from "../../assets/images/homepage-hero-checkout.png";
import VisitorModal from "../../components/VisitorModal/VisitorModal";

const API_URL = process.env.REACT_APP_API_URL;

function Visitor() {
  const [error, setError] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [carPlate, setCarPlate] = useState("");
  const [greeting, setGreeting] = useState("Vehicle Check-in");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("checkin-token");
    const licence = localStorage.getItem("licence");

    //If user have a "checkin-token", checkout form will be shown"
    if (token) {
      setCheckedIn(true);
      setGreeting("Ready to check out?");
      setCarPlate(localStorage.getItem("licence"));
    }
    //If user don't have a "checkin-token" but a "licence", welcome back greeting will be shown"
    if (!token && licence) {
      setCarPlate(localStorage.getItem("licence"));
      setGreeting("Welcome Back!");
    }
  }, []);

  const checkin = (e) => {
    e.preventDefault();
    axios
      .patch(`${API_URL}/bookings/checkin`, {
        carPlate: e.target.carPlate.value,
      })
      .then((response) => {
        localStorage.setItem("checkin-token", response.data);
        localStorage.setItem("licence", e.target.carPlate.value);
        setCheckedIn(true);
        setShowModal(true);
        setCarPlate(e.target.carPlate.value);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };

  const checkout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("checkin-token");
    axios
      .patch(`${API_URL}/bookings/checkout`, {
        id: token,
        carPlate: e.target.carPlate.value,
      })
      .then((response) => {
        localStorage.removeItem("checkin-token");
        setShowModal(true);
        setCheckedIn(false);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = err.response.data;
          setError(errMessage);
        }
      });
  };

  const onCloseHandler = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <main className="visitor">
      <div className="visitor__container">
        <h1 className="homepage__heading">Visitor</h1>
        <img
          className="visitor__hero-image"
          src={checkedIn ? checkoutImage : checkinImage}
          alt="Prk Ctrl QR Code"
        />
        <div className={checkedIn ? "hide" : "show"}>
          <h2 className="visitor__greeting">{greeting}</h2>

          <form onSubmit={checkin} className="visitor__form">
            <input
              type="text"
              name="carPlate"
              placeholder="Licence Plate"
              defaultValue={carPlate}
              className="visitor__input"
              onClick={() => setError("")}
            />
            <div className={error ? "show errorMessage" : "hide"}>{error}</div>
            <button className="btn primary-btn login-btn" type="submit">
              Check In
            </button>
          </form>
        </div>

        <div className={checkedIn ? "show" : "hide"}>
          <h2>{greeting}</h2>
          <form onSubmit={checkout} className="visitor__form">
            <input
              type="text"
              name="carPlate"
              placeholder="Please Input License Plate"
              defaultValue={carPlate}
              className="visitor__input"
              onChange={() => setError("")}
            />
            <div className={error ? "show errorMessage" : "hide"}>{error}</div>
            <button className="btn primary-btn checkin-btn" type="submit">
              Check Out
            </button>
          </form>
        </div>
      </div>
      <VisitorModal
        show={showModal}
        checkedIn={checkedIn}
        onCloseHandler={onCloseHandler}
      />
    </main>
  );
}

export default Visitor;
