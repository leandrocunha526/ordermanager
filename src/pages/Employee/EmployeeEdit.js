import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/EmployeeFormStyle";
import { useForm } from "react-hook-form";

const EmployeeEdit = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    useEffect(() => {
      api.get(`/api/employees/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("name", result.data.name);
        setValue("salary", result.data.salary);
        setValue("cpf", result.data.cpf);
        setValue("phone", result.data.phone);
        setValue("birthday", result.data.birthday);
      });
    });

    const onSubmit = (data) => {
      api.put(`/api/employees/edit/${id}`, data).then(() => {
        props.history.push("/employee/list");
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <main>
        <Container>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <h1>Editar Funcionário</h1>
            <label>Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: true })}
            />
             {errors.name && errors.name.type === "required" && <span>Nome é um campo obrigatório</span>}

             <label>Salário</label>
            <input
              type="number"
              id="salary"
              name="salary"
              {...register("salary", { required: true })}
            />
             {errors.salary && errors.salary.type === "required" && <span>Salário é um campo obrigatório</span>}


             <label>CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              {...register("cpf", { required: true })}
            />
             {errors.cpf && errors.cpf.type === "required" && <span>CPF é um campo obrigatório</span>}


             <label>Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              {...register("phone", { required: true })}
            />
             {errors.phone && errors.phone.type === "required" && <span>Telefone é um campo obrigatório</span>}

             <label>Data de nascimento</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              {...register("birthday", { required: true })}
            />
             {errors.birthday && errors.birthday.type === "required" && <span>Data de nascimento é um campo obrigatório</span>}

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(EmployeeEdit);
