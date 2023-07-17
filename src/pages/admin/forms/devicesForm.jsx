import React, {useState} from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Card from "../../../components/ui/Card";
import Button from "@/components/ui/Button.jsx";
import ReferenceForm from "@/pages/admin/forms/referenceForm.jsx";

const FormValidationSchema = yup
    .object({
        serialnumber: yup.string().required(" User serial number is required"),
        imei: yup.string().required("Emei is required"),
        description: yup.string().required("Description is required"),
    })
    .required();
const ref = [
    { value: "ref", label: "ref" },


];
const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const devicesForm = () => {
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

    const [showMyModal,setShowMyModal]=useState(false)
    const handleOnClose =()=>setShowMyModal(false)
    return (
        <>
        <Card title="Add Devices">
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                >
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

                    <div class="grid grid-cols-5">
                        <div class="col-span-4">
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
                        <div class="col-span-1">
                            <div className="top-2.5 m-7 ">
                            <Button
                                onClick={()=> setShowMyModal(true)}
                                icon="heroicons-outline:plus"
                                className="btn btn-dark  rounded-[999px] bg-black-900"
                            /></div>
                        </div>

                    </div>



                    <Textinput
                        label="Description"
                        type="text"
                        placeholder="Description"
                        name="description"
                        error={errors.description}
                        register={register}
                    />

                    <div className="lg:col-span-2 col-span-1">
                        <div className="ltr:text-right rtl:text-left">
                            <button className="btn btn-dark  text-center">Submit</button>
                        </div>
                    </div>
                </form>

            </div>
        </Card>

            <ReferenceForm onClose={handleOnClose} visible={showMyModal}/>

        </>
    );
};

export default devicesForm;