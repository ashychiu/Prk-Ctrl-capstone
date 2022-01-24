import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import ContactModal from "../../components/ContactModal/ContactModal";
import "./WhoIsHere.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [whoIsHere, setWhoIsHere] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carPlate, setCarPlate] = useState("");
  const [userID, setUserID] = useState("");
  const [userList, setUserList] = useState([]);
  const [showBookings, setShowBookings] = useState(5);

  //Get all the vistors who have checked in but not yet checked out
  const fetchCurrVisitors = () => {
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        const currentVisitors = response.data.filter(
          (booking) => booking.checkin !== "" && booking.checkout === ""
        );
        setWhoIsHere(currentVisitors);
      })
      .catch((err) => console.log(err));
  };

  const fetchUserList = () => {
    axios
      .get(`${API_URL}/users/`)
      .then((response) => {
        console.log(response);
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCurrVisitors();
    fetchUserList();
    return () => {
      setWhoIsHere([]); //unmount
      setUserList([]); //unmount
    };
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onCheckoutHandler = (e) => {
    // setShowModal(true);
    axios
      .patch(`${API_URL}/bookings/checkout`, {
        id: e.target.id,
        carPlate: e.target.name,
      })
      .then((response) => {
        console.log("manual check out completed!");
        fetchCurrVisitors();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  const onContactHandler = (e) => {
    setShowModal(true);
    setCarPlate(e.target.name);
    setUserID(e.target.id);
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <section className="users">
      <h1>Who is here</h1>
      <div className={whoIsHere.length > 0 ? "hide" : "show"}>
        No one is here
      </div>
      {whoIsHere.map((booking) => {
        return (
          <div key={booking.id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Licence Plate</h4>
                  <Link
                    to={`booking/${booking.id}`}
                    className="users__location"
                  >
                    <p>{booking.carPlate}</p>
                  </Link>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Booking Date</h4>
                  <p className="users__address-details">
                    {booking.requestDate}
                  </p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Checkin Time</h4>
                <p className="users__contact-name">
                  <Moment parse="YYYY-MM-DD HH:mm" local>
                    {booking.checkin}
                  </Moment>
                </p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">For how long?</h4>
                <p className="users__contact-email">
                  <Moment fromNow ago>
                    {booking.checkin}
                  </Moment>
                </p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              <button
                className="checkoutButton"
                name={booking.carPlate}
                id={booking.id}
                onClick={onCheckoutHandler}
              ></button>

              <button
                className="contactButton"
                name={booking.carPlate}
                id={booking.userID}
                onClick={onContactHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={whoIsHere.length > showBookings ? "show" : "hide"}
      >
        Load More
      </button>

      <ContactModal
        show={showModal}
        carPlate={carPlate}
        userID={userID}
        onCloseHandler={onCloseHandler}
        userList={userList}
      />
    </section>
  );
};

export default AllUsers;
