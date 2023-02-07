import React, { Component } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/EmployeeTable.css";
import Moment from "react-moment";
import { Alert, AlertTitle } from "@mui/material";

class EmployeerTable extends Component {
    state = {
        employees: [],
        message: "",
        error: "",
    };
    componentDidMount() {
        api.get("api/employees/list")
            .then((res) => {
                const employees = res.data;
                this.setState({ employees });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async delete(id) {
        try {
            await api.delete(`/api/employees/${id}`);
            this.setState({
                message: "Funcionário " + id + " foi excluído",
            });
        } catch (err) {
            this.setState({
                error:
                    "Ocorreu o seguinte erro ao excluir o funcionário " +
                    id +
                    ": " +
                    err,
            });
        }
    }

    render() {
        return (
            <main>
                <div className="usertable__container">
                    <div>
                        <h1>Funcionários cadastrados</h1>
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
                                <th>Nome</th>
                                <th>Data de nascimento</th>
                                <th>Salário</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Deletar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {employee.birthday}
                                        </Moment>
                                    </td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.cpf}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="button__warning"
                                            onClick={() =>
                                                this.delete(employee.id)
                                            }
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={"/employee/edit/" + employee.id}
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

export default withRouter(EmployeerTable);
