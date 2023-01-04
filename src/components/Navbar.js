import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "./index.js";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="link-container">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/Profile">
          Profile
        </Link>
      </div>
      <h1>MikesList Lite</h1>
      {!localStorage.getItem("token") ? (
        <div className="btn">
          <Link className="log" to="/Login">
            <button type="button">Login</button>
          </Link>
          <Link className="log" to="/SignUp">
            <button type="button">SignUp</button>
          </Link>
        </div>
      ) : (
        <div className="btn">
          <Link className="log" to="/LogOut">
            <LogOut />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;