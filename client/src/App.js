import React, { Component, useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./styles/global.scss";

function App() {
  const [count, setCount] = useState(0);
  const [userList, setUserList] = useState([]);
  // function addClick () => setCount(prevCount + 1)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:8080/users`);
      setUserList(data);
    })();
  }, []);

  // useRef(async () => {
  //   const result = await axios(`http://localhost:8080/users`);

  //   setUserList(result.data);
  // });
  console.log("after:", userList);
  // axios
  //   .get(`http://localhost:8080/users`)
  //   .then((res) => {
  //     console.log(res.data);
  //     // setUserList(res);
  //   })
  //   .catch((err) => {
  //     // Handle Error Here
  //     console.error(err);
  //   });

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="hero">
          Prk Ctrl
          <Link
            to={{
              pathname:
                "https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
              <circle cx="12" cy="10" r="3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Link>
        </h1>
        You have clicked {count} times
        <button onClick={() => setCount(count + 1)}>Click</button>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>{user.firstName}</li>
          ))}
        </ul>
      </div>
    </BrowserRouter>
  );
}

export default App;
