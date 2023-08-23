import React from "react";
import "./Sidebar.css";
import { Link, withRouter, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    const location = useLocation();
    return (
        <div className={sidebarOpen ? "sidebar__responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <h1>Order manager</h1>
                </div>
                <i
                    className="fa fa-times"
                    id="sidebarIcon"
                    onClick={() => closeSidebar()}
                ></i>
            </div>
            <div className="sidebar__menu">
                <h2>Agendamentos</h2>
                <div className={`sidebar__link ${location.pathname === "/orders/register" ? "active" : ""}`}>
                    <i className="fa fa-calendar"></i>
                    <Link to="/orders/register">Agendar ordem de serviço</Link>
                </div>
                <h2>Cadastros</h2>
                <div className={`sidebar__link ${location.pathname === "/manufacturer/register" ? "active" : ""}`}>
                    <i className="fa fa-industry"></i>
                    <Link to="/manufacturer/register">Cadastro de marca</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/models/register" ? "active" : ""}`}>
                    <i className="fas fa-tractor"></i>
                    <Link to="/models/register">Cadastro de modelo</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/machine/register" ? "active" : ""}`}>
                    <i className="fas fa-tractor"></i>
                    <Link to="/machine/register">Cadastro de máquina</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/provider/register" ? "active" : ""}`}>
                    <i className="fa fa-industry"></i>
                    <Link to="/provider/register">Cadastro de fornecedor</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/agriculturalinput/register" ? "active" : ""}`}>
                    <i className="fas fa-seedling"></i>
                    <Link to="/agriculturalinput/register">
                        Cadastro de insumo
                    </Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/employee/register" ? "active" : ""}`}>
                    <i className="fas fa-users-cog"></i>
                    <Link to="/employee/register">Cadastro de funcionário</Link>
                </div>
                <h2>Listagens</h2>
                <div className={`sidebar__link ${location.pathname === "/manufacturer/list" ? "active" : ""}`}>
                    <i className="fa fa-industry"></i>
                    <Link to="/manufacturer/list">Marcas</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/models" ? "active" : ""}`}>
                    <i className="fas fa-tractor"></i>
                    <Link to="/models">Modelos</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/machine/list" ? "active" : ""}`}>
                    <i className="fas fa-tractor"></i>
                    <Link to="/machine/list">Máquinas</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/provider/list" ? "active" : ""}`}>
                    <i className="fa fa-industry"></i>
                    <Link to="/provider/list">Fornecedores</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/agriculturalinput/list" ? "active" : ""}`}>
                    <i className="fas fa-seedling"></i>
                    <Link to="/agriculturalinput/list">Insumos</Link>
                </div>
                <div className={`sidebar__link ${location.pathname === "/employee/list" ? "active" : ""}`}>
                    <i className="fas fa-users-cog"></i>
                    <Link to="/employee/list">Funcionários</Link>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Sidebar);
