import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/UserTable.css";

class UsersTable extends Component {
  state = {
    users: [],
    message: "",
    error: ""
  };
  componentDidMount() {
    api
      .get("/user/list")
      .then((res) => {
        const users = res.data;
        this.setState({ users });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async delete(id) {
    try {
      await api.delete(`/user/${id}`);
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
            <h1>Usuários cadastrados</h1>
          </div>
          {this.state.message && <h3>{this.state.message}</h3>}
          {this.state.error && <h3>{this.state.error}</h3>}
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Nome de usuário</th>
                <th>Email</th>
                <th>Registro</th>
                <th>Atualização</th>
                <th>Deletar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>{user.updated_at}</td>
                  <td>
                    <button
                      type="button"
                      className="button__warning"
                      onClick={() => this.delete(user.id)}
                    >
                      Deletar
                    </button>
                  </td>
                  <td>
                    <Link
                      to={"/user/edit/" + user.id}
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
