import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GroupService from "../../../services/groupDevice.services";
import { toast } from "react-toastify";
import getEmail from "@/services/auth/auth.email.js";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";


const FormValidationSchema = yup
    .object({
        name: yup.string().required("Le nom du groupe est requis"),

    })
    .required();
export default function GroupDeviceForm({ visible, onClose }) {

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    // État local pour stocker les valeurs du formulaire
    const [values, setValues] = useState({ name: "", email: getEmail() });

    // Fonction pour gérer la fermeture du formulaire
    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    // Fonction pour soumettre le formulaire
    async function submit() {

        // Appel à GroupService pour ajouter un groupe de dispositifs
        await GroupService.addDeviceGroup(values)
            .then((response) => {
                if (response.status === 200) {
                    reset()
                    onClose(); // Fermer le formulaire après soumission réussie
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Erreur", {
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
            });
    }

    // Si le formulaire n'est pas visible, retourner null
    if (!visible) return null;

    return (
        <div
            onClick={handleClose}
            id="container"
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl"
        >
            <Card title="Ajouter un groupe">
                <form onSubmit={handleSubmit(submit)}>
                    <div
                        className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                    >
                        <Textinput
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    name: e.target.value,
                                })
                            }
                            name="name"
                            register={register}
                            error={errors.name}
                            label="Nom du groupe"
                            type="text"
                            placeholder="Ajouter un nom de groupe"
                        />
                    </div>
                    <div className="ltr:text-right rtl:text-left">
                        <Button type="submit" text="Soumettre" className="btn-dark" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
