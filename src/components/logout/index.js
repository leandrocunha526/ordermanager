import React from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import "./style.css";

const Logout = (props) => {

    const handleLogout = (e) => {
    logout();
    props.history.push("/");
    };

    return (
         <div className="navbar__logout">
          <button onClick={handleLogout}>
            <i className="fa fa-power-off"></i>
            Sair
          </button>
        </div>
    )
}

export default withRouter(Logout);
