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
import AuthService from "@/services/Auth.services.js";
const schema = yup
    .object({
        username: yup.string().email("Invalid email").required("Email is Required"),
        password: yup.string().required("Password is Required"),
    })
    .required();
const LoginForm = () => {
    const [values, setValues] = useState({ username: "", password: "" });


    const [verified,setVerified] =useState(false)
    function onChange(value) {
        setVerified(true);
    }
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        //
        mode: "all",
    });
    const navigate = useNavigate();
    const onSubmit  = async (event) =>  {
        console.log(values)
        const{data}=AuthService.login(values).then()
        console.log(data)


    };

    const [checked, setChecked] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
            <div className="grid place-items-center">
                <ReCAPTCHA
                    sitekey="6LeOUfAmAAAAABGafdJd2exB5sjKIqh_cZGMB3Mr"
                    onChange={onChange}
                />
            </div>
            <button className="btn btn-dark block w-full text-center" disabled={!verified}>Sign in</button>
        </form>
    );
};

export default LoginForm;
