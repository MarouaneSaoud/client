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
import ReCAPTCHA from "react-google-recaptcha";
import jwtDecode from "jwt-decode";
import AuthService from "@/services/auth/auth.services.js";
import authRole from "@/services/auth/auth.role.js";
import getRole from "@/services/auth/auth.role.js";
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
    function onChange(value) {
        setVerified(true);
    }
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });
    const navigate = useNavigate();
    const onSubmit  = async (event) =>  {
        event.preventDefault();
    await AuthService.login(values)
        .then(response=>{
            if (response.status === 200) {
                const token = response.headers.get('access-Token');
                localStorage.setItem('accessToken', token);
                const role=getRole();
                if (role==='ADMIN') {
                    navigate("/dashboard")
                    dispatch(handleLogin(true));
                } else if (role==='USER')
                {
                    navigate("/manager/dashboard")
                    dispatch(handleLogin(true));
                }

            }

        })
        .catch(error=>{
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
        })
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
            {/*<div className="grid place-items-center">
                <ReCAPTCHA
                    sitekey="6LeOUfAmAAAAABGafdJd2exB5sjKIqh_cZGMB3Mr"
                    onChange={onChange}
                />
            </div>*/}
            <button className="btn btn-dark block w-full text-center" >Sign in</button>
        </form>
    </>
    );
};

export default LoginForm;
