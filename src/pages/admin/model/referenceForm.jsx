import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import ReferenceService from "../../../services/reference.services.js";
import { toast } from "react-toastify";

export default function FormulaireDeReference({ visible, onClose }) {
    const [nom, setNom] = useState("");

    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    async function soumettreFormulaire(e) {
        e.target.reset();
        e.preventDefault();
        const reference = { name: nom };
        console.log(reference);
        await ReferenceService.addReference(reference)
            .then((response) => {
                if (response.status === 200) {
                    onClose();
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

    if (!visible) return null;

    return (
        <div
            onClick={handleClose}
            id="container"
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl"
        >
            <Card title="Ajouter une référence">
                <form onSubmit={soumettreFormulaire}>
                    <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0">
                        <Textinput
                            onChange={(e) => setNom(e.target.value)}
                            label="Nom"
                            type="text"
                            placeholder="Nom"
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
