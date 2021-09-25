import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Form } from "./styles/EditUser";
import api from "./../../services/api";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: [],
      name: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      message: "",
    };
  }

  componentDidMount() {
    api.get("/api/users/"+this.props.match.params.id).then(res => {
      const user = res.data;
      this.setState({
       user
      });
    }).catch(error => {
      console.log(error);
    })
  }

  onChangeFirstName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      firstName: e.target.value,
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
    api.put("/api/users/"+this.props.match.params.id, data).then(
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
              name="fistName"
              value={this.state.user.firstName}
              onChange={this.onChangeFirstName}
            />

            <label>Último nome:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.user.lastName}
              onChange={this.onChangeLastName}
            />

            <label>Nome de usuário:</label>
            <input
              type="text"
              name="username"
              value={this.state.user.username}
              onChange={this.onChangeUserName}
            />

            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={this.state.user.password}
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
