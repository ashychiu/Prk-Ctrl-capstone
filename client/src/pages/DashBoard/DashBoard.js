import React from "react";
import { useHistory } from "react-router";
import logout from "../../utils/logout";

const DashBoard = (props) => {
  // const history = useHistory();
  // const logout = () => {
  //   localStorage.clear();
  //   history.push("/seeyou");
  // };
  console.log(props);
  return (
    <div>
      <h1>Welcome, </h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashBoard;
