import React, { useState, useEffect } from "react";
import "./AllUsers.scss";

const AllUsers = (props) => {
  const [showUsers, setShowUsers] = useState(10);
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = useState("unitNumber");
  const [sortedList, setSortedList] = useState([]);

  let { userList } = props;

  const handleClick = () => {
    setShowUsers((prevShowUsers) => prevShowUsers + 10);
  };

  useEffect(() => {
    const filterUserList = (query) => {
      const searchTerm = query.toLowerCase();
      const filtered = [...userList].filter((user) => {
        if (!query) {
          return null;
        } else if (
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.unitNumber.toString().includes(searchTerm) ||
          user.phone.toString().includes(searchTerm)
        ) {
          return user;
        }
      });
      setFilteredList(filtered);
    };
    filterUserList(query);
  }, [query]);

  useEffect(() => {
    const sortUserList = (sortType) => {
      if (sortType === "lastName") {
        const sorted = [...userList].sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
        setSortedList(sorted);
      }
      if (sortType === "unitNumber") {
        const sorted = [...userList].sort(
          (a, b) => a.unitNumber - b.unitNumber
        );
        setSortedList(sorted);
      }
      if (sortType === "email") {
        const sorted = [...userList].sort((a, b) =>
          a.email.localeCompare(b.email)
        );
        setSortedList(sorted);
      }
      if (sortType === "firstName") {
        const sorted = [...userList].sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setSortedList(sorted);
      }
    };
    sortUserList(sortType);
  }, [sortType]);

  // useEffect(() => {
  //   sortUserList(sortType);
  // }, [sortType]);

  // const sortUserList = (sortType) => {
  //   if (sortType === "unitNumber") {
  //     userList.sort((a, b) => a.unitNumber - b.unitNumber);

  //     // } else if (sortType === "email") {
  //     //   userList.sort((a, b) => a.email.localeCompare(b.email));
  //   } else {
  //     userList.sort((a, b) => a.lastName.localeCompare(b.lastName));
  //   }
  //   setSortedList(userList);
  // };

  if (!props.userList) {
    return <p>Loading...</p>;
  }

  const listToRender = query ? filteredList : sortedList;

  return (
    <section className="all-users">
      <h1>All Users</h1>
      <div className="all-users__sorting">
        <div>
          <h4>Search</h4>
          <input
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <h4>Sort by</h4>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="none" selected="selected" disabled hidden>
              Sort by
            </option>
            <option value="unitNumber">Unit Number</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="all-users__information desktop-bar">
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
      {listToRender.slice(0, showUsers).map((user, i) => {
        return (
          <div key={listToRender[i].id} className="all-users__information">
            <div className="all-users__container">
              <h4 className="all-users__subheader">Full Name</h4>
              <p>
                {listToRender[i].firstName} {listToRender[i].lastName}
              </p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Unit Number</h4>
              <p>{listToRender[i].unitNumber}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Contact Number</h4>
              <p>{listToRender[i].phone}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Email</h4>
              <p>{listToRender[i].email}</p>
            </div>
            <div className="all-users__container">
              <h4 className="all-users__subheader">Status</h4>
              <p>{listToRender[i].status}</p>
            </div>
            <div className="all-users__actions">
              <button
                className="editButton"
                name={listToRender[i].carPlate}
                id={listToRender[i].id}
                value={listToRender[i].requestDate}
              ></button>
              <button
                className="deleteButton"
                name={listToRender[i].carPlate}
                id={listToRender[i].id}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={
          listToRender.length > showUsers
            ? "show btn primary-btn"
            : "hide" || listToRender.length === showUsers
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
