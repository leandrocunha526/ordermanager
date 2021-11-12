import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import api from "./../../services/api";
import { Form, Container } from "./styles/MachineFormStyle";
import { useForm } from "react-hook-form";

const MachineEdit = (props) => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [modelsmachine, setModels] = useState([]);

  useEffect(() => {
    api.get(`/api/machines/${id}`).then((result) => {
      setValue("id", result.data.id);
      setValue("registerCode", result.data.registerCode);
      setValue("serialNumber", result.data.serialNumber);
      setValue("type", result.data.type);
      setValue("modelMachineId", result.data.modelMachineId);
      setValue("implement", result.data.implement);
      setValue("year", result.data.year);
      setValue("acquisitionDate", result.data.acquisitionDate);
    });
  });

  useEffect(() => {
    api.get("/api/modelsmachine/list").then(({ data }) => {
      setModels(data);
    });
  }, []);

  const onSubmit = (data) => {
    api
      .put(`/api/machines/edit/${id}`, data)
      .then(() => {
        props.history.push("/machine/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar modelo</h1>

          <label>Código de registro (Id Agro)</label>
          <input
            type="text"
            id="registerCode"
            name="registerCode"
            {...register("registerCode", { required: true })}
          />
          {errors.registerCode && errors.registerCode.type === "required" && (
            <span>Código de registro é um campo obrigatório</span>
          )}

          <label>Número de serial (chassi)</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            {...register("serialNumber", { required: true })}
          />
          {errors.serialNumber && errors.serialNumber.type === "required" && (
            <span>Número de serial é um campo obrigatório</span>
          )}

          <label>Tipo da máquina</label>
          <input
            type="text"
            id="type"
            name="type"
            {...register("type", { required: true })}
          />
          {errors.type && errors.type.type === "required" && (
            <span>Tipo da máquina é um campo obrigatório</span>
          )}

          <label>Implemento</label>
          <input
            type="text"
            id="implement"
            name="implement"
            {...register("implement", { required: true })}
          />
          {errors.implement && errors.implement.type === "required" && (
            <span>Implemento da máquina é um campo obrigatório</span>
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

          <label>Data de aquisição</label>
          <input
            type="date"
            id="acquisitionDate"
            name="acquisitionDate"
            {...register("acquisitionDate", { required: true })}
          />
          {errors.acquisitionDate &&
            errors.acquisitionDate.type === "required" && (
              <span>Data de aquisição é um campo obrigatório</span>
            )}

          <label>Modelo</label>
          <select
            name="modelMachineId"
            id="modelMachineId"
            {...register("modelMachineId", { required: true })}
          >
            <option value="0">Selecione um modelo</option>

            {modelsmachine.map((modelmachine) => (
              <option key={modelmachine.id} value={modelmachine.id}>
                {modelmachine.description}
              </option>
            ))}
          </select>
          <button type="submit">Enviar</button>
        </Form>
      </Container>
    </main>
  );
};

export default withRouter(MachineEdit);
