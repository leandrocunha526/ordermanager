import React from "react";
import "./Sidebar.css";
import {Link} from "react-router-dom";

const Sidebar = () => {
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
          <i className="fa fa-industry"></i>
          <Link to="/manufacturer">Cadastro de marca</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/manufacturer">Marcas</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/model">Cadastro de modelo</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/model">Modelos</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/manufacturer">Cadastro de máquina</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <Link to="/machine">Máquinas</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/provider">Cadastro de fornecedor</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <Link to="/provider">Fornecedores</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <Link to="/agriculturalinput">Cadastro de insumo</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <Link to="/agriculturalinput">Insumos</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <Link to="/employee">Cadastro de funcionário</Link>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <Link to="/employee">Funcionários</Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
