import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

const steps = [
    {
        id: 1,
        title: "Mark Details",
    },
    {
        id: 2,
        title: "Sim info",
    },
    {
        id: 3,
        title: "Company info",
    },
];

let stepSchema = yup.object().shape({
    serialnumber: yup.string().required(" User serial number is required"),
    imei: yup.string().required("Emei is required"),
    description: yup.string().required("Description is required"),
    firmware: yup.string().required("Firmware is required"),
    configuration: yup.string().required("configuration is required"),

});

let personalSchema = yup.object().shape({
    iccid: yup.string().required("iccid is required"),
    imsi: yup.string().required("imsi is required"),

});
let addressSchema = yup.object().shape({
    /*address: yup.string().required(" Address is required"),*/
});


const FormWizard = () => {
    const [stepNumber, setStepNumber] = useState(0);

    // find current step schema
    let currentStepSchema;
    switch (stepNumber) {
        case 0:
            currentStepSchema = stepSchema;
            break;
        case 1:
            currentStepSchema = personalSchema;
            break;
        case 2:
            currentStepSchema = addressSchema;
            break;

        default:
            currentStepSchema = stepSchema;
    }
    useEffect(() => {
        // console.log("step number changed");
    }, [stepNumber]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(currentStepSchema),
        // keep watch on all fields
        mode: "all",
    });

    const onSubmit = (data) => {
        // next step until last step . if last step then submit form
        let totalSteps = steps.length;
        const isLastStep = stepNumber === totalSteps - 1;
        if (isLastStep) {

            console.log(data);
        } else {
            setStepNumber(stepNumber + 1);
        }
    };

    const handlePrev = () => {
        setStepNumber(stepNumber - 1);
    };
    const ref = [
        { value: "ref", label: "ref" },


    ];
    const status = [
        { value: "online", label: "online" },
        { value: "offline", label: "offline" },

    ];
    const company = [
        { value: "numotronic", label: "numotronic" },


    ];
    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };




    return (
        <div>
            <Card title="Create devices">
                <div className="grid gap-5 grid-cols-12">
                    <div className="lg:col-span-3 col-span-12">
                        <div className="flex z-[5] items-start relative flex-col lg:min-h-full md:min-h-[300px] min-h-[250px]">
                            {steps.map((item, i) => (
                                <div className="relative z-[1] flex-1 last:flex-none" key={i}>
                                    <div
                                        className={`   ${
                                            stepNumber >= i
                                                ? "bg-slate-900 text-white ring-slate-900 dark:bg-slate-900 dark:ring-slate-700  dark:ring-offset-slate-500 ring-offset-2"
                                                : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 text-opacity-70 dark:bg-slate-700 dark:ring-slate-700"
                                        } 
            transition duration-150 icon-box md:h-12 md:w-12 h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium
            `}
                                    >
                                        {stepNumber <= i ? (
                                            <span> {i + 1}</span>
                                        ) : (
                                            <span className="text-3xl">
                        <Icon icon="bx:check-double" />
                      </span>
                                        )}
                                    </div>

                                    <div
                                        className={` ${
                                            stepNumber >= i
                                                ? "bg-slate-900 dark:bg-slate-900"
                                                : "bg-[#E0EAFF] dark:bg-slate-600"
                                        } absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px]`}
                                    ></div>
                                    <div
                                        className={` ${
                                            stepNumber >= i
                                                ? " text-slate-900 dark:text-slate-300"
                                                : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                                        } absolute top-0 ltr:left-full rtl:right-full ltr:pl-4 rtl:pr-4 text-base leading-6 md:mt-3 mt-1 transition duration-150 w-full`}
                                    >
                                        <span className="w-max block">{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="conten-box lg:col-span-9 col-span-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {stepNumber === 0 && (
                                <div>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                        <div className="lg:col-span-3 md:col-span-2 col-span-1">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Provide the details of your mark
                                            </h4>
                                        </div>
                                        <Textinput
                                            label="Serial number"
                                            type="number"
                                            placeholder="Type your serial number "
                                            name="serialnumber"
                                            error={errors.serialnumber}
                                            register={register}
                                        />
                                        <Textinput
                                            label="Imei"
                                            type="number"
                                            placeholder="Type your Imei"
                                            name="imei"
                                            error={errors.imei}
                                            register={register}
                                        />

                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                                Reference
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={ref[0]}
                                                styles={styles}
                                                name="clear"
                                                options={ref}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                                Status
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={status[0]}
                                                styles={styles}
                                                name="clear"
                                                options={status}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>
                                        <Textinput
                                            label="Description"
                                            type="text"
                                            placeholder="Description"
                                            name="description"
                                            error={errors.description}
                                            register={register}
                                        />
                                        <Textinput
                                            label="Firmware"
                                            type="text"
                                            placeholder="Firmware"
                                            name="firmware"
                                            error={errors.firmware}
                                            register={register}
                                        />
                                        <Textinput
                                            label="Configuration"
                                            type="text"
                                            placeholder="Configuration"
                                            name="configuration"
                                            error={errors.configuration}
                                            register={register}
                                        />

                                    </div>
                                </div>
                            )}

                            {stepNumber === 1 && (
                                <div>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                        <div className="md:col-span-2 col-span-1">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Enter Your Sim details
                                            </h4>
                                        </div>
                                        <Textinput
                                            label="ICCID"
                                            type="number"
                                            name="iccid"
                                            placeholder="add your iccid"
                                            error={errors.iccid}
                                            register={register}
                                        />
                                        <Textinput
                                            label="IMSI"
                                            type="number"
                                            name="imsi"
                                            placeholder="add your imsi"
                                            error={errors.imsi}
                                            register={register}
                                        />

                                    </div>
                                </div>
                            )}
                            {stepNumber === 2 && (
                                <div>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                        <div className="md:col-span-2 col-span-1">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Enter Your Company info
                                            </h4>
                                        </div>
                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                                Company
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={company[0]}
                                                styles={styles}
                                                name="clear"
                                                options={company}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}


                            <div
                                className={`${
                                    stepNumber > 0 ? "flex justify-between" : " text-right"
                                } mt-10`}
                            >
                                {stepNumber !== 0 && (
                                    <Button
                                        text="prev"
                                        className="btn-dark"
                                        onClick={handlePrev}
                                    />
                                )}
                                <Button
                                    text={stepNumber !== steps.length - 1 ? "next" : "submit"}
                                    className="btn-dark"
                                    type="submit"

                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FormWizard;
