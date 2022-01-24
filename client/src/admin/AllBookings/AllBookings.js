import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "./AllBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllBookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBookings, setShowBookings] = useState(10);

  const fetchAllBookings = () => {
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onTrashHandler = (e) => {
    setShowModal(true);
    console.log(showModal);
  };

  return (
    <section className="users">
      {/* blogs.slice(0, visibleBlogs).map((blog, i) */}
      {bookingList.slice(0, showBookings).map((booking, i) => {
        return (
          <div key={bookingList[i].id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Name</h4>
                  <Link
                    to={`user/${bookingList[i].id}`}
                    className="users__location"
                  >
                    <p>
                      {bookingList[i].carPlate} {bookingList[i].requestDate}
                    </p>
                  </Link>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Unit Number</h4>
                  <p className="users__address-details">
                    {bookingList[i].unitNumber}
                  </p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Contact Number</h4>
                <p className="users__contact-name">
                  {bookingList[i].accessiblity}
                </p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">Contact Email</h4>
                <p className="users__contact-email">{bookingList[i].remarks}</p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              <button onClick={onTrashHandler}>
                <MdDeleteForever />
              </button>
              {/* <img
                name={bookingList[i].firstName}
                id={user.id}
                // onClick={onTrashHandler}
                className="users__actions-trash"
                src={}
                alt="trashcan"
              /> */}
              <Link to={`users/edit/${bookingList[i].id}`}>
                <FaUserEdit color="white" />
              </Link>
            </div>
          </div>
        );
      })}
      <button onClick={handleClick}>Load More</button>;
    </section>
  );
};

export default AllBookings;
