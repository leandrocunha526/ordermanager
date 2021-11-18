import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Form } from "./styles/OrderFormStyle";
import api from "../../services/api";
import Title from "../../components/title";

class Order extends Component {
  state = {
    description: "",
    local: "",
    status: "",
    startDate: "",
    endDate: "",
    agriculturalInputId: "",
    machineId: "",
    employeeId: "",
    price: "",
    message: "",
    error: "",
    agriculturalinputs: [],
    machines: [],
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
      .get("api/machines/list")
      .then((res) => {
        const machines = res.data;
        this.setState({ machines });
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
    const {description, status, local, startDate, endDate, machineId, employeeId, price, agriculturalInputId} = this.state;
    if(!description || !status || !local || !startDate || !endDate || !machineId || !employeeId || !price|| !agriculturalInputId){
      this.setState({
        error: "Preencha todos os campo para cadastrar uma ordem de serviço",
      });
    }
    else {
      try {
        await api.post("/api/orders/register", {
          description,
          status,
          local,
          startDate,
          endDate,
          machineId,
          employeeId,
          price,
          agriculturalInputId
        });
        this.setState({
          message: "Salvo com sucesso"
        });
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
            <textarea
              type="text"
              placeholder="Descrição"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />

            <label>Estado</label>
            <select
            name="status"
            id="status"
            value={this.state.status}
            onChange={(e) => this.setState({ status: e.target.value })}>
            <option value="0">Selecione o estado</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
            </select>

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
              name="agriculturalInputId"
              id="agriculturalInputId"
              value={this.state.agriculturalInputId}
              onChange={(e) => this.setState({ agriculturalInputId: e.target.value })}
            >
	      <option value="0">Selecione um insumo</option>

              {this.state.agriculturalinputs.map((agriculturalinput) => (
                <option key={agriculturalinput.id} value={agriculturalinput.id}>
                  {agriculturalinput.name}
                </option>
              ))}
            </select>

            <label>Código de registro da máquina no IdAgro</label>
            <select
              name="machineId"
              id="machineId"
              value={this.state.machineId}
              onChange={(e) => this.setState({ machineId: e.target.value })}
            >
              <option value="0">Selecione uma máquina</option>

              {this.state.machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.registerCode}
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
