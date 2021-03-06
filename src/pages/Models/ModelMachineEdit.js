import React, {useEffect, useState} from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/ModelMachineForm";
import {useForm} from "react-hook-form";

const ModelMachineEdit = (props) => {
    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        api.get(`/api/modelsmachine/${id}`).then((result) => {
          setValue("id", result.data.id);
          setValue("description", result.data.description);
          setValue("manufacturerId", result.data.manufacturerId);
        });
      });

      useEffect(() => {
        api.get("/api/manufacturers/list").then(({ data }) => {
          setManufacturers(data);
        });
      }, []);

      const onSubmit = (data) => {
        api.put(`/api/modelsmachine/edit/${id}`, data).then(() => {
          props.history.push("/models");
        }).catch(error => {
          console.log(error)
        })
      }

      return (
        <main>
          <Container>
            <Form  onSubmit={handleSubmit(onSubmit)}>
              <h1>Editar modelo</h1>
              <label>Nome do modelo</label>
              <input
                type="text"
                id="description"
                name="description"
                {...register("description",  { required: true })}
              />
               {errors.description && errors.description.type === "required" && <span>Nome do modelo é um campo obrigatório</span>}

               <label>Fabricante</label>
               <select
                name="manufacturerId"
                id="manufacturerId"
                {...register("manufacturerId", { required: true })}
                >

                <option value="0">Selecione um fabricante</option>

                {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.description}
                </option>
                ))}
               </select>
              <button type="submit">Enviar</button>
            </Form>
          </Container>
        </main>
      );
}

export default withRouter(ModelMachineEdit);
