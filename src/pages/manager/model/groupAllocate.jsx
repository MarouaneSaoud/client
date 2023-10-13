import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import Select from "react-select";
import CompanyServices from "@/services/company.services.js";
import DeviceService from "@/services/device.services.js";
import { toast } from "react-toastify";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import {useNavigate} from "react-router-dom";
import getEmail from "@/services/auth/auth.email.js";

export default function groupAllocate({ visible, onClose, imei }) {
    const [values, setValues] = useState({ imei: null, group: null });

    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };
    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };
    async function allocateDevicesSequentially(index = 0) {
        if (index >= imei.length) {
            onClose();
            return;
        }

        const myImei = imei[index];
        const payload = {
            ...values,
            imei: myImei
        };

        try {
            await DeviceService.allocateDeviceToGroup(payload);
        } catch (error) {
            if (error.response) {
                toast.error("error", {
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

        await allocateDevicesSequentially(index + 1);
    }

    async function submitHandler(e) {
        e.preventDefault();

        try {
            await allocateDevicesSequentially(); // Commencer l'allocation séquentielle
        } catch (error) {
            console.error("Erreur lors de l'allocation des IMEI", error);
        }
    }


    const [group, setGroup] = useState([]);

    async function getGroup() {
        await CompanyServices.companyDeviceGroupByEmail(getEmail())
            .then((response) => {
                const data = response.data;
                setGroup(data.map((item) => ({ value: item.id, label: item.name })));
            })
            .catch((error) => {});
    }
    useEffect(() => {
        getGroup()
    }, []);

    useEffect(() => {
        setValues((prevValues) => ({ ...prevValues, imei: imei }));
    }, [imei]);
    const navigate=useNavigate();
    
    useEffect(() => {
        const checkUserAndToken = () => {

            if (whoAuth.isCurrentUserClient()||whoAuth.isCurrentUserAdmin()) {
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
            <Card title="Allouer une appareil(s) au Groupe">
                <form onSubmit={submitHandler}>
                    <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            styles={styles}
                            options={group}
                            isClearable
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    group: e.value,
                                });

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
