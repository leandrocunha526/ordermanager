import React, { Component } from "react";
import api from "./../../services/api";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Button,
    Typography,
    Box,
    Paper,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
} from "@mui/material";
import { Main, Container } from "./styles/OrderDetail";

class OrderDetail extends Component {
    state = {
        order: {
            orders: [],
            machines: [],
            employees: [],
            modelsMachine: [],
            agriculturalInputs: [],
        },
    };

    componentDidMount() {
        api.get(`/api/orders/${this.props.match.params.id}`)
            .then((res) => {
                const order = res.data;
                this.setState({ order });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    exportar = () => {
        const doc = new jsPDF("p", "pt");
        autoTable(doc, { html: "#table-order" });
        doc.save("order-details.pdf");
    };

    render() {
        const { order } = this.state;

        return (
            <Main>
                <Container>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Detalhes da Ordem de Serviço
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={`/orders/edit/${order.id}`}
                        >
                            Editar Ordem
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.exportar}
                        >
                            Exportar Dados
                        </Button>
                    </Box>

                    <TableContainer
                        component={Paper}
                        elevation={3}
                        sx={{ overflowX: "auto" }}
                    >
                        <table
                            id="table-order"
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            fontWeight: "bold",
                                            backgroundColor: "#f5f5f5",
                                            textAlign: "center",
                                        }}
                                    >
                                        Informações da ordem de serviço sob
                                        código {order.id}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Código:</TableCell>
                                    <TableCell>{order.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Descrição:</TableCell>
                                    <TableCell>{order.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Local:</TableCell>
                                    <TableCell>{order.local}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Data de início:</TableCell>
                                    <TableCell>
                                        <Moment format="DD/MM/YYYY">
                                            {order.startDate}
                                        </Moment>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Data final:</TableCell>
                                    <TableCell>
                                        <Moment format="DD/MM/YYYY">
                                            {order.endDate}
                                        </Moment>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Preço:</TableCell>
                                    <TableCell>{order.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Código de registro da máquina:
                                    </TableCell>
                                    <TableCell>
                                        {order.machines?.registerCode || "N/A"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Funcionário:</TableCell>
                                    <TableCell>
                                        {order.employees?.name || "N/A"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Insumo:</TableCell>
                                    <TableCell>
                                        {order.agriculturalInputs?.name ||
                                            "N/A"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Estado:</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            </TableBody>
                        </table>
                    </TableContainer>
                </Container>
            </Main>
        );
    }
}

export default withRouter(OrderDetail);
