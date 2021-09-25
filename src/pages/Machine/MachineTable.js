import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/MachineTable.css";

class UsersTable extends Component {
  state = {
    machines: [],
    message: "",
    error: ""
  };
  componentDidMount() {
    api
      .get("/machine/list")
      .then((res) => {
        const machines = res.data;
        this.setState({ machines });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async delete(id) {
    try {
      await api.delete(`/machine/${id}`);
      this.setState({
        message: "Usuário excluído com sucesso"
      });
    } catch (err) {
      this.setState({
        error: "Ocorreu um erro ao excluir o usuário:" + err,
      });
    };
  };

  render() {
    return (
      <main>
        <div className="usertable__container">
          <div>
            <h1>Máquinas cadastrados</h1>
          </div>
          {this.state.message && <h3>{this.state.message}</h3>}
          {this.state.error && <h3>{this.state.error}</h3>}
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Deletar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.machines.map((machine, index) => (
                <tr key={index}>
                  <td>{machine.id}</td>
                  <td>{machine.type}</td>
                  <td>{machine.model}</td>
                  <td>{machine.year}</td>
                  <td>
                    <button
                      type="button"
                      className="button__warning"
                      onClick={() => this.delete(machine.id)}
                    >
                      Deletar
                    </button>
                  </td>
                  <td>
                    <Link
                      to={"/machine/edit/" + machine.id}
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

export default withRouter(UsersTable);
