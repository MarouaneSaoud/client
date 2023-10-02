import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card.jsx";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import ServiceEntreprise from "../../../services/company.services.js";
import { toast } from "react-toastify";
import { countryNames, departments } from "@/constant/data.js";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { useNavigate } from "react-router-dom";

const FormValidationSchema = yup
    .object({
        name: yup.string().required("Le nom est requis"),
        altName: yup.string().required("Le nom alternatif est requis"),
        address: yup.string().required("L'adresse est requise"),
        email: yup.string().email("L'e-mail n'est pas valide").required("L'e-mail est requis"),
    })
    .required();

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const userForm = () => {
    const [selected, setSelected] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });

    const [values, setValues] = useState({

        name: "",
        altName: "",
        cin: 0,
        address: "",
        postalCode: 0,
        department: departments[0],
        email: "",
        website: "",
        skype: "",
        idrc: 0,
        idif: 0,
        patent: 0,
        cnss: 0,
        country: "",
        logo: null,
    });

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
        console.log(values);
        await ServiceEntreprise.addCompany(values)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Entreprise ajoutée", {
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
            .catch((error) => {
                if (error.response) {
                    toast.error("Erreur !", {
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
            });
    }

    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndToken = () => {
            if (whoAuth.isCurrentUserManager()) {
                navigate("/403");
            }
            const storedToken = localStorage.getItem("accessToken");

            if (storedToken) {
                const isExpired = authTokenExpired;

                if (isExpired) {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                }
            } else {
                navigate("/login");
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
            <Card title="Formulaire d'entreprise">
                <div>
                    <form
                        onSubmit={submitHandler}
                        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                    >
                        <Textinput
                            label="Nom"
                            type="text"
                            placeholder="Nom"
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
                            label="Nom alternatif"
                            type="text"
                            placeholder="Nom alternatif"
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
                            label="Carte d'identité nationale"
                            type="text"
                            placeholder="Carte d'identité nationale"
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
                            label="Adresse"
                            type="text"
                            placeholder="Adresse"
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
                            label="Code postal"
                            type="number"
                            placeholder="Code postal"
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
                            <label htmlFor="department" className="form-label">
                                Département
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={departments[0]}
                                styles={styles}
                                name="department"
                                options={departments}
                                isClearable
                                id="department"
                                register={register}
                                onChange={(selectedOption) => {
                                    setValues({
                                        ...values,
                                        department: selectedOption.label,
                                    });
                                }}
                            />
                        </div>
                        <Textinput
                            label="E-mail"
                            type="email"
                            placeholder="E-mail"
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
                            label="Site Web"
                            type="url"
                            placeholder="Site Web"
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
                            label="Identifiant professionnel (R.C)"
                            type="number"
                            placeholder="Identifiant professionnel (R.C)"
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
                            label="Identifiant professionnel (I.F)"
                            type="number"
                            placeholder="Identifiant professionnel (I.F)"
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
                            label="Identifiant professionnel (brevet)"
                            type="number"
                            placeholder="Identifiant professionnel (brevet)"
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
                                Pays
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
                                <button className="btn btn-dark  text-center">Soumettre</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default userForm;
