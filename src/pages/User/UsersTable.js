import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Alert,
    AlertTitle,
    Typography,
    TextField,
    Pagination,
    Button,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Main } from "./styles/UserTable";
import { Edit } from "@mui/icons-material";
import { Link, withRouter } from "react-router-dom";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("api/users/list");
            const userList = response.data;
            setUsers(userList);
            setFilteredUsers(userList);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os usuários.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query)
        );

        setSearchQuery(query);
        setFilteredUsers(filtered);
        setCurrentPage(1); // Resetar para a primeira página
    };

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
            setMessage(`Usuário ${id} foi excluído`);
        } catch (err) {
            setError(`Erro ao excluir o usuário ${id}: ${err.message}`);
        }
    };

    // Paginação: calcular os usuários exibidos na página atual
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(
        startIndex,
        startIndex + usersPerPage
    );

    return (
        <Main>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Usuários cadastrados
                </Typography>

                {message && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        <AlertTitle>Sucesso</AlertTitle>
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>Erro</AlertTitle>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Buscar usuários"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{ mb: 2 }}
                />

                {loading ? (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Carregando usuários...
                        </Typography>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <Typography
                        variant="body1"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Nenhum usuário encontrado.
                    </Typography>
                ) : (
                    <>
                        <Table
                            sx={{ borderCollapse: "collapse", width: "100%" }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Id
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Primeiro Nome
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Último Nome
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Nome de Usuário
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Deletar
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Editar
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        hover
                                        sx={{ backgroundColor: "#f9f9f9" }}
                                    >
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            <Button
                                                color="error"
                                                variant="contained"
                                                startIcon={<DeleteIcon />}
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
                                            >
                                                Deletar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/user/edit/${user.id}`}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<Edit />}
                                                >
                                                    Editar
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Pagination
                            count={Math.ceil(
                                filteredUsers.length / usersPerPage
                            )}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{ mt: 2 }}
                        />
                    </>
                )}
            </Container>
        </Main>
    );
};

export default withRouter(UsersTable);
