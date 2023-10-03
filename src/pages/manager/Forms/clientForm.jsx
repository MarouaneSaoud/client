import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import whoAuth from "../../../services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import AuthRole from "@/services/auth/auth.role.js";
import ClientService from "../../../services/client.services";
import getEmail from "../../../services/auth/auth.email";
import { toast } from "react-toastify";

const FormValidationSchema = yup
    .object({
        cin: yup.string().required("Numéro de carte d'identité nationale requis"),
        email: yup.string().email("Email invalide").required("Email requis"),
        password: yup.string().required("Mot de passe requis"),
        username: yup.string().required("Nom d'utilisateur requis"),
        address: yup.string().required("Adresse requise"),
        postalCode: yup.string().required("Code postal requis"),
    })
    .required();

const userForm = () => {
    const role = AuthRole();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndToken = () => {
            if (whoAuth.isCurrentUserAdmin() || whoAuth.isCurrentUserClient()) {
                navigate('/403');
            }
            const storedToken = localStorage.getItem('accessToken');

            if (storedToken) {
                const isExpired = authTokenExpired;

                if (isExpired) {
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkUserAndToken();

        const intervalId = setInterval(checkUserAndToken, 2 * 60 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const [values, setValues] = useState({
        email: "",
        password:"",
        name: "",
        cin: "",
        address: "",
        postalCode: "",
        CompanyEmail: getEmail(),
    });

    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();
        console.log(values);
        try {
            const response = await ClientService.addClient(values);
            if (response.status === 200) {
                toast.success('Client ajouté', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error("Une erreur est survenue !", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <Card title={"Formulaire Clients"}>
            <div>
                <form
                    onSubmit={submitHandler}
                    className="lg:grid-cols-2 grid gap-5 grid-cols-1"
                >
                    <Textinput
                        name="name"
                        label="Nom"
                        type="text"
                        placeholder="Ajouter votre nom d'utilisateur"
                        register={register}
                        error={errors.username}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <Textinput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Ajouter votre email"
                        register={register}
                        error={errors.email}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <Textinput
                        name="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="Mot de passe"
                        register={register}
                        error={errors.password}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }

                    />
                    <Textinput
                        name="cin"
                        label="Numéro de carte d'identité nationale"
                        type="text"
                        placeholder="Ajouter votre numéro de carte d'identité nationale"
                        register={register}
                        error={errors.cin}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <Textinput
                        name="address"
                        label="Adresse"
                        type="text"
                        placeholder="Ajouter votre adresse"
                        register={register}
                        error={errors.address}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <Textinput
                        name="postalCode"
                        label="Code postal"
                        type="number"
                        placeholder="Ajouter votre code postal"
                        register={register}
                        error={errors.postalCode}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="lg:col-span-2 col-span-1">
                        <div className="ltr:text-right rtl:text-left">
                            <button className="btn btn-dark text-center">Soumettre</button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default userForm;
