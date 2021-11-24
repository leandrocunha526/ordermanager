import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { withRouter, Link } from "react-router-dom";
import "./styles/OrderTable.css";
import Moment from "react-moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [initialOrder, setInitialOrders] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
            api
                .get("/api/orders/list")
                .then((res) => {
                    const orders = res.data;
                    setOrders(orders);
                    setInitialOrders(orders);
                })
                .catch((error) => {
                    console.log(error);
                });
    }, []);

    const handleChange = ({ target }) => {
        if (!target.value) {
            setOrders(initialOrder);
            return;
        }
        const filterOrder = orders.filter(({ startDate }) =>
            startDate.includes(target.value)
        );
        setOrders(filterOrder);
    };

    async function deleteOrder(id) {
        try {
            await api.delete(`/api/orders/${id}`);
            setMessage("Ordem de serviço excluída com sucesso");
        } catch (err) {
            console.log(err);
        }
    }

    function exportar() {
        const doc = new jsPDF("p", "pt");
        autoTable(doc, { html: "#table-order" });
        doc.save("table.pdf");
    }

    return (
        <main>
            <div className="usertable__container">
                <div>

                <div className="reports">
                <button
                    type="button"
                    className="button__secundary"
                    onClick={() => exportar()}
                > Exportar dados para PDF
                </button>
                <button className="button__green">
                <CSVLink data={orders}>
                 Exportar dados para CSV
                 </CSVLink>
                </button>
                </div>

                <h1>Ordem de serviço agendadas</h1>
                </div>

                <div className="message">{message}</div>

                <label>Pesquisar data de início: </label>
                <input
                    type="date"
                    onChange={handleChange}
                />

                <table id="table-order">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descrição</th>
                            <th>Local</th>
                            <th>Data início</th>
                            <th>Data final</th>
                            <th>Preço</th>
                            <th>Máquina</th>
                            <th>Insumo</th>
                            <th>Funcionário</th>
                            <th>Estado</th>
                            <th>Deletar</th>
                            <th>Editar</th>
                            <th>Detalhe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.description}</td>
                                <td>{order.local}</td>
                                <td>
                                    <Moment format="DD/MM/YYYY">
                                        {order.startDate}
                                    </Moment>
                                </td>
                                <td>
                                    <Moment format="DD/MM/YYYY">
                                        {order.endDate}
                                    </Moment>
                                </td>
                                <td>{order.price}</td>
                                <td>{order.machines.registerCode}</td>
                                <td>{order.agriculturalInputs.name}</td>
                                <td>{order.employees.name}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="button__warning"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Deletar
                                    </button>
                                </td>
                                <td>
                                    <Link
                                        to={"/orders/edit/" + order.id}
                                        className="button__primary"
                                    >
                                        Editar
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={"/orders/detail/" + order.id}
                                        className="button__info"
                                    >
                                        Detalhe
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default withRouter(OrderTable);
