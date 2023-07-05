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
        title: "Company info",
    },
    {
        id: 3,
        title: "Address",
    },
    {
        id: 4,
        title: "Social Links",
    },
];

let stepSchema = yup.object().shape({
    serialnumber: yup.string().required(" User serial number is required"),
    Emei: yup.string().required("Emei is required"),

});

let personalSchema = yup.object().shape({
    fname: yup.string().required("Name is required"),

});
let addressSchema = yup.object().shape({
    address: yup.string().required(" Address is required"),
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
    const furits = [
        { value: "numotronic", label: "numotronic" },
        { value: "fotaweb", label: "fotaweb" },

    ];
    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };
    return (
        <div>
            <Card title="Vertical">
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
                                            label="Emei"
                                            type="number"
                                            placeholder="Type your Emei"
                                            name="Emei"
                                            error={errors.Emei}
                                            register={register}
                                        />
                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                                Reference
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={furits[0]}
                                                styles={styles}
                                                name="clear"
                                                options={furits}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}

                            {stepNumber === 1 && (
                                <div>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                        <div className="md:col-span-2 col-span-1">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Enter Your Company info
                                            </h4>
                                        </div>
                                        <Textinput
                                            label="Name"
                                            type="text"
                                            placeholder="Type your company name"
                                            name="fname"
                                            error={errors.fname}
                                            register={register}
                                        />
                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                                device
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={furits[0]}
                                                styles={styles}
                                                name="clear"
                                                options={furits}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}
                            {stepNumber === 2 && (
                                <div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Enter Your Address
                                            </h4>
                                        </div>
                                        <Textarea
                                            label="Address"
                                            type="text"
                                            placeholder="Write Address"
                                            name="address"
                                            error={errors.address}
                                            register={register}
                                        />
                                    </div>
                                </div>
                            )}
                            {stepNumber === 3 && (
                                <div>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                        <div className="lg:col-span-3 md:col-span-2 col-span-1">
                                            <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                                                Enter Your Address
                                            </h4>
                                        </div>
                                        <Textinput
                                            label="Facebook"
                                            type="text"
                                            placeholder="https://www.facebook.com/profile"
                                            name="fburl"
                                            error={errors.fburl}
                                            register={register}
                                        />
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
