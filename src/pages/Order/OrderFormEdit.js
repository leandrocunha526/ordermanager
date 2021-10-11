import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/OrderFormStyle";
import { useForm } from "react-hook-form";

const OrderEdit = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    const [employees, setEmployee] = useState([]);
    const [modelsmachine, setModelMachine] = useState([]);
    const [agriculturalinputs, setAgriculturalInput] = useState([]);

    useEffect(() => {
      api.get(`/api/orders/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("description", result.data.description);
        setValue("local", result.data.local);
        setValue("startDate", result.data.startDate);
        setValue("endDate", result.data.endDate);
        setValue("employeeId", result.data.employeeId);
        setValue("agriculturalInputId", result.data.agriculturalInputId);
        setValue("modelsmachineId", result.data.modelsmachineId);
      });
    });

    useEffect(() => {
        api.get("/api/employee/list").then(({ data }) => {
            setEmployee(data);
        });
      }, []);

    useEffect(() => {
        api.get("/api/agriculturalinputs/list").then(({ data }) => {
            setAgriculturalInput(data);
        });
      }, []);

    useEffect(() => {
        api.get("/api/modelsmachine/list").then(({ data }) => {
            setModelMachine(data);
        });
      }, []);

    const onSubmit = (data) => {
      api.put(`/api/orders/edit/${id}`, data).then(() => {
        props.history.push("/orders/list");
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <main>
        <Container>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <h1>Editar ordem de serviço</h1>
            <label>Nome da marca</label>
            <input
              type="text"
              id="description"
              name="description"
              {...register("description", { required: true })}
            />
             {errors.description && errors.description.type === "required" && <span>Descrição é um campo obrigatório</span>}

            <label>Local</label>
            <input
              type="text"
              id="local"
              name="local"
              {...register("local", { required: true })}
            />
             {errors.local && errors.local.type === "required" && <span>Local é um campo obrigatório</span>}

            <label>Data de início</label>
            <input
              type="date"
              id="Data de início"
              name="startDate"
              {...register("startDate", { required: true })}
            />
             {errors.startDate && errors.startDate.type === "required" && <span>Data de início é um campo obrigatório</span>}

             <label>Data final</label>
            <input
              type="date"
              id="Data final"
              name="endDate"
              {...register("endDate", { required: true })}
            />
            {errors.endDate && errors.endDate.type === "required" && <span>Data final é um campo obrigatório</span>}

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

          <label>Funcionário</label>
          <select
            name="employeeId"
            id="employeeId"
            {...register("employeeId", { required: true })}
          >
            <option value="0">Selecione um funcionário</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.description}
              </option>
            ))}
          </select>

          <label>Insumo</label>
          <select
            name="agriculturalInputId"
            id="agriculturalInputId"
            {...register("agriculturalInputId", { required: true })}
          >
            <option value="0">Selecione um insumo</option>

            {agriculturalinputs.map((agriculturalinput) => (
              <option key={agriculturalinput.id} value={agriculturalinput.id}>
                {agriculturalinput.description}
              </option>
            ))}
          </select>
            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(OrderEdit);
