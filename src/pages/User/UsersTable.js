import React, {Component} from "react";
import api from "../../services/api";
import {withRouter, Link} from "react-router-dom";
import "./styles/UserTable.css"

class UsersTable extends Component {
    state = {
        users: [],
        error: []
    };
    componentDidMount(){
        api.get("/user/list")
        .then((res) => {
            const users = res.data;
            this.setState({users});
        })
        .catch((error) => {
            console.log(error);
        })
    }
    async delete(id){
        try {
            await api.delete(`/user/${id}`);
            alert("Usuário excluído com sucesso você será redirecionado para o dashboard")
            this.props.history.push("/dashboard");
        }catch(err){
            this.setState({
            error: "Não foi possível excluir o usuário",
        });
        }
    }
    render(){
        return (
            <main>
            <div className="usertable__container">
                <div>
                <h1>Usuários cadastrados</h1>
                </div>
                    <table>
                    {this.state.error && <p>{this.state.error}</p>}
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Deletar</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) =>
                        <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><button type="button"
                        className="button__warning"
                        onClick={() => this.delete(user.id)}
                        >Deletar</button></td>
                        <td><Link to={"/user/edit/" + user.id} className="button__primary">Editar</Link></td>
                        </tr>
                  )}
                  </tbody>
                  </table>
            </div>
            </main>
        )
    }
}

export default withRouter(UsersTable);
