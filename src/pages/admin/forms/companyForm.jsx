import React, {useState} from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card.jsx";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import CompanyService from "../../../services/company.services.js";
import {toast} from "react-toastify";
import {countryNames , department} from "@/constant/data.js";
const FormValidationSchema = yup
    .object({
        name: yup.string().required("The name is required"),
        altname: yup.string().required("Alternative name is required"),
        address: yup.string().required("Adress is required"),
        email: yup.string().email("Email is not valid").required("Email is required"),

    })
const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const userForm = () => {
    const [selected, setSelected] = useState('');

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });


    const [values, setValues] = useState({ name: "", altName: "",cin: 0, address: "",postalCode:0,dep:department[0],email:"",website:"",skype:"",idrc:0,idif:0,patent:0,cnss:0,country:"" ,logo:null});
    const handleCountrySelect = (code) => {
        setSelected(code);
        setValues({
            ...values,
            country: countryNames[code],
        });
    };
    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();
        console.log(values)
        await CompanyService.addCompany(values).then(response=>{
            if (response.status === 200) {
                toast.success('Company Added', {
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
            .catch(error=>{
                if (error.response) {
                    toast.error("error!", {
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
            })
    }
    return (
        <div className="xl:col-span-2 col-span-1">
            <Card title="Validation Types">
                <div>
                    <form
                        onSubmit={submitHandler}
                        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                    >
                        <Textinput
                            label="Name"
                            type="text"
                            placeholder=" Name"
                            name="name"
                            register={register}
                            error={errors.name}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Alternative name"
                            type="text"
                            placeholder="Alternative name"
                            name="altName"
                            register={register}
                            error={errors.altname}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="National Identity Card"
                            type="text"
                            placeholder="National Identity Card"
                            name="cin"
                            register={register}
                            error={errors.cin}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />

                        <Textinput
                            label="Address"
                            type="text"
                            placeholder="Address"
                            name="address"
                            register={register}
                            error={errors.address}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Postal code"
                            type="number"
                            placeholder="Postal code"
                            name="postalCode"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div>
                            <label htmlFor=" hh2" className="form-label ">
                                Departement
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={department[0]}
                                styles={styles}
                                name="department"
                                options={department}
                                isClearable
                                id="department"
                                register={register}
                                onChange={(selectedOption)=>{
                                    setValues({
                                        ...values,
                                        dep: selectedOption.label,
                                    })
                                }}

                            />
                        </div>
                        <Textinput
                            label="Email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            register={register}
                            error={errors.email}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Website"
                            type="url"
                            placeholder="Website"
                            name="website"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Skype"
                            type="url"
                            placeholder="Skype"
                            name="skype"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Id prof (R.C)"
                            type="number"
                            placeholder="Id prof (R.C)"
                            name="idrc"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Id prof (I.F)"
                            type="number"
                            placeholder="Id prof (I.F)"
                            name="idif"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Id prof (patent)"
                            type="number"
                            placeholder="Id prof (patent)"
                            name="patent"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="CNSS"
                            type="number"
                            placeholder="CNSS"
                            name="cnss"
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div className="xl:col-span-1 col-span-1">
                        <label className="block capitalize form-label  ">
                            Country
                        </label>
                            <ReactFlagsSelect
                                countries={Object.keys(countryNames)}
                                customLabels={countryNames}
                                selectedSize={14}
                                selected={selected}
                                onSelect={handleCountrySelect}

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
