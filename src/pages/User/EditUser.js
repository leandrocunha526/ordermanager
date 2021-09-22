/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/EditUser";
import {useForm} from "react-hook-form";

const EditUser = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue} = useForm({});

    useEffect(() => {
      api.get(`/user/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("name", result.data.name);
        setValue("username", result.data.username);
        setValue("email", result.data.email);
        setValue("password", result.data.password);
      });
    });

    const onSubmit = (data) => {
      api.put(`/user/${id}`, data).then(() => {
        props.history.push("/users");
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <main>
        <Container>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <h1>Editar usuário</h1>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              {...register("name")}
            />

           <label>Nome de usuário</label>
            <input
              type="text"
              name="username"
              {...register("username")}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
            />

            <label>Senha</label>
            <input
              type="password"
              name="password"
              {...register("password")}
            />

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(EditUser);
