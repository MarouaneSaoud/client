import React, {useEffect, useState} from "react";
import Textinput from "@/components/ui/Textinput";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import Select from "react-select";
import InputGroup from "@/components/ui/InputGroup";
import {useNavigate} from "react-router-dom";
import whoAuth from "../../../services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import DeviceService from "../../../services/device.services";
import {toast} from "react-toastify";
import AuthService from "../../../services/auth.services";
import AuthRole from "@/services/auth/auth.role.js";

const FormValidationSchema = yup
    .object({
        cin: yup.string().required("National identity card is Required"),
        email: yup.string().email("Invalid email").required("Email is Required"),
        username: yup.string().required("Username is Required"),
        address: yup.string().required("Address is Required"),
        postalCode: yup.string().required("Postal Code is Required"),

    })
    .required();

const MultiValidation = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
}
const userForm = () => {
    const role =AuthRole();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    const navigate = useNavigate()
    useEffect(() => {
        const checkUserAndToken = () => {

            if (whoAuth.isCurrentUserAdmin() || whoAuth.isCurrentUserClient()) {
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



    const [values, setValues] = useState({ username: "", name: "",cin: "", address: "",postalCode:""});
    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();

        try {
            const response = await AuthService.addUserAdmin(values);

            if (response.status === 200) {

                toast.success('User Added', {
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
        } catch (error) {
            if (error.response) {
                toast.error("An error occurred!", {
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
        }

    }


    return (
        <Card title={"Clients Form"}>

            <div>
                <form onSubmit={submitHandler}
                      className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                >
                    <Textinput
                        name="name"
                        label="username"
                        type="text"
                        placeholder="Add your username"
                        register={register}
                        error={errors.username}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <Textinput
                        name="username"
                        label="email"
                        type="email"
                        placeholder="Add your email"
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
                        name="cin"
                        label="National identity card"
                        type="text"
                        placeholder="Add your National identity card"
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
                        name="address"
                        label="Address"
                        type="text"
                        placeholder="Add your Address"
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
                        name="postalCode"
                        label="Postal Code"
                        type="number"
                        placeholder="Add your Postal Code"
                        register={register}
                        error={errors.postalCode}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                            })
                        }
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

export default userForm;
