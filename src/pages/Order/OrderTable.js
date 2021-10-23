import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/OrderTable.css";
import Moment from "react-moment";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

class OrderTable extends Component {
  state = {
    orders: [],
    message: "",
    error: ""
  };
  componentDidMount() {
    api
      .get("/api/orders/list")
      .then((res) => {
        const orders = res.data;
        this.setState({ orders });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async delete(id) {
    try {
      await api.delete(`/api/orders/${id}`);
      this.setState({
        message: "Ordem de serviço excluída com sucesso"
      });
    } catch (err) {
      this.setState({
        error: "Ocorreu o seguinte erro ao excluir a ordem de serviço: " + err,
      });
    };
  };

  exportar = () => {
    const doc = new jsPDF('p', 'pt');
    autoTable(doc, { html: '#table-order' });
    doc.save("table.pdf");
  }

  render() {
    return (
      <main>
        <div className="usertable__container">
          <div>
            <h1>Ordem de serviço agendadas</h1>
          </div>
          {this.state.message && <h3>{this.state.message}</h3>}
          {this.state.error && <h3>{this.state.error}</h3>}

          <button
           type="button"
           className="button__secundary"
           onClick={() => this.exportar()}>
            Exportar dados
          </button>

          <table id="table-order">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Local</th>
                <th>Data início</th>
                <th>Data final</th>
                <th>Preço</th>
                <th>Modelo</th>
                <th>Insumo</th>
                <th>Funcionário</th>
                <th>Deletar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.description}</td>
                  <td>{order.local}</td>
                  <td><Moment format="DD/MM/YYYY">{order.startDate}</Moment></td>
                  <td><Moment format="DD/MM/YYYY">{order.endDate}</Moment></td>
                  <td>{order.price}</td>
                  <td>{order.machines.type}</td>
                  <td>{order.agriculturalInputs.name}</td>
                  <td>{order.employees.name}</td>
                  <td>
                    <button
                      type="button"
                      className="button__warning"
                      onClick={() => this.delete(order.id)}
                    >
                      Deletar
                    </button>
                  </td>
                  <td>
                    <Link
                      to={"/orders/edit/" + order.id}
                      className="button__primary"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default withRouter(OrderTable);
