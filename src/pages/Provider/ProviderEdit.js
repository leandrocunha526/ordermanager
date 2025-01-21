import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter, useParams } from "react-router-dom";
import { Container, Form } from "./styles/ProviderFormStyle";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditUser = (props) => {
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const zipcode = watch("zipcode");

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
            setValue("establishmentNumber", result.data.establishmentNumber);
        });
    }, [id, setValue]);

    useEffect(() => {
        const fetchAddressByZipcode = async () => {
            if (zipcode && zipcode.length === 8) {
                try {
                    const { data } = await axios.get(
                        `https://viacep.com.br/ws/${zipcode}/json/`
                    );
                    if (!data.erro) {
                        setValue("street", data.logradouro || "");
                        setValue("district", data.bairro || "");
                        setValue("city", data.localidade || "");
                        setValue("state", data.uf || "");
                        setValue("country", "Brasil");
                    }
                } catch (error) {
                    console.error("Erro ao buscar o endereço pelo CEP:", error);
                }
            }
        };

        fetchAddressByZipcode();
    }, [zipcode, setValue]);

    const onSubmit = (data) => {
        api.put(`/api/providers/edit/${id}`, data)
            .then(() => {
                props.history.push("/provider/list");
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao salvar os dados. Tente novamente.");
            });
    };

    return (
        <main>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Editar fornecedor</h1>

                    <label>Razão social</label>
                    <input
                        type="text"
                        placeholder="Razão social"
                        id="corporateName"
                        {...register("corporateName", { required: true })}
                    />
                    {errors.corporateName && (
                        <span style={{ color: "red" }}>
                            Razão social é um campo obrigatório
                        </span>
                    )}

                    <label>CNPJ</label>
                    <input
                        type="text"
                        placeholder="CNPJ"
                        id="cnpj"
                        {...register("cnpj", { required: true })}
                    />
                    {errors.cnpj && (
                        <span style={{ color: "red" }}>
                            CNPJ é um campo obrigatório
                        </span>
                    )}

                    <label>E-mail</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <span style={{ color: "red" }}>
                            Email é um campo obrigatório
                        </span>
                    )}

                    <label>Telefone</label>
                    <input
                        type="text"
                        placeholder="Telefone"
                        id="phone"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                        <span style={{ color: "red" }}>
                            Telefone é um campo obrigatório
                        </span>
                    )}

                    <label>CEP</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        id="zipcode"
                        maxLength="8"
                        {...register("zipcode", {
                            required: true,
                            pattern: {
                                value: /^\d{8}$/,
                                message: "CEP inválido. Digite apenas números.",
                            },
                        })}
                    />
                    {errors.zipcode && (
                        <span style={{ color: "red" }}>
                            {errors.zipcode.message ||
                                "CEP é um campo obrigatório"}
                        </span>
                    )}

                    <label>Rua</label>
                    <input
                        type="text"
                        placeholder="Rua"
                        id="street"
                        {...register("street", { required: true })}
                    />
                    {errors.street && (
                        <span style={{ color: "red" }}>
                            Rua é um campo obrigatório
                        </span>
                    )}

                    <label>Cidade</label>
                    <input
                        type="text"
                        placeholder="Cidade"
                        id="city"
                        {...register("city", { required: true })}
                    />
                    {errors.city && (
                        <span style={{ color: "red" }}>
                            Cidade é um campo obrigatório
                        </span>
                    )}

                    <label>Bairro</label>
                    <input
                        type="text"
                        placeholder="Bairro"
                        id="district"
                        {...register("district", { required: true })}
                    />
                    {errors.district && (
                        <span style={{ color: "red" }}>
                            Bairro é um campo obrigatório
                        </span>
                    )}

                    <label>Estado</label>
                    <input
                        type="text"
                        placeholder="Estado"
                        id="state"
                        {...register("state", { required: true })}
                    />
                    {errors.state && (
                        <span style={{ color: "red" }}>
                            Estado é um campo obrigatório
                        </span>
                    )}

                    <label>País</label>
                    <input
                        type="text"
                        placeholder="País"
                        id="country"
                        {...register("country", { required: true })}
                    />
                    {errors.country && (
                        <span style={{ color: "red" }}>
                            País é um campo obrigatório
                        </span>
                    )}

                    <label>Número do estabelecimento</label>
                    <input
                        type="text"
                        placeholder="Número do estabelecimento"
                        id="establishmentNumber"
                        {...register("establishmentNumber", { required: true })}
                    />
                    {errors.establishmentNumber && (
                        <span style={{ color: "red" }}>
                            Número do estabelecimento é um campo obrigatório
                        </span>
                    )}

                    <button type="submit">Enviar</button>
                </Form>
            </Container>
        </main>
    );
};

export default withRouter(EditUser);
