import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles/EmployeeFormStyle";
import Title from "../../components/title";

class Employee extends Component {
  state = {
    name: "",
    salary: "",
    cpf: "",
    phone: "",
    birthday: "",
    error: "",
    message: "",
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const {name, salary, cpf, phone, birthday} = this.state;
    if (!name || !salary || !cpf || !phone|| !birthday) {
      this.setState({
        error: "Preencha todos os campos para cadastrar um funcionário",
      });
    } else {
      try {
        await api.post("/api/employees/register", {
            name,
            salary,
            cpf,
            phone,
            birthday
        });
        this.setState({
          message: "Salvo com sucesso"
        })
      } catch (err) {
        this.setState({
          error: "Ocorreu um problema com o cadastro. " + err,
        });
      }
    }
  };
  render() {
    return (
    <main>
      <Container>
        <Form onSubmit={this.handleRegister}>
          <Title title="Registro de funcionário" />
          {this.state.message && <p>{this.state.message}</p>}
          {this.state.error && <p>{this.state.error}</p>}

          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />

          <label>Salário</label>
          <input
            type="number"
            placeholder="Salário"
            value={this.state.salary}
            onChange={(e) => this.setState({ salary: e.target.value })}
          />

          <label>CPF</label>
          <input
            type="text"
            placeholder="CPF"
            value={this.state.cpf}
            onChange={(e) => this.setState({ cpf: e.target.value })}
          />

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={this.state.phone}
            onChange={(e) => this.setState({ phone: e.target.value })}
          />

          <label>Data de nascimento</label>
          <input
            type="date"
            placeholder="Data de nascimento"
            value={this.state.birthday}
            onChange={(e) => this.setState({ birthday: e.target.value })}
          />
          <button type="submit">Enviar</button>
        </Form>
      </Container>
      </main>
    );
  }
}

export default withRouter(Employee);
