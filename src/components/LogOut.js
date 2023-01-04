import React from "react";

const LogOut = () => {
  const handleLogOut = async (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button id="log" onClick={handleLogOut} type="button">
      Logout!
    </button>
  );
};

export default LogOut;

