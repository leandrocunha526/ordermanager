import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";
import Title from "../../components/title";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        error: "Preencha seu nome de usuário e senha para continuar",
      });
    } else {
      try {
        const response = await api.post("login", {
          email: email,
          password: password,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "POST",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
        login(response.data.token);
        this.props.history.push("/dashboard");
      } catch (err) {
        this.setState({
          error: "Ocorreu um problema com o login, verifique suas credenciais",
        });
      }
    }
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
          <Title title="Entrar" />
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
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Registrar</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
