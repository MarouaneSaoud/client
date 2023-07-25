import React , {useState , useEffect} from "react";
import Textinput from "@/components/ui/Textinput";
import {useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import ReactFlagsSelect from "react-flags-select";
import {useNavigate} from "react-router-dom";
import whoAuth from "../../../../services/auth/auth.who.js";
import DropZone from "@/pages/forms/file-input/DropZone.jsx";




const FormValidationSchema = yup
    .object({
        name: yup.string().required("The name is required"),
        altName: yup.string().required("Alternative name is required"),
        cin: yup
            .string()
            .required("National Identity Card is required")
            .min(8, "National Identity Card must be at least 8 characters"),
        address: yup.string().required("Address is required"),
        postalCode: yup.string().required("Postal code is required"),
        email: yup.string().email("Email is not valid").required("Email is required"),

    })

const particular = () => {

    const [selected, setSelected] = useState("");
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

    const navigate=useNavigate();
    useEffect(()=>{
        if(whoAuth.isCurrentUserManager()){
            navigate("/403");
        }
    })

    return (
        <div>
            <Card title="Create particular company">
                <div className="space-y-4">

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
                            type="number"
                            placeholder="Postal code"
                            name="postalCode"
                            register={register}
                            error={errors.postalCode}
                        />

                        <Textinput
                            label="Email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            register={register}
                            error={errors.email}
                        />

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

export default particular;
