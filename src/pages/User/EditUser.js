import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Form } from "./styles/EditUser";

const EditUser = (props) => {

    return (
      <main>
        <Container>
          <Form>
            <h1>Editar usuário</h1>
            <label>Nome</label>
            <input
              type="text"
              name="name"
            />

           <label>Nome de usuário</label>
            <input
              type="text"
              name="username"
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
            />

            <label>Senha</label>
            <input
              type="password"
              name="password"
            />

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(EditUser);
