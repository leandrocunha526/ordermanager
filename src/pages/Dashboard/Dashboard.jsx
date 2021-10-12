import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import hello from "../../assets/hello.svg";
import EmployeeBarChart from "../../components/charts/EmployeeBarChart";
import AgriculturalInputBarChart from "../../components/charts/AgriculturalInputBarChart";
import OrderBarChart from "../../components/charts/OrderBarChart";

import api from "./../../services/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [agriculturalinputs, setAgriculturalInputs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [machines, setMachinhes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    api.get("/api/users/list").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/providers/list").then(({ data }) => {
      setProviders(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/agriculturalinputs/list").then(({ data }) => {
      setAgriculturalInputs(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/employees/list").then(({ data }) => {
      setEmployees(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/orders/list").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/machines/list").then(({ data }) => {
      setMachinhes(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/manufacturers/list").then(({ data }) => {
      setManufacturers(data);
    });
  }, []);

  useEffect(() => {
    api.get("/api/modelsmachine/list").then(({ data }) => {
      setModels(data);
    });
  }, []);

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Olá,</h1>
            <p>seja bem vindo ao seu dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Número de usuáros</p>
              <span className="font-bold text-title">{users.length}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red"></i>
            <div className="card_inner">
              <p className="text-primary-p">Ordens de serviço</p>
              <span className="font-bold text-title">{orders.length}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-users fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Fornecedores</p>
              <span className="font-bold text-title">{providers.length}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-bug fa-2x text-blue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Insumos</p>
              <span className="font-bold text-title">
                {agriculturalinputs.length}
              </span>
            </div>
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
                <h1>Máquinas</h1>
                <h1>{machines.length}</h1>
              </div>
              <div className="card2">
                <h1>Modelos</h1>
                <h1>{models.length}</h1>
              </div>
              <div className="card3">
                <h1>Marca</h1>
                <h1>{manufacturers.length}</h1>
              </div>
              <div className="card4">
                <h1>Funcionários</h1>
                <h1>{employees.length}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Ordens de serviço</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <OrderBarChart/>
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Insumos</h1>
              </div>
              <i className="fa fa-usd"></i>
            </div>
            <AgriculturalInputBarChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
