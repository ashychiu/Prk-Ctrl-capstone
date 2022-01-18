import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import BookingForm from "../BookingForm/BookingForm";

const SideBar = () => {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div></div>,
      main: () => <HomePage />,
    },
    {
      path: "/booking",
      sidebar: () => <div></div>,
      main: () => <BookingForm />,
    },
    {
      path: "/login",
      sidebar: () => <div>Profile!</div>,
      main: () => <h2>Profile</h2>,
    },
  ];
  return (
    <Router>
      <div className="main-container">
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/booking">booking</Link>
            </li>
            <li>
              <Link to="/login">profile</Link>
            </li>
          </ul>

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>

        <div className="content-container">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default SideBar;
