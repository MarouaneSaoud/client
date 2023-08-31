import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import DropConfig from "@/pages/manager/Forms/DropConfig.jsx";
import ConfigurationServices from "@/services/configuration.services.js";
import { toast } from "react-toastify";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import {useNavigate} from "react-router-dom";


export default function Config({ visible, onClose, imei }) {
    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };


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

    const [iniData, setIniData] = useState(null);

    const handleIniFileSelected = async (iniText) => {
        const iniObject = parseIni(iniText);
        setIniData(iniObject);

        try {
            await sendDeviceSequentially();
            onClose()
        } catch (error) {
        }
    };
    const parseIni = (iniText) => {
        const iniObject = {};
        const lines = iniText.split("\n");

        lines.forEach((line) => {
            const [key, ...valueParts] = line.split(": ");
            if (key && valueParts.length > 0) {
                const value = valueParts.join(": ");
                iniObject[key.trim()] = value.trim();
            }
        });

        return iniObject;
    };

    async function sendDeviceSequentially(index = 0) {
        if (index >= imei.length) {
            onClose();
            return;
        }

        const myImei = imei[index];
        const payload = {
            ...iniData,
            imei: myImei
        };

        try {
            await ConfigurationServices.config(payload);
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

        await sendDeviceSequentially(index + 1);
    }
    if (!visible) return null;

    return (
        <div
            onClick={handleClose}
            id="container"
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl"
        >
            <Card title="Config" className="w-2/4">
                <div>
                    <DropConfig onIniFileSelected={handleIniFileSelected} />
                </div>
            </Card>
        </div>
    );
}
