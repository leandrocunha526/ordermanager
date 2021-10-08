import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles/AgriculturalInputForm";
import Title from "../../components/title";

class AgriculturalInput extends Component {
  state = {
    name: "",
    sprayrate: "",
    price: "",
    quantity: "",
    providerId: "",
    providers: [],
    message: "",
    error: "",
  };

  componentDidMount() {
    api
      .get("api/providers/list")
      .then((res) => {
        const providers = res.data;
        this.setState({ providers });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const { name, sprayrate, price, quantity, providerId } = this.state;
    if (!name || !sprayrate || !price || !quantity || !providerId) {
      this.setState({
        error: "Preencha todos os campos para cadastrar um insumo",
      });
    } else {
      try {
        await api.post("/api/agriculturalinputs/register", {
          name,
          sprayrate,
          price,
          quantity,
          providerId,
        });
        this.setState({
          message: "Salvo com sucesso",
        });
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
            <Title title="Cadastro de insumo agrícola" />
            {this.state.message && <p>{this.state.message}</p>}
            {this.state.error && <p>{this.state.error}</p>}

            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />

            <label>Taxa de pulverização</label>
            <input
              type="text"
              placeholder="Taxa de pulverização"
              value={this.state.sprayrate}
              onChange={(e) => this.setState({ sprayrate: e.target.value })}
            />

            <label>Preço</label>
            <input
              type="number"
              placeholder="Preço"
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
            />

            <label>Quantidade</label>
            <input
              type="date"
              placeholder="Quantidade"
              value={this.state.quantity}
              onChange={(e) => this.setState({ quantity: e.target.value })}
            />

            <label>Fornecedor</label>
            <select
              name="providerId"
              id="providerId"
              value={this.state.providerId}
              onChange={(e) => this.setState({ providerId: e.target.value })}
            >
              <option value="0">Selecione um fornecedor</option>

              {this.state.providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.corporateName}
                </option>
              ))}
            </select>
            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
  }
}

export default withRouter(AgriculturalInput);
