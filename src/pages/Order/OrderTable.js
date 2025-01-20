import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Alert,
    AlertTitle,
    Typography,
    TextField,
    CircularProgress,
    TablePagination,
    Select,
    MenuItem,
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Info as InfoIcon,
} from "@mui/icons-material";
import { Main, Container } from "./../../styles/global";
import moment from "moment";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [initialOrders, setInitialOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusOrder, setStatusOrder] = useState("default");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/api/orders/list");
                setOrders(response.data);
                setInitialOrders(response.data);
            } catch (error) {
                console.error(error);
                setErrorMessage("Erro ao carregar ordens de serviço.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSearch = () => {
        let filteredOrders = initialOrders;

        if (searchStartDate) {
            filteredOrders = filteredOrders.filter((order) =>
                moment(order.startDate).isSameOrAfter(searchStartDate, "day")
            );
        }

        if (searchEndDate) {
            filteredOrders = filteredOrders.filter((order) =>
                moment(order.endDate).isSameOrBefore(searchEndDate, "day")
            );
        }

        setOrders(filteredOrders);
    };

    const handleStatus = (event) => {
        const selectedStatus = event.target.value;
        setStatusOrder(selectedStatus);

        const filteredOrders = selectedStatus
            ? initialOrders.filter((order) => order.status === selectedStatus)
            : initialOrders;

        setOrders(filteredOrders);
    };

    const deleteOrder = async (id) => {
        try {
            await api.delete(`/api/orders/${id}`);
            setOrders((prev) => prev.filter((order) => order.id !== id));
            setMessage("Ordem de serviço excluída com sucesso");
        } catch (err) {
            setErrorMessage(
                `Erro ao excluir ordem de serviço ${id}: ${err.message}`
            );
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentOrders = orders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const totalCost = orders.reduce(
        (sum, order) => sum + (order.price || 0),
        0
    );

    return (
        <Main>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ordens de Serviço
                </Typography>

                {message && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        <AlertTitle>Sucesso!</AlertTitle>
                        {message}
                    </Alert>
                )}

                {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <AlertTitle>Erro!</AlertTitle>
                        {errorMessage}
                    </Alert>
                )}

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Filtrar ordens de serviço por uma data ou um período
                </Typography>

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    <TextField
                        label="Data de início"
                        type="date"
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        label="Prazo final"
                        type="date"
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        Buscar
                    </Button>
                </div>

                {(searchStartDate || searchEndDate) && (
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Filtrando por:{" "}
                        {searchStartDate &&
                            `Data de início: ${moment(searchStartDate).format(
                                "DD/MM/YYYY"
                            )}`}
                        {searchStartDate && searchEndDate && " e "}
                        {searchEndDate &&
                            `Prazo final: ${moment(searchEndDate).format(
                                "DD/MM/YYYY"
                            )}`}
                    </Typography>
                )}

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Status da ordem de serviço
                </Typography>
                <Select
                    labelId="statusOrder-label"
                    id="statusOrder"
                    value={statusOrder}
                    onChange={handleStatus}
                    fullWidth
                >
                    <MenuItem value="default" disabled>
                        Selecione uma opção
                    </MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                </Select>

                {loading ? (
                    <CircularProgress
                        sx={{ display: "block", mx: "auto", my: 3 }}
                    />
                ) : (
                    <>
                        <Typography variant="body1" sx={{ mt: 4 }}>
                            Custo Total:{" "}
                            {totalCost.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Typography>
                        <Table
                            sx={{ borderCollapse: "collapse", width: "100%" }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        ID
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Descrição
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Data Início
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Data Final
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Estado
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Ações
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentOrders.length > 0 ? (
                                    currentOrders.map((order) => (
                                        <TableRow
                                            key={order.id}
                                            hover
                                            sx={{ backgroundColor: "#f9f9f9" }}
                                        >
                                            <TableCell>{order.id}</TableCell>
                                            <TableCell>
                                                {order.description}
                                            </TableCell>
                                            <TableCell>
                                                <Moment format="DD/MM/YYYY">
                                                    {order.startDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell>
                                                <Moment format="DD/MM/YYYY">
                                                    {order.endDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell>
                                                {order.status}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    size="small"
                                                    onClick={() =>
                                                        deleteOrder(order.id)
                                                    }
                                                    startIcon={<DeleteIcon />}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Deletar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    component={Link}
                                                    to={`/orders/edit/${order.id}`}
                                                    startIcon={<EditIcon />}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    size="small"
                                                    component={Link}
                                                    to={`/orders/detail/${order.id}`}
                                                    startIcon={<InfoIcon />}
                                                >
                                                    Detalhes
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Nenhuma ordem de serviço encontrada.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={orders.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Linhas por página:"
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} de ${
                                    count !== -1 ? count : `mais de ${to}`
                                }`
                            }
                        />
                    </>
                )}
            </Container>
        </Main>
    );
};

export default withRouter(OrderTable);
