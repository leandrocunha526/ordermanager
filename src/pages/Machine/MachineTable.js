import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/MachineTable.css";
import Moment from "react-moment";
import { Alert, AlertTitle } from "@mui/material";

class MachineTable extends Component {
    state = {
        machines: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("/api/machines/list")
            .then((res) => {
                const machines = res.data;
                this.setState({ machines });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/machines/${id}`);
            this.setState({
                message: "Máquina " + id + " excluída com sucesso.",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte problema ao excluir a máquina " +
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
                        <h1>Máquinas cadastradas</h1>
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
                                <th>Código de registro</th>
                                <th>Número de serial</th>
                                <th>Tipo</th>
                                <th>Data de aquisição</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.machines.map((machine, index) => (
                                <tr key={index}>
                                    <td>{machine.id}</td>
                                    <td>{machine.registerCode}</td>
                                    <td>{machine.serialNumber}</td>
                                    <td>{machine.type}</td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {machine.acquisitionDate}
                                        </Moment>
                                    </td>
                                    <td>{machine.modelsMachine.description}</td>
                                    <td>{machine.year}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button__warning"
                                            onClick={() =>
                                                this.delete(machine.id)
                                            }
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={"/machine/edit/" + machine.id}
                                            className="button__primary"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

export default withRouter(MachineTable);
