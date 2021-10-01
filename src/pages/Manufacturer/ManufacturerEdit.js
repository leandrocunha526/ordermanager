import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/ManufacturerFormStyle";
import { useForm } from "react-hook-form";

const ManufacturerEdit = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    useEffect(() => {
      api.get(`/api/manufacturers/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("description", result.data.description);
      });
    });

    const onSubmit = (data) => {
      api.put(`/api/manufacturer/edit/${id}`, data).then(() => {
        props.history.push("/manufacturer/list");
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <main>
        <Container>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <h1>Editar Marca</h1>
            <label>Nome da marca</label>
            <input
              type="text"
              id="description"
              name="description"
              {...register("description", { required: true })}
            />
             {errors.description && errors.description.type === "required" && <span>Nome da marca é um campo obrigatório</span>}

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(ManufacturerEdit);
