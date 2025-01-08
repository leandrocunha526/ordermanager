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
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Info as InfoIcon,
} from "@mui/icons-material";
import { Main, Container } from "./../../styles/global";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [initialOrders, setInitialOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Página atual
    const [rowsPerPage, setRowsPerPage] = useState(10); // Número de linhas por página

    useEffect(() => {
        api.get("/api/orders/list")
        .then((res) => {
            const orders = res.data;
            setOrders(orders);
            setInitialOrders(orders);
        })
        .catch((error) => {
            console.error(error);
            setErrorMessage("Erro ao carregar ordens de serviço.");
        })
        .finally(() => setLoading(false));
    }, []);

    const handleSearch = (event) => {
        const date = event.target.value;
        setSearchDate(date);

        if (!date) {
            setOrders(initialOrders);
            return;
        }

        const filteredOrders = initialOrders.filter((order) =>
        order.startDate.startsWith(date)
        );

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

    // Controle da mudança de página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Controle de mudança no número de linhas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Dados da página atual
    const currentOrders = orders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
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

        {/* Campo de busca por data */}
        <TextField
        label="Buscar por data de início"
        type="date"
        value={searchDate}
        onChange={handleSearch}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
        />

        {/* Indicador de carregamento */}
        {loading ? (
            <CircularProgress
            sx={{ display: "block", mx: "auto", my: 3 }}
            />
        ) : (
            <>
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
                <TableCell colSpan={5} align="center">
                Nenhuma ordem de serviço
                encontrada.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
            </Table>

            {/* Controle de paginação */}
            <TablePagination
            component="div"
            count={orders.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página:"
            />
            </>
        )}
        </Container>
        </Main>
    );
};

export default withRouter(OrderTable);
