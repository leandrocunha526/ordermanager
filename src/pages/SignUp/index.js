import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles";
import Title from "../../components/title";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        error: "Insira todos os dados para se cadastrar",
      });
    } else {
      try {
        await api.post("register", {
          email,
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
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
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
