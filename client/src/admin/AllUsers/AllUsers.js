import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { FaAdn } from "react-icons/fa";
import "./AllUsers.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/users`);
      setUserList(data);
    })();
  }, []);

  return (
    <section className="users">
      {userList.map((user) => {
        return (
          <div key={user.id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Name</h4>
                  <Link to={`user/${user.id}`} className="users__location">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </Link>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Unit Number</h4>
                  <p className="users__address-details">{user.unitNumber}</p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Contact Number</h4>
                <p className="users__contact-name">{user.phone}</p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">Contact Email</h4>
                <p className="users__contact-email">{user.email}</p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              <img
                name={user.firstName}
                id={user.id}
                // onClick={onTrashHandler}
                className="users__actions-trash"
                src={<FaAdn />}
                alt="trashcan"
              />
              <Link to={`users/edit/${user.id}`}>
                <img
                  className="users__actions-edit"
                  src={<FaAdn />}
                  alt="edit"
                />
              </Link>
            </div>
          </div>
        );
      })}
      {/* <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul> */}
    </section>
  );
};

export default AllUsers;
