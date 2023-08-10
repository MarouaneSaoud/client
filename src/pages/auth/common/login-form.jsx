import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import AuthService from "../../../services/auth.services";
import getRole from "@/services/auth/auth.role.js";
import ReCAPTCHA from "react-google-recaptcha";
const schema = yup

    .object({
        username: yup.string().email("Invalid email").required("Email is Required"),
        password: yup.string().required("Password is Required"),
    })
    .required();
const LoginForm = () => {

    const dispatch = useDispatch();

    const [values, setValues] = useState({ username: "", password: "" });

    const [verified,setVerified] =useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const result = await AuthService.loadUserByUsername(values.username);
            return result;
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthService.login(values);
            const result = await fetchData();
            if (response.status === 200) {

                if(result.data.actived===true){

                    const token = response.headers.get('access-Token');
                    localStorage.setItem('accessToken', token);
                    const role = getRole();
                    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
                        navigate("/dashboard");
                        dispatch(handleLogin(true));
                    } else if (role === 'MANAGER') {
                        navigate("/manager/dashboard");
                        dispatch(handleLogin(true));
                    }
                }else{
                    toast.info(`Your account is deactivated`, {
                        position: "top-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    toast.info("Please contact the super administrator.", {
                        position: "top-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Invalid credentials", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error("Server error, try again later", {
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
    };


    const [checked, setChecked] = useState(false);

    return (
    <>
        <form onSubmit={(e) => onSubmit(e)} className="space-y-4 ">
            <Textinput
                name="username"
                label="email"
                placeholder={"Enter your email"}
                type="email"
                register={register}
                error={errors.email}
                className="h-[48px]"
                onChange={(e) =>
                    setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                    })
                }
            />
            <Textinput
                name="password"
                label="passwrod"
                type="password"
                placeholder={"Enter your password"}
                //defaultValue={users[0].password}
                register={register}
                error={errors.password}
                className="h-[48px]"
                onChange={(e) =>
                    setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                    })
                }
            />
            <div className="flex justify-between">
                <Checkbox
                    value={checked}
                    onChange={() => setChecked(!checked)}
                    label="Keep me signed in"
                />
                <Link
                    to="/forgot-password"
                    className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
                >
                    Forgot Password?{" "}
                </Link>
            </div>

            <button className="btn btn-dark block w-full text-center">Sign in</button>
        </form>
    </>
    );
};

export default LoginForm;
