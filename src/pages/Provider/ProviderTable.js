import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/ProviderTable.css";
import { Alert, AlertTitle } from "@mui/material";

class ProviderTable extends Component {
    state = {
        providers: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("api/providers/list")
            .then((res) => {
                const providers = res.data;
                this.setState({ providers });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/providers/${id}`);
            this.setState({
                message: "Fornecedor excluído com sucesso",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte erro ao excluir o fornecedor " +
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
                        <h1>Fornecedores cadastrados</h1>
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
                                <th>Razão social</th>
                                <th>CNPJ</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Rua</th>
                                <th>Cidade</th>
                                <th>Bairro</th>
                                <th>Estado</th>
                                <th>País</th>
                                <th>CEP</th>
                                <th>Número do estabelecimento</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.providers.map((provider, index) => (
                                <tr key={index}>
                                    <td>{provider.id}</td>
                                    <td>{provider.corporateName}</td>
                                    <td>{provider.cnpj}</td>
                                    <td>{provider.email}</td>
                                    <td>{provider.phone}</td>
                                    <td>{provider.city}</td>
                                    <td>{provider.street}</td>
                                    <td>{provider.district}</td>
                                    <td>{provider.state}</td>
                                    <td>{provider.country}</td>
                                    <td>{provider.zipcode}</td>
                                    <td>{provider.establishmentNumber}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button__warning"
                                            onClick={() =>
                                                this.delete(provider.id)
                                            }
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={"/provider/edit/" + provider.id}
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

export default withRouter(ProviderTable);
