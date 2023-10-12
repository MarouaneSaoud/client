import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import Select from "react-select";
import CompanyServices from "@/services/company.services.js";
import DeviceService from "@/services/device.services.js";
import { toast } from "react-toastify";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { useNavigate } from "react-router-dom";

export default function ReferenceForm({ visible, onClose, imei }) {
    const [values, setValues] = useState({ imei: imei, company: "" });

    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };
    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };
    async function submitHandler(e) {
        e.preventDefault();
        await DeviceService.allocateDevice(values)
            .then((response) => {
                if (response.data) {
                    onClose();
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Erreur", {
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
    const [Company, setCompany] = useState([]);

    async function getCompany() {
        await CompanyServices.allCompany()
            .then((response) => {
                const data = response.data;
                setCompany(data.map((item) => ({ value: item.id, label: item.name })));
            })
            .catch((error) => {});
    }
    useEffect(() => {
        getCompany();
    }, []);

    useEffect(() => {
        setValues((prevValues) => ({ ...prevValues, imei: imei }));
    }, [imei]);
    const navigate = useNavigate();

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

    if (!visible) return null;

    return (
        <div
            onClick={handleClose}
            id="container"
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl"
        >
            <Card title="Allocation">
                <form onSubmit={submitHandler}>
                    <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            styles={styles}
                            options={Company}
                            isClearable
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    company: e.value,
                                });
                                console.log(values);
                            }}
                        />
                    </div>
                    <div className="ltr:text-right rtl:text-left">
                        <Button type="submit" text="Soumettre" className="btn-dark" />
                    </div>
                </form>
            </Card>
        </div>
    );
}