import React from "react";
import { useHistory } from "react-router";
import { isLoggedIn } from "../../utils/loginStatus";

const DashBoard = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/seeyou");
  };

  console.log(isLoggedIn);
  return (
    <div>
      <h1>Welcome, </h1>
      <button onClick={isLoggedIn}>Logout</button>
      <div>{isLoggedIn}</div>
    </div>
  );
};

export default DashBoard;
