import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "react-select";
import CompanyServices from "@/services/company.services.js";
import DeviceService from "@/services/device.services.js";
import { toast } from "react-toastify";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import {useNavigate} from "react-router-dom";
import ClientService from "@/services/client.services.js";
import getEmail from "@/services/auth/auth.email.js";
import GroupeService from "@/services/groupeDevice.services.js";

export default function ReferenceForm({ visible, onClose, imei }) {
    const [values, setValues] = useState({ imei: imei, client: "" });

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
        console.log(values)
        await DeviceService.allocateDeviceToClient(values)
            .then((response) => {
                if (response.data) {
                    onClose();
                }
            })
            .catch((error) => {
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
            });
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
        console.log(imei)
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
            <Card title="Allocate">
                <form onSubmit={submitHandler}>
                    <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            styles={styles}
                            options={group}
                            defaultValue={group[0]}
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
                        <Button type="submit" text="Submit" className="btn-dark" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
