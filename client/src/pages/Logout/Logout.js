import React from "react";
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();
  const timeout = setTimeout(redirect, 5000);

  function redirect() {
    history.push("/");
  }
  return (
    <div>
      <h1>Thank you for using PRK CRTL. See you next time!</h1>
    </div>
  );
};

export default Logout;
