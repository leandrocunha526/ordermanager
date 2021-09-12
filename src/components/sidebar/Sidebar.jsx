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
          <i className="fa fa-industry"></i>
          <a href="/manufacturer">Cadastro de marca</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <a href="/manufacturer">Marcas</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/model">Cadastro de modelo</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/model">Modelos</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/manufacturer">Cadastro de máquina</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-tractor"></i>
          <a href="/manufacturer">Máquinas</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <a href="/provider">Cadastro de fornecedor</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-industry"></i>
          <a href="/provider">Fornecedores</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <a href="/agriculturalinput">Cadastro de insumo</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-seedling"></i>
          <a href="/agriculturalinput">Insumos</a>
        </div>
        <div className="sidebar__link">
          <i className="fas fa-users-cog"></i>
          <a href="/employee">Cadastro de funcionário</a>
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
