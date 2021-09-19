import React, {Component} from "react";
import api from "../../services/api";
import {withRouter} from "react-router-dom";
import "./styles/UserTable.css"

class UsersTable extends Component {
    state = {
        users: [],
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
    delete(id){
        try{
            api.delete(`/user/${id}`);
        } catch (error){
            console.log(error);
        }
    }
    render(){
        return (
            <main>
            <div className="usertable__container">
                <h1>Usuários cadastrados</h1>
                    <table>
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
                        <td><button className="button__warning">Deletar</button></td>
                        <td><button className="button__primary">Editar</button></td>
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
