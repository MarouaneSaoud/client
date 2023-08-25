import React, {useState} from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "../../../components/ui/Card";
import Radio from "../../../components/ui/Radio";

const FormValidationSchema = yup
    .object({
        filename: yup.string().required(),
        apn: yup.string().required(),
        serverip: yup
            .string()
            .required()
            .matches(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP Address format"),
        port: yup
            .number()
            .required("The Number between field is required")
            .positive()
            .min(1)
            .max(9999),

        sms: yup.number().required("The Sms field is required").positive().min(6).max(16),
        pStop: yup.number().required("The pStop field is required").positive().min(6).max(20),
        sendingInterval: yup.number().required("The Sending Interval field is required").positive().min(6).max(120),
        angle: yup.number().required("The Angle field is required").positive().min(6).max(360),
    })
    .required();

const Config = () => {
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

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Card title="Configuration form">
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
                    placeholder="Enter Port Number between 1 & 9999"
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
                    placeholder="Enter minimum 6 and maximum 16 numbers"
                    name="sms"
                    register={register}
                    error={errors.sms}
                />
                <div class="fromGroup">
                    <label className="block capitalize form-label  ">Operating Mode</label>
                    <div class="relative mt-4">
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
                    placeholder="Enter Your P.stop between (1-20)"
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
                <div class="fromGroup">
                    <label className="block capitalize form-label  ">S.D.M</label>
                    <div class="relative mt-4">
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

export default Config;
