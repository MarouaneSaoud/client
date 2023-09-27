import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "../../../components/ui/Card";
import Radio from "../../../components/ui/Radio";
import { useNavigate } from "react-router-dom";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";

const FormValidationSchema = yup.object({
    filename: yup.string().required("Le champ Nom de fichier est requis."),
    apn: yup.string().test(
        "is-apn",
        "Le format de l'APN doit être de la forme www.example.com.",
        function (value) {
            if (value && value !== "") {
                return /^www\..+\..+$/.test(value);
            }
            return true; // La validation passe si le champ est vide ou non fourni.
        }
    ),
    serverip: yup.string()
        .required("Le champ Serveur IP est requis.")
        .matches(
            /^(\d{1,3}\.){3}\d{1,3}$/,
            "Format d'adresse IP invalide."
        ),
    port: yup.number()
        .required("Le champ Port est requis.")
        .positive("Le nombre doit être positif.")
        .min(1, "Le numéro doit être supérieur ou égal à 1.")
        .max(65535, "Le numéro doit être inférieur ou égal à 65535."),
    sms: yup.number().required("Le champ Réponse SMS est requis."),
    pStop: yup.number()
        .required("Le champ P.Stop est requis.")
        .positive("Le nombre doit être positif.")
        .min(0, "Le nombre doit être supérieur ou égal à 0.")
        .max(20, "Le nombre doit être inférieur ou égal à 20."),
    sendingInterval: yup.number()
        .required("Le champ Intervalle d'envoi est requis.")
        .positive("Le nombre doit être positif.")
        .min(6, "Le nombre doit être supérieur ou égal à 6.")
        .max(120, "Le nombre doit être inférieur ou égal à 120."),
    angle: yup.number()
        .required("Le champ Angle est requis.")
        .positive("Le nombre doit être positif.")
        .min(6, "Le nombre doit être supérieur ou égal à 6.")
        .max(360, "Le nombre doit être inférieur ou égal à 360."),
    wifiPassword: yup.string()
        .required("Le champ Mot de passe WiFi est requis.")
        .matches(/^.{8,}$/, "Doit contenir au moins 8 caractères."),
    smsPassword: yup.string()
        .required("Le champ Mot de passe SMS est requis.")
        .matches(/^\d{6}$/, "Le mot de passe SMS doit contenir exactement 6 chiffres."),
}).required();



const ConfigForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndToken = () => {
            if (whoAuth.isCurrentUserClient() || whoAuth.isCurrentUserAdmin()) {
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

    const [selectoperatingMode, setSelectoperatingMode] = useState("0");
    const handleoperatingMode = (e) => {
        setSelectoperatingMode(e.target.value);
    };

    const [selectsdm, setSelectsdm] = useState("0");
    const handlesdm = (e) => {
        setSelectsdm(e.target.value);
    };

    const operatingMode = [
        {
            value: "0",
            label: "GPRS SMS",
            activeClass: "ring-success-500 border-success-500",
        },
        {
            value: "1",
            label: "SMS uniquement",
            activeClass: "ring-success-500 border-success-500",
        },
    ];

    const sdm = [
        {
            value: "0",
            label: "ACC",
            activeClass: "ring-success-500 border-success-500",
        },
        {
            value: "1",
            label: "GPS",
            activeClass: "ring-success-500 border-success-500",
        },
        {
            value: "2",
            label: "TOUJOURS",
            activeClass: "ring-success-500 border-success-500",
        },
    ];

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    const generateFileContent = (data) => {
        const content = `serverIp: ${data.serverip} 
port: ${data.port}
apn: ${data.apn}
smsResponse: ${data.sms}
mode: ${selectoperatingMode}
pStop: ${data.pStop}
sendingInterval: ${data.sendingInterval}
angle: ${data.angle}
sdm: ${selectsdm}
wifiPassword: ${data.wifiPassword}
smsPassword: ${data.smsPassword}`;

        return content;
    };

    const onSubmit = (data) => {
        const content = generateFileContent(data);

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${data.filename}.ini`;
        link.click();
    };

    return (
        <Card title="Configuration">
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:grid-cols-2 grid gap-5 grid-cols-1"
                >
                    <Textinput
                        label="Nom de fichier"
                        type="text"
                        placeholder="Entrez votre nom de fichier"
                        name="filename"
                        register={register}
                        error={errors.filename}
                    />
                    <Textinput
                        label="Serveur IP"
                        type="text"
                        placeholder="Entrez votre adresse IP du serveur"
                        name="serverip"
                        register={register}
                        error={errors.serverip}
                    />
                    <Textinput
                        label="Port"
                        type="number"
                        placeholder="Entrez le numéro de port entre 1 et 65535"
                        name="port"
                        register={register}
                        error={errors.port}
                    />
                    <Textinput
                        label="APN"
                        type="text"
                        placeholder="Entrez votre APN"
                        name="apn"
                        register={register}
                        error={errors.apn}
                    />
                    <Textinput
                        label="Numéro telephone"
                        type="number"
                        placeholder="Entrez la réponse SMS"
                        name="sms"
                        register={register}
                        error={errors.sms}
                    />
                    <div className="fromGroup">
                        <label className="block capitalize form-label">
                            Mode de fonctionnement
                        </label>
                        <div className="relative mt-4">
                            <div className="flex flex-wrap space-xy-5">
                                {operatingMode.map((mode) => (
                                    <Radio
                                        label={mode.label}
                                        name="color"
                                        value={mode.value}
                                        checked={selectoperatingMode === mode.value}
                                        onChange={handleoperatingMode}
                                        activeClass={mode.activeClass}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Textinput
                        label="P.Stop"
                        type="number"
                        placeholder="Entrez votre P.Stop entre (0-20)"
                        name="pStop"
                        register={register}
                        error={errors.pStop}
                    />
                    <Textinput
                        label="Intervalle d'envoi"
                        type="number"
                        placeholder="Écrivez votre intervalle d'envoi entre (6-120)"
                        name="sendingInterval"
                        register={register}
                        error={errors.sendingInterval}
                    />
                    <Textinput
                        label="Angle"
                        type="number"
                        placeholder="Écrivez votre angle entre (6-360)"
                        name="angle"
                        register={register}
                        error={errors.angle}
                    />
                    <div className="fromGroup">
                        <label className="block capitalize form-label">S.D.M</label>
                        <div className="relative mt-4">
                            <div className="flex flex-wrap space-xy-5">
                                {sdm.map((mode) => (
                                    <Radio
                                        label={mode.label}
                                        name="color"
                                        value={mode.value}
                                        checked={selectsdm === mode.value}
                                        onChange={handlesdm}
                                        activeClass={mode.activeClass}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Textinput
                        label="Mot de passe WiFi"
                        type="text"
                        placeholder="Entrez votre mot de passe WiFi"
                        name="wifiPassword"
                        register={register}
                        error={errors.wifiPassword}
                    />
                    <Textinput
                        label="Mot de passe SMS"
                        type="text"
                        placeholder="Entrez votre mot de passe SMS"
                        name="smsPassword"
                        register={register}
                        error={errors.smsPassword}
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

export default ConfigForm;
