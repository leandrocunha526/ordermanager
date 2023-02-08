import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { Form, Container } from "./styles/ManufacturerFormStyle";
import Title from "../../components/title";
import { Alert, AlertTitle } from "@mui/material";
class Manufacturer extends Component {
    state = {
        description: "",
        error: "",
        message: "",
    };

    handleRegister = async (e) => {
        e.preventDefault();
        const { description } = this.state;
        if (!description) {
            this.setState({
                error: "Preencha o campo para cadastrar uma marca.",
            });
        } else {
            try {
                await api.post("/api/manufacturers/register", {
                    description,
                });
                this.setState({
                    message: "Salvo com sucesso.",
                });
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
                        <Title title="Registro de marca" />
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
                        <label>Nome da marca</label>
                        <input
                            type="text"
                            placeholder="Nome da marca"
                            value={this.state.description}
                            onChange={(e) =>
                                this.setState({ description: e.target.value })
                            }
                        />
                        <button type="submit">Enviar</button>
                    </Form>
                </Container>
            </main>
        );
    }
}

export default withRouter(Manufacturer);
