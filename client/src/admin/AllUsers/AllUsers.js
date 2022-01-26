import React, { useState } from "react";
import "./AllUsers.scss";

const AllUsers = (props) => {
  const [showUsers, setShowUsers] = useState(10);

  if (!props.userList) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    setShowUsers((prevShowUsers) => prevShowUsers + 10);
  };

  const sortedList = props.userList.sort((a, b) => a.unitNumber - b.unitNumber);
  console.log("sorted list: ");
  return (
    <section className="all-users">
      <h1>All Users</h1>
      <div className="all-users__information desktop">
        <div className="all-users__container">
          <h4 className="all-users__heading">Full Name</h4>
        </div>
        <div className="all-users__container">
          <h4 className="all-users__heading">Unit Number</h4>
        </div>
        <div className="all-users__container">
          <h4 className="all-users__heading">Contact Number</h4>
        </div>
        <div className="all-users__container">
          <h4 className="all-users__heading">Email Address</h4>
        </div>
        <div className="all-users__container">
          <h4 className="all-users__heading">Status</h4>
        </div>
        <div className="all-users__actions">
          <h4 className="all-users__heading hidden">Action Function</h4>
        </div>
      </div>
      {sortedList.slice(0, showUsers).map((user, i) => {
        return (
          <div key={sortedList[i].id} className="all-users__information">
            <div className="all-users__container">
              <h4 className="all-users__subheader">Full Name</h4>
              <p>
                {sortedList[i].firstName} {sortedList[i].lastName}
              </p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Unit Number</h4>
              <p>{sortedList[i].unitNumber}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Contact Number</h4>
              <p>{sortedList[i].phone}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Email</h4>
              <p>{sortedList[i].email}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Status</h4>
              <p>{sortedList[i].status}</p>
            </div>
            <div className="all-users__actions">
              <button
                className="editButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                value={sortedList[i].requestDate}
              ></button>
              <button
                className="deleteButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={
          sortedList.length > showUsers
            ? "show btn primary-btn"
            : "hide" || sortedList.length === showUsers
            ? "hide"
            : null
        }
      >
        Load More
      </button>
    </section>
  );
};

export default AllUsers;
