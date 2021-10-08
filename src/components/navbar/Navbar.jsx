import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import {Link} from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <Link to="/dashboard" className="active_link">
          Admin
        </Link>
        <Link to="/orders/list">Ordens de serviço</Link>
        <Link to="/users/list">Usuários</Link>
      </div>
      <div className="navbar__right">
        <a href="/dashboard">
          <i className="fa fa-search"></i>
        </a>
        <a href="/dashboard">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
