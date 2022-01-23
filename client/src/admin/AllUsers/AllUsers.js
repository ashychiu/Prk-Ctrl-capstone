import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "./AllUsers.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUsers, setShowUsers] = useState(10);

  const fetchAllUsers = () => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleClick = () => {
    setShowUsers((prevShowUsers) => prevShowUsers + 10);
  };

  const onTrashHandler = (e) => {
    setShowModal(true);
    console.log(showModal);
    // this.setState({
    //   show: true,
    //   warehouseId: e.target.id,
    //   warehouseName: e.target.name,
    // });
  };

  return (
    <section className="users">
      {/* blogs.slice(0, visibleBlogs).map((blog, i) */}
      {userList.slice(0, showUsers).map((user, i) => {
        return (
          <div key={userList[i].id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Name</h4>
                  <Link
                    to={`user/${userList[i].id}`}
                    className="users__location"
                  >
                    <p>
                      {userList[i].firstName} {userList[i].lastName}
                    </p>
                  </Link>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Unit Number</h4>
                  <p className="users__address-details">
                    {userList[i].unitNumber}
                  </p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Contact Number</h4>
                <p className="users__contact-name">{userList[i].phone}</p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">Contact Email</h4>
                <p className="users__contact-email">{userList[i].email}</p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              <button onClick={onTrashHandler}>
                <MdDeleteForever />
              </button>
              {/* <img
                name={userList[i].firstName}
                id={user.id}
                // onClick={onTrashHandler}
                className="users__actions-trash"
                src={}
                alt="trashcan"
              /> */}
              <Link to={`users/edit/${userList[i].id}`}>
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

export default AllUsers;
