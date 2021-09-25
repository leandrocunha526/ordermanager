import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles";
import Title from "../../components/title";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    error: "",
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const {firstName, lastName, username, password } = this.state;
    if (!firstName || !lastName || !username || !password) {
      this.setState({
        error: "Insira todos os dados para se cadastrar",
      });
    } else {
      try {
        await api.post("/api/users/register", {
          firstName,
          lastName,
          username,
          password,
        });
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error: "Ocorreu um problema com o cadastro ou usuário já cadastrado",
        });
      }
    }
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleRegister}>
          <Title title="Registro" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Primeiro Nome"
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Último Nome"
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Enviar</button>
          <hr />
          <Link to="/">Retornar para a tela de login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
