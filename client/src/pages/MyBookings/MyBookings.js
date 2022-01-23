import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import BookingModal from "../../components/BookingModal/BookingModal";
import BookingForm from "../../components/BookingForm/BookingForm";
import SignupModal from "../../components/SignupModal/SignupModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./MyBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const MyBookings = (props) => {
  const [myBookings, setMyBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBookings, setShowBookings] = useState(5);
  const [carPlate, setCarPlate] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [bookingId, setBookingId] = useState("");

  console.log(showModal);
  useEffect(() => {
    fetchMyBookings();
    return () => {
      setMyBookings([]); //unmount
    };
  }, []);

  const fetchMyBookings = () => {
    const userId = props.userId;
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        // console.log(response);
        // console.log(userId);
        const bookings = response.data.filter(
          (booking) => booking.userID === userId
        );
        // console.log("bookings ", bookings);
        setMyBookings(bookings);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onCloseHandler = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    console.log("closed");
  };

  const onRebookHandler = (e) => {
    setShowModal(true);
    setCarPlate(e.target.name);
    setUnitNumber(e.target.id);
  };

  const onCrossHandler = (e) => {
    setShowDeleteModal(true);
    setBookingId(e.target.id);
  };

  const onDeleteHandler = (bookingId) => {
    console.log(bookingId);
    axios
      .delete(`${API_URL}/bookings/${bookingId}`)
      .then((response) => {
        setShowDeleteModal(false);
        fetchMyBookings();
      })
      .catch((err) => console.log("error!", err));
  };

  return (
    <section className="users">
      <h1>My Bookings</h1>
      <div className={myBookings.length <= 0 ? "show" : "hide"}>
        You have not created any bookings yet.
      </div>
      {myBookings.map((booking) => {
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
                  <h4 className="users__subheader">Date of Visit</h4>
                  <p className="users__address-details">
                    {booking.requestDate}
                  </p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Checkin Time</h4>
                <p className="users__contact-name">{booking.checkin}</p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">Checkout Time</h4>
                <p className="users__contact-email">{booking.checkout}</p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              <button
                className="repeatButton"
                name={booking.carPlate}
                id={booking.unitNumber}
                onClick={onRebookHandler}
              >
                {/* <FiRepeat
                name={booking.carPlate}
                id={booking.unitNumber}
                onClick={onRebookHandler}
              /> */}
              </button>
              <button
                className="deleteButton"
                name={booking.carPlate}
                id={booking.id}
                onClick={onCrossHandler}
              ></button>
              <Link to={`bookings/edit/${booking.id}`}>
                <FaUserEdit color="white" />
              </Link>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={myBookings.length > showBookings ? "show" : "hide"}
      >
        Load More
      </button>

      <BookingModal
        show={showModal}
        onCloseHandler={onCloseHandler}
        carPlate={carPlate}
        unitNumber={unitNumber}
        fetchMyBookings={fetchMyBookings}
      />
      <DeleteModal
        show={showDeleteModal}
        onCloseHandler={onCloseHandler}
        onDeleteHandler={onDeleteHandler}
        bookingId={bookingId}
      />
      {/* <SignupModal
        show={showModal}
        fetchMyBookings={fetchMyBookings}
        onCloseHandler={onCloseHandler}
        // onTrashHandler={onTrashHandler}
        // onDeleteHandler={onDeleteHandler}
        // itemId={this.state.warehouseId}
        // name="Warehouse"
        // itemName={this.state.warehouseName}
      /> */}
    </section>
  );
};

export default MyBookings;
