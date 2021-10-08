import React from "react";
import "./Sidebar.css";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

const Sidebar = (props) => {
  const handleLogout = (e) => {
    logout();
    props.history.push("/");
  };
  return (
    <div className="sidebar-responsive" id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <h1>Order manager</h1>
        </div>
      </div>
      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <Link to="/dashboard">Home</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar"></i>
          <Link to="/orders/register">Agendar ordem de serviço</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/manufacturer/register">Cadastro de marca</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/manufacturer/list">Marcas</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/models/register">Cadastro de modelo</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/models">Modelos</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/machine/register">Cadastro de máquina</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/machine/list">Máquinas</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/provider/register">Cadastro de fornecedor</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/provider/list">Fornecedores</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <Link to="/agriculturalinput/register">Cadastro de insumo</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <Link to="/agriculturalinput/list">Insumos</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <Link to="/employee/register">Cadastro de funcionário</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <Link to="/employee/list">Funcionários</Link>
        </div>
        <div className="sidebar__logout">
          <button onClick={handleLogout}>
            <i className="fa fa-power-off"></i>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Sidebar);
