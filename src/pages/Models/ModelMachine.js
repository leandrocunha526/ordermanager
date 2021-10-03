import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import api from "../../services/api";
import {Form, Container} from "./styles/ModelMachineForm";
import Title from "../../components/title";

class ModelMachine extends Component {
    state = {
        description: "",
        manufacturerId: "",
        manufacturers: [],
        error: "",
        messsage: ""
    }

    componentDidMount() {
        api
          .get("api/manufacturers/list")
          .then((res) => {
            const manufacturers = res.data;
            this.setState({ manufacturers });
          })
          .catch((error) => {
            console.log(error);
          });
      }

    handleRegister = async (e) => {
        e.preventDefault();
        const {description, manufacturerId} = this.state;
        if (!description || !manufacturerId) {
          this.setState({
            error: "Preencha todos os campo para cadastrar um modelo",
          });
        } else {
          try {
            await api.post("/api/modelsmachine/register", {
                description,
                manufacturerId,
            });
            this.setState({
              message: "Salvo com sucesso"
            })
          } catch (err) {
            this.setState({
              error: "Ocorreu o seguinte problema com o cadastro. " + err,
            });
          }
        }
      };

      render() {
        return (
        <main>
          <Container>
            <Form onSubmit={this.handleRegister}>
              <Title title="Registro de modelo de máquina agrícola" />
              {this.state.message && <p>{this.state.message}</p>}
              {this.state.error && <p>{this.state.error}</p>}
              <label>Nome do modelo</label>
              <input
                type="text"
                placeholder="Nome do modelo"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />

              <label>Fabricante</label>
              <select
                name="manufacturerId"
                id="manufacturerId"
                value={this.state.manufacturerId}
                onChange={(e) => this.setState({ manufacturerId: e.target.value })}
              >
                <option value="0">Selecione um fabricante</option>

                {this.state.manufacturers.map((manufacturers) => (
                  <option key={manufacturers.id} value={manufacturers.id}>
                    {manufacturers.description}
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
export default withRouter(ModelMachine);
