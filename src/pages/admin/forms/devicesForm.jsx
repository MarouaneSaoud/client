import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Card from "../../../components/ui/Card";
import Button from "@/components/ui/Button.jsx";
import ReferenceForm from "@/pages/admin/model/referenceForm.jsx";
import { toast, ToastContainer } from "react-toastify";
import ReferenceService from "../../../services/reference.services";
import DeviceService from "../../../services/device.services";
import Papa from "papaparse";
import Fileinput from "@/components/ui/Fileinput.jsx";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { useNavigate } from "react-router-dom";

const FormValidationSchema = yup
    .object({
        serialNum: yup.string().required("Le numéro de série de l'utilisateur est requis"),
        imei: yup.string().required("IMEI est requis"),
        description: yup.string().required("La description est requise"),
    })
    .required();

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const devicesForm = () => {
    const [values, setValues] = useState({ serialNum: 0, imei: 0, reference: 0, description: "" });

    // Charger les références depuis la base de données
    const [ref, setReference] = useState([]);

    async function getReferences() {
        await ReferenceService.allReference()
            .then((response) => {
                const data = response.data;
                setReference(data.map((item) => ({ value: item.id, label: item.name })));
            })
            .catch((error) => {});
    }

    useEffect(() => {
        getReferences();
    }, []);

    useEffect(() => {
        const checkUserAndToken = () => {
            if (whoAuth.isCurrentUserManager()) {
                navigate("/403");
            }

            const storedToken = localStorage.getItem("accessToken");

            if (storedToken) {
                const isExpired = authTokenExpired;

                if (isExpired) {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        };

        checkUserAndToken();

        const intervalId = setInterval(checkUserAndToken, 2 * 60 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Charger un fichier de périphérique à partir d'un fichier CSV
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        // Vérifier si le fichier sélectionné est un fichier CSV
        if (file.name.endsWith(".csv")) {
            setSelectedFile(file);
            let totalDevices = 0;
            let successCounter = 0;
            const failedDevices = [];

            Papa.parse(file, {
                complete: async (result) => {
                    const devicesFromCSV = result.data; // Ignorer la ligne d'en-tête si elle est présente
                    // En supposant que les colonnes CSV sont dans l'ordre : serialNum, imei, reference, description
                    totalDevices = devicesFromCSV.length;

                    for (const device of devicesFromCSV) {
                        const referenceName = device.reference.replace(/^"|"$/g, "");
                        const reference = ref.find((r) => r.label === referenceName);
                        const formattedDevice = {
                            serialNum: device.serialNum,
                            imei: device.imei,
                            reference: reference.value,
                            description: device.description,
                        };

                        await DeviceService.addDevice(formattedDevice)
                            .then((response) => {
                                console.log("Périphérique ajouté avec succès !", response.data);
                                successCounter++;
                            })
                            .catch((error) => {
                                console.error("Erreur lors de l'ajout du périphérique :", error);
                                failedDevices.push(formattedDevice);
                            });
                    }
                    if (successCounter === totalDevices) {
                        console.log("Toutes les données ont été enregistrées avec succès !");
                        // Afficher une notification de réussite ou effectuer toute autre mise à jour de l'interface utilisateur
                        toast.success("Tous les périphériques ont été ajoutés", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.warning("Certains périphériques n'ont pas été ajoutés !", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        // Afficher une notification d'avertissement ou d'erreur pour le succès partiel ou effectuer toute autre mise à jour de l'interface utilisateur
                        const csvString = Papa.unparse(failedDevices, {
                            quotes: true, // Encadrer les valeurs entre guillemets
                            delimiter: ",", // Utiliser la virgule comme séparateur
                            header: true, // Inclure une ligne d'en-tête avec les noms de colonnes
                        });
                        // Créer un fichier blob à partir de la chaîne CSV
                        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
                        // Créer un objet URL pour le fichier blob
                        const url = URL.createObjectURL(blob);
                        // Créer un lien pour le téléchargement
                        const link = document.createElement("a");
                        link.setAttribute("href", url);
                        link.setAttribute("download", "devices_non_ajoutés.csv");

                        document.body.appendChild(link);
                        // Déclencher le téléchargement
                        link.click();
                        // Nettoyer l'objet URL
                        URL.revokeObjectURL(url);
                    }
                },
                header: true, // Définir sur true si le fichier CSV a une ligne d'en-tête
                skipEmptyLines: true,
            });
        } else {
            toast.error("Veuillez choisir un fichier CSV !", {
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
    };

    // Enregistrer un périphérique manuellement depuis le formulaire
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();
        await DeviceService.addDevice(values)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Périphérique ajouté", {
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
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Erreur !", {
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

    const [showMyModal, setShowMyModal] = useState(false);

    const handleOnClose = () => {
        setShowMyModal(false);
        getReferences();
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (whoAuth.isCurrentUserManager()) {
            navigate("/403");
        }
        const storedToken = localStorage.getItem("accessToken");

        if (storedToken) {
            const isExpired = authTokenExpired;

            if (isExpired) {
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    });

    const handleDownload = () => {
        const csvData = Papa.unparse(
            [{ serialNum: "", imei: "", reference: "", description: "" }],
            {
                quotes: true,
                delimiter: ",",
                header: true,
            }
        );

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "exemple_fichier_csv.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <>
            <ToastContainer />
            <Card title="Ajouter des périphériques">
                <h4>Télécharger automatiquement des périphériques</h4>
                <div className="my-8">
                    <Fileinput selectedFile={selectedFile} name="basic" onChange={handleFileUpload} />
                    <Button
                        onClick={handleDownload}
                        icon="heroicons-outline:newspaper"
                        className="btn btn-dark  rounded-[999px] bg-black-900 mt-6"
                    />
                    Télécharger le fichier CSV d'exemple
                </div>

                <div>
                    <h4>Uploader manuellement des périphériques</h4>
                    <form onSubmit={submitHandler} className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
                        <Textinput
                            label="Numéro de série"
                            type="number"
                            placeholder="Saisissez votre numéro de série"
                            name="serialNum"
                            error={errors.serialNum}
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="IMEI"
                            type="number"
                            placeholder="Saisissez votre IMEI"
                            name="imei"
                            error={errors.imei}
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div className="grid grid-cols-5">
                            <div className="col-span-4">
                                <label htmlFor=" hh2" className="form-label">
                                    Référence
                                </label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    styles={styles}
                                    options={ref}
                                    isClearable
                                    id="reference"
                                    register={register}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            reference: e.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="top-2.5 m-7">
                                    <Button
                                        onClick={() => setShowMyModal(true)}
                                        icon="heroicons-outline:plus"
                                        className="btn btn-dark  rounded-[999px] bg-black-900"
                                    />
                                </div>
                            </div>
                        </div>
                        <Textinput
                            label="Description"
                            type="text"
                            placeholder="Description"
                            name="description"
                            error={errors.description}
                            register={register}
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

            <ReferenceForm onClose={handleOnClose} visible={showMyModal} />
        </>
    );
};

export default devicesForm;
