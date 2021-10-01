import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/EditUser";
import {useForm} from "react-hook-form";

const EditUser = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    useEffect(() => {
      api.get(`/api/users/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("firstName", result.data.firstName);
        setValue("lastName", result.data.lastName);
        setValue("username", result.data.username);
        setValue("email", result.data.email);
        setValue("password", result.data.password);
      });
    });

    const onSubmit = (data) => {
      api.put(`/api/users/edit/${id}`, data).then(() => {
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
            <label>Primeiro nome</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              {...register("firstName",  { required: true })}
            />
             {errors.firstName && errors.firstName.type === "required" && <span>Primeiro nome é um campo obrigatório</span>}

            <label>Último nome</label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && errors.lastName.type === "required" && <span>Último nome é um campo obrigatório</span>}

           <label>Nome de usuário</label>
            <input
              type="text"
              name="username"
              {...register("username", { required: true })}
            />
            {errors.username && errors.username.type === "required" && <span>Nome de usuário é um campo obrigatório</span>}

            <label>Senha</label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
            />
             {errors.password && errors.password.type === "required" && <span>Senha é um campo obrigatório</span>}

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(EditUser);
