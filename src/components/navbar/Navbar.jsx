import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav_icon">
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <a href="/" className="active_link">
          Admin
        </a>
      </div>
      <div className="navbar__right">
        <a href="/#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
