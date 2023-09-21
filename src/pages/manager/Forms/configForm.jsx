import React, {useEffect, useState} from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "../../../components/ui/Card";
import Radio from "../../../components/ui/Radio";
import {useNavigate} from "react-router-dom";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
const FormValidationSchema = yup
    .object({
        filename: yup.string().required(),
        apn: yup.string().test('is-apn', 'APN must be in the format www.example.com', function (value) {
            if (value && value !== '') {
                return /^www\..+\..+$/.test(value);
            }
            return true; // La validation passe si le champ est vide ou non fourni
        }),
        serverip: yup
            .string()
            .required()
            .matches(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP Address format"),
        port: yup
            .number()
            .required("The Number between field is required")
            .positive()
            .min(1)
            .max(65535),

        sms: yup.number().required("The Sms field is required"),
        pStop: yup.number().required("The pStop field is required").positive().min(0).max(20),
        sendingInterval: yup.number().required("The Sending Interval field is required").positive().min(6).max(120),
        angle: yup.number().required("The Angle field is required").positive().min(6).max(360),
        wifiPassword: yup.string().required("The Wifi field is required").matches(/^.{8,}$/, "Must be at least 8 characters"),

        smsPassword: yup
            .string()
            .required("The Sms Password field is required")
            .matches(/^\d{6}$/, "Sms password must be exactly 6 digits"),
    })
    .required();

const ConfigForm = () => {
    const navigate=useNavigate();

    useEffect(() => {
        const checkUserAndToken = () => {

            if (whoAuth.isCurrentUserClient()||whoAuth.isCurrentUserAdmin()) {
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
            label: "Gprs Sms",
            activeClass: "ring-success-500 border-success-500",
        },
        {
            value: "1",
            label: "Only sms",
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
            label: "ALWAYS",
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
                className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
            >
                <Textinput
                    label="File Name"
                    type="text"
                    placeholder="Type your File Name"
                    name="filename"
                    register={register}
                    error={errors.filename}
                />
                <Textinput
                    label="Server Ip"
                    type="text"
                    placeholder="Enter ur Ip server"
                    name="serverip"
                    register={register}
                    error={errors.serverip}
                />
                <Textinput
                    label="Port"
                    type="number"
                    placeholder="Enter Port Number between 1 & 65535"
                    name="port"
                    register={register}
                    error={errors.port}
                />

                <Textinput
                    label="Apn"
                    type="text"
                    placeholder="Enter your Apn"
                    name="apn"
                    register={register}
                    error={errors.apn}
                />

                <Textinput
                    label="Sms response"
                    type="number"
                    placeholder="Enter Sms response"
                    name="sms"
                    register={register}
                    error={errors.sms}
                />
                <div className="fromGroup">
                    <label className="block capitalize form-label  ">Operating Mode</label>
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
                    placeholder="Enter Your P.stop between (0-20)"
                    name="pStop"
                    register={register}
                    error={errors.pStop}
                />
                <Textinput
                    label="Sending interval"
                    type="number"
                    placeholder="Write Your sending interval between (6-120)"
                    name="sendingInterval"
                    register={register}
                    error={errors.sendingInterval}
                />
                <Textinput
                    label="Angle"
                    type="number"
                    placeholder="Write Your Angle between (6-360)"
                    name="angle"
                    register={register}
                    error={errors.angle}
                />
                <div className="fromGroup">
                    <label className="block capitalize form-label  ">S.D.M</label>
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
                    label="WIFI Password"
                    type="text"
                    placeholder="Enter Your WIFI Password"
                    name="wifiPassword"
                    register={register}
                    error={errors.wifiPassword}
                />
                <Textinput
                    label="SMS Password"
                    type="text"
                    placeholder="Enter Your SMS Password "
                    name="smsPassword"
                    register={register}
                    error={errors.smsPassword}
                />

                <div className="lg:col-span-2 col-span-1">
                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark  text-center">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        </Card>
    );
};

export default ConfigForm;
