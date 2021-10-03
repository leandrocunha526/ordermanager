import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles/ProviderFormStyle";
import Title from "../../components/title";

class Provider extends Component {
  state = {
    corporateName: "",
    cnpj: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    district: "",
    state: "",
    country: "",
    zipcode: "",
    error: "",
    message: "",
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const {corporateName, cnpj, email, phone, street, city, district, state, country, zipcode} = this.state;
    if (!corporateName || !cnpj || !email || !phone || !street || !city || !district || !state || !country || !zipcode) {
      this.setState({
        error: "Preencha todos os campo para cadastrar um fornecedor",
      });
    } else {
      try {
        await api.post("/api/providers/register", {
          corporateName,
          cnpj,
          email,
          phone,
          street,
          city,
          district,
          state,
          country,
          zipcode
        });
        this.setState({
          message: "Salvo com sucesso"
        })
      } catch (err) {
        this.setState({
          error: "Ocorreu o seguinte problema com o cadastro: " + err,
        });
      }
    }
  };
  render() {
    return (
    <main>
      <Container>
        <Form onSubmit={this.handleRegister}>
          <Title title="Registro de fornecedor" />
          {this.state.message && <p>{this.state.message}</p>}
          {this.state.error && <p>{this.state.error}</p>}
          <label>Razão social</label>
          <input
            type="text"
            placeholder="Razão social"
            value={this.state.corporateName}
            onChange={(e) => this.setState({ corporateName: e.target.value })}
          />

          <label>CPNJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            value={this.state.cnpj}
            onChange={(e) => this.setState({ cnpj: e.target.value })}
          />

          <label>E-mail</label>
          <input
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={this.state.phone}
            onChange={(e) => this.setState({ phone: e.target.value })}
          />

          <label>Rua</label>
          <input
            type="text"
            placeholder="Rua"
            value={this.state.street}
            onChange={(e) => this.setState({ street: e.target.value })}
          />

          <label>Cidade</label>
          <input
            type="text"
            placeholder="Cidade"
            value={this.state.city}
            onChange={(e) => this.setState({ city: e.target.value })}
          />

          <label>Bairro</label>
          <input
            type="text"
            placeholder="Bairro"
            value={this.state.district}
            onChange={(e) => this.setState({ district: e.target.value })}
          />

          <label>Estado</label>
          <input
            type="text"
            placeholder="Estado"
            value={this.state.state}
            onChange={(e) => this.setState({ state: e.target.value })}
          />

          <label>País</label>
          <input
            type="text"
            placeholder="País"
            value={this.state.country}
            onChange={(e) => this.setState({ country: e.target.value })}
          />

          <label>CEP</label>
          <input
            type="number"
            placeholder="CEP"
            value={this.state.zipcode}
            onChange={(e) => this.setState({ zipcode: e.target.value })}
          />
          <button type="submit">Enviar</button>
        </Form>
      </Container>
      </main>
    );
  }
}

export default withRouter(Provider);
