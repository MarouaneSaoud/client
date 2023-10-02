import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import whoAuth from "../../../services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { toast } from "react-toastify";
import AuthService from "../../../services/auth.services";
import AuthRole from "@/services/auth/auth.role.js";

const FormValidationSchema = yup
    .object({
        password: yup.string().required("Mot de passe requis"),
        email: yup.string().email("Email invalide").required("Email requis"),
        username: yup.string().required("Nom d'utilisateur requis"),
        confirmpassword: yup
            .string()
            .required()
            .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
    })
    .required();

const FormulaireUtilisateur = () => {
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
        const verifierUtilisateurEtToken = () => {
            if (
                whoAuth.isCurrentUserManager() ||
                whoAuth.isCurrentUserClient() ||
                role === "ADMIN"
            ) {
                navigate("/403");
            }
            const storedToken = localStorage.getItem("accessToken");

            if (storedToken) {
                const estExpiré = authTokenExpired;

                if (estExpiré) {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        };

        verifierUtilisateurEtToken();

        const intervalId = setInterval(verifierUtilisateurEtToken, 2 * 60 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const [values, setValues] = useState({
        username: "",
        name: "",
        password: "",
        confirmedPassword: "",
    });

    async function soumettreFormulaire(e) {
        e.target.reset();
        e.preventDefault();

        try {
            const response = await AuthService.addUserAdmin(values);

            if (response.status === 200) {
                toast.success("Utilisateur ajouté", {
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
        <Card title={"Formulaire d'Administrateur"}>
            <div>
                <form
                    onSubmit={soumettreFormulaire}
                    className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                >
                    <Textinput
                        name="nom"
                        label="Nom d'utilisateur"
                        type="text"
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
                        name="username"
                        label="Email"
                        type="email"
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
                        name="confirmedPassword"
                        label="Confirmer le mot de passe"
                        type="password"
                        register={register}
                        error={errors.confirmpassword}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />

                    <div className="lg:col-span-2 col-span-1">
                        <div className="ltr:text-right rtl:text-left">
                            <button className="btn btn-dark  text-center">Soumettre</button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default FormulaireUtilisateur;
