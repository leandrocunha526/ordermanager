import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/OrderFormStyle";
import { useForm } from "react-hook-form";

const OrderEdit = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    const [employees, setEmployee] = useState([]);
    const [machine, setMachine] = useState([]);
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
        setValue("machineId", result.data.machineId);
        setValue("price", result.data.price);
      });
    });

    useEffect(() => {
        api.get("/api/employees/list").then(({ data }) => {
            setEmployee(data);
        });
      }, []);

    useEffect(() => {
        api.get("/api/agriculturalinputs/list").then(({ data }) => {
            setAgriculturalInput(data);
        });
      }, []);

    useEffect(() => {
        api.get("/api/machines/list").then(({ data }) => {
            setMachine(data);
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
            <textarea
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

            <label>Preço</label>
            <input
              type="number"
              id="Preço"
              name="price"
              {...register("price", { required: true })}
            />
            {errors.price && errors.price.type === "required" && <span>Preço é um campo obrigatório</span>}

          <label>Código de registro da máquina no IdAgro</label>
          <select
            name="machineId"
            id="machineId"
            {...register("machineId", { required: true })}
          >
            <option value="0">Selecione uma máquina</option>

            {machine.map((machine) => (
              <option key={machine.id} value={machine.id}>
                {machine.registerCode}
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
                {employee.name}
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
                {agriculturalinput.name}
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
