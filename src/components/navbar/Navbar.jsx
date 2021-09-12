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
        <a href="/">Cadastrar ordens de serviço</a>
        <a href="/">Ordens de serviço cadastradas</a>
        <a href="/">Usuários cadastrados</a>
      </div>
      <div className="navbar__right">
        <img width="30" src={avatar} alt="avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
