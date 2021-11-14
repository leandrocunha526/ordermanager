import React, { Component } from "react";
import api from "./../../services/api";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Container, Table } from "./styles/OrderTableDetail";

class OrderDetail extends Component {
  state = {
    order: {
      orders: [],
      machines: [],
      employees: [],
      modelsMachine: [],
      agriculturalInputs: [],
    },
  };
  componentDidMount() {
    api
      .get(`/api/orders/${this.props.match.params.id}`)
      .then((res) => {
        const order = res.data;
        this.setState({ order });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  exportar = () => {
    const doc = new jsPDF("p", "pt");
    autoTable(doc, { html: "#table-order" });
    doc.save("table.pdf");
  };

  render() {
    return (
      <main>
        <Container>
          <Table>
            <h1>
              Detalhes sobre ordem de serviço código {this.state.order.id}
            </h1>
            <Link
              to={"/orders/edit/" + this.state.order.id}
              className="button__primary"
            >
              Editar
            </Link>
            <button
              type="button"
              className="button__secundary"
              onClick={() => this.exportar()}
            >
              Exportar dados
            </button>
            <table id="table-order">
              <tbody>
                <tr>
                  <td>Código:</td>
                  <td>
                    <label>{this.state.order.id}</label>
                  </td>
                </tr>
                <tr>
                  <td>Descrição:</td>
                  <td>
                    <label>{this.state.order.description}</label>
                  </td>
                </tr>
                <tr>
                  <td>Local:</td>
                  <td>
                    <label>{this.state.order.local}</label>
                  </td>
                </tr>
                <tr>
                  <td>Data de início:</td>
                  <td>
                    <label>
                      <Moment format="DD/MM/YYYY">
                        {this.state.order.startDate}
                      </Moment>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Data final:</td>
                  <td>
                    <label>
                      <Moment format="DD/MM/YYYY">
                        {this.state.order.endDate}
                      </Moment>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Preço:</td>
                  <td>
                    <label>{this.state.order.price}</label>
                  </td>
                </tr>
                <tr>
                  <td>Código de registro da máquina no IdAgro:</td>
                  <td>
                    <label>{this.state.order.machines.registerCode}</label>
                  </td>
                </tr>
                 <tr>
                  <td>Funcionário:</td>
                  <td>
                    <label>{this.state.order.employees.name}</label>
                  </td>
                </tr>
                <tr>
                  <td>Insumo:</td>
                  <td>
                    <label>{this.state.order.agriculturalInputs.name}</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </Table>
        </Container>
      </main>
    );
  }
}

export default withRouter(OrderDetail);
