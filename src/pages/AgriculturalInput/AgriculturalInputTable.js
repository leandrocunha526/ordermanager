import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/AgriculturalInputTable.css";

class AgriculturalInputTable extends Component {
  state = {
    agriculturalinputs: [],
    message: "",
    error: "",
  };

  componentDidMount() {
    api
      .get("/api/agriculturalinputs/list")
      .then((res) => {
        const agriculturalinputs = res.data;
        this.setState({ agriculturalinputs });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async delete(id) {
    try {
      await api.delete(`/api/agriculturalinputs/${id}`);
      this.setState({
        message: "Insumo excluído com sucesso",
      });
    } catch (err) {
      this.setState({
        error: "Ocorreu o seguinte problema ao excluir a máquina: " + err,
      });
    }
  }
  render() {
    return (
      <main>
        <div className="usertable__container">
          <div>
            <h1>Insumos cadastrados</h1>
          </div>
          {this.state.message && <h3>{this.state.message}</h3>}
          {this.state.error && <h3>{this.state.error}</h3>}
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Taxa de pulverização</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Fornecedor</th>
                <th>Deletar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.agriculturalinputs.map((agriculturalinput, index) => (
                <tr key={index}>
                  <td>{agriculturalinput.id}</td>
                  <td>{agriculturalinput.name}</td>
                  <td>{agriculturalinput.sprayrate}</td>
                  <td>{agriculturalinput.price}</td>
                  <td>{agriculturalinput.quantity}</td>
                  <td>{agriculturalinput.providers.corporateName}</td>
                  <td>
                    <button
                      type="button"
                      className="button__warning"
                      onClick={() => this.delete(agriculturalinput.id)}
                    >
                      Deletar
                    </button>
                  </td>
                  <td>
                    <Link
                      to={"/agriculturalinput/edit/" + agriculturalinput.id}
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
export default withRouter(AgriculturalInputTable);
