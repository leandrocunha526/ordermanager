import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/ManufacturerTable.css";
import { Alert, AlertTitle } from "@mui/material";

class ManufacturerTable extends Component {
    state = {
        manufacturers: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("api/manufacturers/list")
            .then((res) => {
                const manufacturers = res.data;
                this.setState({ manufacturers });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/manufacturers/${id}`);
            this.setState({
                message: "Marca " + id + " excluída com sucesso.",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte erro ao excluir a marca " +
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
                        <h1>Marcas cadastradas</h1>
                    </div>
                    {this.state.message && (
                        <Alert severity="success">
                            <AlertTitle>Sucesso!</AlertTitle>
                            {this.state.message}
                        </Alert>
                    )}
                    {this.state.error && (
                        <Alert severity="error">
                            <AlertTitle>Error!</AlertTitle>
                            {this.state.error}
                        </Alert>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.manufacturers.map(
                                (manufacturer, index) => (
                                    <tr key={index}>
                                        <td>{manufacturer.id}</td>
                                        <td>{manufacturer.description}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="button__warning"
                                                onClick={() =>
                                                    this.delete(manufacturer.id)
                                                }
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                        <td>
                                            <Link
                                                to={
                                                    "/manufacturer/edit/" +
                                                    manufacturer.id
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

export default withRouter(ManufacturerTable);
