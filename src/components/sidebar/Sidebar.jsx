import React from "react";
import "./Sidebar.css";

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
          <a href="/dashboard">Home</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-tachometer"></i>
          <a href="/">Área administrativa</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <a href="/manufacturer">Marca</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/model">Modelo</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/manufacturer">Máquina</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/machine">Máquina</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <a href="/user">Usuários</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-wrench"></i>
          <a href="/order">Order de serviço</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <a href="/provider">Fornecedor</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <a href="/agriculturalinput">Insumos</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <a href="/employee">Funcionários</a>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
