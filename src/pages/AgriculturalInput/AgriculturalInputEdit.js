import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import api from "./../../services/api";
import { Form, Container } from "./styles/AgriculturalInputForm";
import { useForm } from "react-hook-form";

const AgriculturalEdit = (props) => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [providers, setProvider] = useState([]);

  useEffect(() => {
    api.get(`/api/agriculturalinput/${id}`).then((result) => {
      setValue("id", result.data.id);
      setValue("name", result.data.name);
      setValue("providerId", result.data.providerId);
      setValue("sprayrate", result.data.sprayrate);
      setValue("quantity", result.data.quantity);
      setValue("price", result.data.price);
    });
  });

  useEffect(() => {
    api.get("/api/providers/list").then(({ data }) => {
      setProvider(data);
    });
  }, []);

  const onSubmit = (data) => {
    api
      .put(`/api/agriculturalinput/edit/${id}`, data)
      .then(() => {
        props.history.push("/agriculturalinputs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar insumo</h1>
          <label>Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" && (
            <span>Nome é um campo obrigatório</span>
          )}

          <label>Taxa de pulverização</label>
          <input
            type="text"
            id="sprayrate"
            name="sprayrate"
            {...register("sprayrate", { required: true })}
          />
          {errors.sprayrate && errors.sprayrate.type === "required" && (
            <span>Taxa de pulverização é um campo obrigatório</span>
          )}

          <label>Ano da máquina</label>
          <input
            type="number"
            id="year"
            name="year"
            {...register("year", { required: true })}
          />
          {errors.year && errors.year.type === "required" && (
            <span>Ano da máquina é um campo obrigatório</span>
          )}

          <label>Quantidade</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && errors.quantity.type === "required" && (
            <span>Quantidade é um campo obrigatório</span>
          )}

          <label>Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            {...register("price", { required: true })}
          />
          {errors.price && errors.price.type === "required" && (
            <span>Preço é um campo obrigatório</span>
          )}

          <label>Fornecedor</label>
          <select
            name="modelId"
            id="modelId"
            {...register("modelId", { required: true })}
          >
            <option value="0">Selecione um modelo</option>

            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.corporateName}
              </option>
            ))}
          </select>
          <button type="submit">Enviar</button>
        </Form>
      </Container>
    </main>
  );
};

export default withRouter(AgriculturalEdit);
