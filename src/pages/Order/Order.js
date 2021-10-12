import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Form } from "./styles/OrderFormStyle";
import api from "../../services/api";
import Title from "../../components/title";

class Order extends Component {
  state = {
    description: "",
    local: "",
    startDate: "",
    endDate: "",
    agriculturalinputId: "",
    modelMachineId: "",
    employeeId: "",
    price: "",
    message: "",
    error: "",
    agriculturalinputs: [],
    modelsmachine: [],
    employees: []
  }

  componentDidMount() {
    api
      .get("api/employees/list")
      .then((res) => {
        const employees = res.data;
        this.setState({ employees });
      })
      .catch((error) => {
        console.log(error);
      });

      api
      .get("api/modelsmachine/list")
      .then((res) => {
        const modelsmachine = res.data;
        this.setState({ modelsmachine });
      })
      .catch((error) => {
        console.log(error);
      });

      api
      .get("api/agriculturalinputs/list")
      .then((res) => {
        const agriculturalinputs = res.data;
        this.setState({ agriculturalinputs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {description, local, startDate, endDate, modelMachineId, employeeId, price} = this.state;
    if(!description || !local || !startDate || !endDate || !modelMachineId || !employeeId || !price){
      this.setState({
        error: "Preencha todos os campo para cadastrar uma ordem de serviço",
      });
    }
    else {
      try {
        await api.post("", {
          description,
          local,
          startDate,
          endDate,
          modelMachineId,
          employeeId,
          price
        })
      }catch(err){
        this.setState({
          error: "Ocorreu o seguinte problema com o cadastro: " + err,
        });
      }
    }
  }

  render() {
    return (
      <main>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Title title="Agendamento de ordens de serviço"/>
            {this.state.message && <p>{this.state.message}</p>}
            {this.state.error && <p>{this.state.error}</p>}

            <label>Descrição</label>
            <input
              type="text"
              placeholder="Descrição"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />

            <label>Local</label>
            <input
              type="text"
              placeholder="Local"
              value={this.state.local}
              onChange={(e) => this.setState({ local: e.target.value })}
            />

            <label>Data de início</label>
            <input
              type="date"
              placeholder="Data de início"
              value={this.state.startDate}
              onChange={(e) => this.setState({ startDate: e.target.value })}
            />

            <label>Data de finalização</label>
            <input
              type="date"
              placeholder="Data de início"
              value={this.state.endDate}
              onChange={(e) => this.setState({ endDate: e.target.value })}
            />

            <label>Preço</label>
            <input
              type="number"
              placeholder="Preço"
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
            />

            <label>Insumos</label>
            <select
              name="agriculturalinputId"
              id="agriculturalinputId"
              value={this.state.agriculturalinputId}
              onChange={(e) => this.setState({ agriculturalinputId: e.target.value })}
            >
              <option value="0">Selecione um insumo</option>

              {this.state.agriculturalinputs.map((agriculturalinput) => (
                <option key={agriculturalinput.id} value={agriculturalinput.id}>
                  {agriculturalinput.name}
                </option>
              ))}
            </select>

            <label>Modelo</label>
            <select
              name="modelMachineId"
              id="modelMachineId"
              value={this.state.modelMachineId}
              onChange={(e) => this.setState({ modelMachineId: e.target.value })}
            >
              <option value="0">Selecione um modelo</option>

              {this.state.modelsmachine.map((modelmachine) => (
                <option key={modelmachine.id} value={modelmachine.id}>
                  {modelmachine.description}
                </option>
              ))}
            </select>

            <label>Funcionário</label>
            <select
              name="employeeId"
              id="employeeId"
              value={this.state.employeeId}
              onChange={(e) => this.setState({ employeeId: e.target.value })}
            >
              <option value="0">Selecione um funcionário</option>

              {this.state.employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
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

export default withRouter(Order);
