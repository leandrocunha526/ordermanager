import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/ProviderFormStyle";
import { useForm } from "react-hook-form";

const EditUser = (props) => {

    const {id} = useParams();

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({});

    useEffect(() => {
      api.get(`/api/providers/${id}`).then((result) => {
        setValue("id", result.data.id);
        setValue("corporateName", result.data.corporateName);
        setValue("cnpj", result.data.cnpj);
        setValue("email", result.data.email);
        setValue("phone", result.data.phone);
        setValue("street", result.data.street);
        setValue("city", result.data.city);
        setValue("district", result.data.district);
        setValue("state", result.data.state);
        setValue("country", result.data.country);
        setValue("zipcode", result.data.zipcode);
      });
    });

    const onSubmit = (data) => {
      api.put(`/api/providers/edit/${id}`, data).then(() => {
        props.history.push("/provider/list");
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <main>
        <Container>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <h1>Editar fornecedor</h1>
            <label>Razão social</label>
          <input
            type="text"
            placeholder="Razão social"
            id="corporateName"
            {...register("corporateName", { required: true })}
          />
          {errors.corporateName && errors.corporateName.type === "required" && <span>Razão social é um campo obrigatório</span>}

          <label>CPNJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            id="cpnj"
            {...register("cnpj", { required: true })}
          />
          {errors.cnpj && errors.cnpj.type === "required" && <span>CNPJ é um campo obrigatório</span>}

          <label>E-mail</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && <span>Email é um campo obrigatório</span>}

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            id="phone"
            {...register("phone", { required: true })}
          />
          {errors.phone && errors.phone.type === "required" && <span>Telefone é um campo obrigatório</span>}

          <label>Rua</label>
          <input
            type="text"
            placeholder="Rua"
            id="street"
            {...register("street", { required: true })}
          />
          {errors.street && errors.street.type === "required" && <span>Rua é um campo obrigatório</span>}

          <label>Cidade</label>
          <input
            type="text"
            placeholder="Cidade"
            id="city"
            {...register("city", { required: true })}
          />
          {errors.city && errors.city.type === "required" && <span>Cidade é um campo obrigatório</span>}

          <label>Bairro</label>
          <input
            type="text"
            placeholder="Bairro"
            id="district"
            {...register("district", { required: true })}
          />
          {errors.district && errors.district.type === "required" && <span>Bairro é um campo obrigatório</span>}

          <label>Estado</label>
          <input
            type="text"
            placeholder="Estado"
            id="state"
            {...register("state", { required: true })}
          />
          {errors.state && errors.state.type === "required" && <span>Estado é um campo obrigatório</span>}

          <label>País</label>
          <input
            type="text"
            placeholder="País"
            id="country"
            {...register("country", { required: true })}
          />
          {errors.country && errors.country.type === "required" && <span>País é um campo obrigatório</span>}

          <label>CEP</label>
          <input
            type="number"
            placeholder="CEP"
            id="zipcode"
            {...register("zipcode", { required: true })}
          />
          {errors.zipcode && errors.zipcode.type === "required" && <span>CEP é um campo obrigatório</span>}

            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
}

export default withRouter(EditUser);
