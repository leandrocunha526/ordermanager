import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { NavLink } from "react-router-dom";
import Logout from "../../components/logout";

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                <NavLink to="/dashboard" activeClassName="active_link">
                    Home
                </NavLink>
                <NavLink to="/orders/list" activeClassName="active_link">
                    Ordens
                </NavLink>
                <NavLink to="/users/list" activeClassName="active_link">
                    Usuários
                </NavLink>
            </div>
            <div className="navbar__right">
                <a href="/dashboard">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;
