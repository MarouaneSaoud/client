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

const FormValidationSchema = yup.object({
    password: yup.string().required("Mot de passe requis"),
    username: yup.string().email("Email invalide").required("Email requis"),
    name: yup.string().required("Nom d'utilisateur requis"),
    confirmedPassword: yup
        .string()
        .required("Confirmation du mot de pass requis")
        .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
        .test(
            "passwords-match",
            "Les mots de passe doivent correspondre",
            async function (value) {
                return value === this.parent.password;
            }
        ),
});

const FormulaireUtilisateur = () => {
    const role = AuthRole();
    const {
        register,
        handleSubmit,
        formState: { errors },
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

    const onSubmit = async (data) => {
        try {
            const response = await AuthService.addUserAdmin(data);
            console.log(response)


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
    };

    return (
        <Card title={"Formulaire d'Administrateur"}>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                >
                    <Textinput
                        name="name"
                        label="Nom d'utilisateur"
                        type="text"
                        register={register}
                        error={errors.username}

                    />
                    <Textinput
                        name="username"
                        label="Email"
                        type="email"
                        register={register}
                        error={errors.email}

                    />
                    <Textinput
                        name="password"
                        label="Mot de passe"
                        type="password"
                        register={register}
                        error={errors.password}

                    />
                    <Textinput
                        name="confirmedPassword"
                        label="Confirmer le mot de passe"
                        type="password"
                        register={register}
                        error={errors.confirmedPassword}

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

export default FormulaireUtilisateur;
