import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import hello from "../../assets/hello.svg";
import EmployeeBarChart from "../../components/charts/EmployeeBarChart";
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
    api.get("/user/list").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    api.get("/provider/list").then(({ data }) => {
      setProviders(data);
    });
  }, []);

  useEffect(() => {
    api.get("/agriculturalinput/list").then(({ data }) => {
      setAgriculturalInputs(data);
    });
  }, []);

  useEffect(() => {
    api.get("/employee/list").then(({ data }) => {
      setEmployees(data);
    });
  }, []);

  useEffect(() => {
    api.get("/orders/list").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  useEffect(() => {
    api.get("/order/list").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  useEffect(() => {
    api.get("/machine/list").then(({ data }) => {
      setMachinhes(data);
    });
  }, []);

  useEffect(() => {
    api.get("/manufacturer/list").then(({ data }) => {
      setManufacturers(data);
    });
  }, []);

  useEffect(() => {
    api.get("/models/list").then(({ data }) => {
      setModels(data);
    });
  }, []);

  return (
    <main>
      <div className="dashboard__container">
        <div className="dashboard__title">
          <img src={hello} alt="hello" />
          <div className="dashboard__greeting">
            <h1>Olá</h1>
            <p>seja bem vindo ao seu dashboard</p>
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
                <h1>{providers.length}</h1>
              </div>
              <div className="card2">
                <h1>Insumos</h1>
                <h1>{agriculturalinputs.length}</h1>
              </div>
              <div className="card3">
                <h1>Usuários</h1>
                <h1>{users.length}</h1>
              </div>
              <div className="card4">
                <h1>Funcionários</h1>
                <h1>{employees.length}</h1>
              </div>
              <div className="card5">
                <h1>Ordens de serviço</h1>
                <h1>{orders.length}</h1>
              </div>
              <div className="card6">
                <h1>Máquinas</h1>
                <h1>{machines.length}</h1>
              </div>
              <div className="card7">
                <h1>Marcas</h1>
                <h1>{manufacturers.length}</h1>
              </div>
              <div className="card8">
                <h1>Modelos</h1>
                <h1>{models.length}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
