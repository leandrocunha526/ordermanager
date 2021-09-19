import React from "react";
import "./Dashboard.css";
import hello from "../../assets/hello.svg";
import EmployeeBarChart from "../../components/charts/EmployeeBarChart";

const Dashboard = () => {
  return (
    <main>
      <div className="dashboard__container">
        <div className="dashboard__title">
          <img src={hello} alt="hello" />
          <div className="dashboard__greeting">
            <h1>Olá</h1>
            <p>Seja bem vindo ao seu dashboard</p>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Funcionários</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <EmployeeBarChart />
            </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Registros</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <div className="charts__right__cards">
              <div className="card1">
                <h1>Fornecedores</h1>
                <p></p>
              </div>
              <div className="card2">
                <h1>Insumos</h1>
                <p></p>
              </div>
              <div className="card3">
                <h1>Users</h1>
                <p></p>
              </div>
              <div className="card4">
                <h1>Funcionários</h1>
                <p></p>
              </div>
              <div className="card5">
                <h1>Ordens de serviço</h1>
                <p></p>
              </div>
              <div className="card6">
                <h1>Máquinas</h1>
                <p></p>
              </div>
              <div className="card7">
                <h1>Marcas</h1>
                <p></p>
              </div>
              <div className="card8">
                <h1>Modelos</h1>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
