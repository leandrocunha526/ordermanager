import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/ModelMachineTable.css";
import { Alert, AlertTitle } from "@mui/material";

class ModelMachineTable extends Component {
    state = {
        modelsmachine: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("api/modelsmachine/list")
            .then((res) => {
                const modelsmachine = res.data;
                this.setState({ modelsmachine });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/modelsmachine/${id}`);
            this.setState({
                message: "Modelo " + id + " excluído com sucesso.",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte erro ao excluir o modelo " +
                    id +
                    ": " +
                    err +
                    ".",
            });
        }
    }

    render() {
        return (
            <main>
                <div className="usertable__container">
                    <div>
                        <h1>Modelos cadastrados</h1>
                    </div>
                    {this.state.message && (
                        <Alert severity="success">
                            <AlertTitle>Sucesso!</AlertTitle>
                            {this.state.message}
                        </Alert>
                    )}
                    {this.state.error && (
                        <Alert severity="error">
                            <AlertTitle>Erro!</AlertTitle>
                            {this.state.error}
                        </Alert>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome do modelo</th>
                                <th>Fabricante</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.modelsmachine.map(
                                (modelsmachine, index) => (
                                    <tr key={index}>
                                        <td>{modelsmachine.id}</td>
                                        <td>{modelsmachine.description}</td>
                                        <td>
                                            {
                                                modelsmachine.manufacturers
                                                    .description
                                            }
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="button__warning"
                                                onClick={() =>
                                                    this.delete(
                                                        modelsmachine.id
                                                    )
                                                }
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                        <td>
                                            <Link
                                                to={
                                                    "/model/edit/" +
                                                    modelsmachine.id
                                                }
                                                className="button__primary"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

export default withRouter(ModelMachineTable);
