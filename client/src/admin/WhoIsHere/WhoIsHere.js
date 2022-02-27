import { React, useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import ContactModal from "../../components/ContactModal/ContactModal";
import "./WhoIsHere.scss";

const API_URL = process.env.REACT_APP_API_URL;

const WhoIsHere = () => {
  const [whoIsHere, setWhoIsHere] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carPlate, setCarPlate] = useState("");
  const [userID, setUserID] = useState("");
  const [userList, setUserList] = useState([]);
  const [showBookings, setShowBookings] = useState(5);

  //Get vistors who have checked in but not yet checked out
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
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCurrVisitors();
    fetchUserList();
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onCheckoutHandler = (e) => {
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

  const sortedList = whoIsHere.sort(
    (a, b) => Date.parse(a.checkin) - Date.parse(b.checkin)
  );

  return (
    <section className="whoishere">
      <h1>Who Is Here</h1>
      <div className={sortedList.length > 0 ? "hide" : "show"}>
        No one is here
      </div>
      {sortedList.slice(0, showBookings).map((booking, i) => {
        return (
          <div key={sortedList[i].id} className="whoishere__information">
            <div className="whoishere__container">
              <h4 className="whoishere__subheader">Licence Plate</h4>
              <p className="whoishere__text">{sortedList[i].carPlate}</p>
            </div>
            <div className="whoishere__container">
              <h4 className="whoishere__subheader">Visit Date</h4>
              <p className="whoishere__text">{sortedList[i].requestDate}</p>
            </div>

            <div className="whoishere__container">
              <h4 className="whoishere__subheader">Accessibility</h4>
              <p className="whoishere__text">{sortedList[i].accessibility}</p>
            </div>
            <div className="whoishere__container">
              <h4 className="whoishere__subheader">Checkin Time</h4>
              <p className="whoishere__text">
                <Moment parse="YYYY-MM-DD HH:mm">
                  {sortedList[i].checkin}
                </Moment>
              </p>
            </div>
            <div className="whoishere__container">
              <h4 className="whoishere__subheader">For How Long?</h4>
              <p className="whoishere__text">
                <Moment fromNow ago>
                  {sortedList[i].checkin}
                </Moment>
              </p>
            </div>
            <div className="whoishere__actions">
              <button
                className="checkoutButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                onClick={onCheckoutHandler}
              ></button>

              <button
                className="contactButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].userID}
                onClick={onContactHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={
          sortedList.length > showBookings
            ? "show btn primary-btn"
            : "hide" || sortedList.length === showBookings
            ? "hide"
            : null
        }
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

export default WhoIsHere;
