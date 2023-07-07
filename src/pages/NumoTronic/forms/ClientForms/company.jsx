import React, {useState} from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import Select from "react-select";
import DropZone from "@/pages/forms/file-input/DropZone.jsx";
import ReactFlagsSelect from "react-flags-select";
const FormValidationSchema = yup
    .object({
        name: yup.string().required("The name is required"),
        altName: yup.string().required("Alternative name is required"),
        address: yup.string().required("Adress is required"),
        email: yup.string().email("Email is not valid").required("Email is required"),

    })
const role = [
    { value: "Director", label: "Director" },
    { value: "restricted user", label: "restricted user" },


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



const userForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
    const [selected, setSelected] = useState("");

    const onSubmit = (data) => {
        console.log(data);
    };
    const dep = [
        { value: "ref", label: "ref" },

    ];

    return (
        <div className="xl:col-span-2 col-span-1">
            <Card title="Validation Types">
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                    >
                        <Textinput
                            label="Name"
                            type="text"
                            placeholder=" Name"
                            name="name"
                            register={register}
                            error={errors.name}
                        />
                        <Textinput
                            label="Alternative name"
                            type="text"
                            placeholder="Alternative name"
                            name="altName"
                            register={register}
                            error={errors.altName}
                        />
                        <Textinput
                            label="National Identity Card"
                            type="text"
                            placeholder="National Identity Card"
                            name="cin"
                            register={register}
                            error={errors.cin}
                        />

                        <Textinput
                            label="Address"
                            type="text"
                            placeholder="Address"
                            name="adress"
                            register={register}
                            error={errors.address}
                        />
                        <Textinput
                            label="Postal code"
                            type="text"
                            placeholder="Postal code"
                            name="adress"
                            register={register}
                            error={errors.postalCode}
                        />
                        <div>
                            <label htmlFor=" hh2" className="form-label ">
                                Departement
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={dep[0]}
                                styles={styles}
                                name="clear"
                                options={dep}
                                isClearable
                                id="hh2"
                                register={register}
                            />
                        </div>
                        <Textinput
                            label="Email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            register={register}
                            error={errors.email}
                        />
                        <Textinput
                            label="Website"
                            type="url"
                            placeholder="Website"
                            name="website"
                            register={register}
                        />
                        <Textinput
                            label="Skype"
                            type="url"
                            placeholder="Skype"
                            name="skype"
                            register={register}
                        />
                        <Textinput
                            label="Id prof (R.C)"
                            type="number"
                            placeholder="Id prof (R.C)"
                            name="rc"
                            register={register}
                        />
                        <Textinput
                            label="Id prof (I.F)"
                            type="number"
                            placeholder="Id prof (I.F)"
                            name="if"
                            register={register}
                        />
                        <Textinput
                            label="Id prof (patent)"
                            type="number"
                            placeholder="Id prof (patent)"
                            name="patent"
                            register={register}
                        />
                        <Textinput
                            label="CNSS"
                            type="number"
                            placeholder="CNSS"
                            name="cnss"
                            register={register}
                        />
                        <div >

                        </div>
                        <div className="xl:col-span-1 col-span-1">
                            <label className="block capitalize form-label  ">
                                Country
                            </label>

                            <ReactFlagsSelect
                                selectedSize={14}
                                selected={selected}
                                onSelect={(code) => console.log(setSelected(code))}
                            />
                        </div>


                        <div className="lg:col-span-2 col-span-1">
                            <div className="ltr:text-right rtl:text-left">
                                <button className="btn btn-dark  text-center">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default userForm;
