import React ,{useEffect}from "react";
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
const FormValidationSchema = yup
    .object({
        username: yup.string().required("The First name is required"),
        lastname: yup.string().required("The Last name is required"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(/^[0-9]{9}$/, "Phone number is not valid"),
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
    })
const role = [
    { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
    { value: "ADMIN", label: "ADMIN" },


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

    const onSubmit = (data) => {
        console.log(data);
    };

    const navigate=useNavigate();
    useEffect(()=>{
        if(whoAuth.isCurrentUserManager()){
            navigate("/403");
        }
    })
    useEffect(() => {
        const checkUserAndToken = () => {

            if (whoAuth.isCurrentUserManager()) {
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
    return (
        <div className="xl:col-span-2 col-span-1">
            <Card title="Users Form">
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                    >
                        <Textinput
                            label="Name"
                            type="text"
                            placeholder="Type your Name"
                            name="username"
                            register={register}
                            error={errors.username}
                        />
                        <Textinput
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            register={register}
                            error={errors.email}
                        />

                        <Textinput
                            label="Password"
                            type="password"
                            placeholder="8+ characters, 1 Capital letter "
                            name="password"
                            register={register}
                            error={errors.password}
                        />

                        <div>
                            <label htmlFor=" hh2" className="form-label ">
                                Role
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={role[1]}
                                styles={styles}
                                name="clear"
                                options={role}
                                isClearable
                                id="hh2"
                                register={register}
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
