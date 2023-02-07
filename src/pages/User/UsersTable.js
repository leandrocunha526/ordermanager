import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/UserTable.css";
import { Alert, AlertTitle } from "@mui/material";

class UsersTable extends Component {
    state = {
        users: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("api/users/list")
            .then((res) => {
                const users = res.data;
                this.setState({ users });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/users/${id}`);
            this.setState({
                message: "Usuário " + id + " foi excluído",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte erro ao excluir o usuário " +
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
                        <h1>Usuários cadastrados</h1>
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
                                <th>Primeiro nome</th>
                                <th>Último nome</th>
                                <th>Nome de usuário</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button__warning"
                                            onClick={() => this.delete(user.id)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={"/user/edit/" + user.id}
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

export default withRouter(UsersTable);
