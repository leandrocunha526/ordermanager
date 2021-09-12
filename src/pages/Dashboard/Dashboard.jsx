import React from "react";
import "./Dashboard.css";
import hello from "../../assets/hello.svg";

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
      </div>
    </main>
  );
};

export default Dashboard;
