import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__right">
        <a href="/#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
