import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <a href="/" className="active_link">
          Admin
        </a>
        <a href="/">Cadastrar ordens de serviço</a>
        <a href="/">Ordens de serviço cadastradas</a>
        <a href="/">Usuários cadastrados</a>
      </div>
      <div className="navbar__right">
        <a href="/#">
          <i className="fa fa-search"></i>
        </a>
        <a href="/#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
