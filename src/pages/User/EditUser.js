import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Form } from "./styles/EditUser";
import api from "./../../services/api";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      message: ""
    };
  }

  componentDidMount() {
    api.get("/user/"+this.props.match.params.id).then(res => {
      this.setState({
        name: res.data.name,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password,
      });
    }).catch(error => {
      console.log(error);
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    api.put("/user/"+this.props.match.params.id, data).then(
      this.setState({
        message: "Usuário atualizado com sucesso"
      })
    );
  }

  render() {
    return (
      <main>
        <Container>
          <Form onSubmit={this.onSubmit}>
            <h1>Editar usuário</h1>
            <h2>{this.state.message}</h2>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChangeName}
            />

            <label>Nome de usuário:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUserName}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />

            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />

            <button type="submit">Enviar</button>

          </Form>
        </Container>
      </main>
    );
  }
}

export default withRouter(EditUser);
