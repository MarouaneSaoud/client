import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card.jsx";
import DropConfig from "@/pages/manager/model/DropConfig.jsx";
import ConfigurationServices from "@/services/configuration.services.js";
import { toast } from "react-toastify";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { useNavigate } from "react-router-dom";

export default function Config({ visible, onClose, imei }) {
    const handleClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndToken = async () => {
            if (whoAuth.isCurrentUserClient() || whoAuth.isCurrentUserAdmin()) {
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


    const isValidIni = (iniObject) => {
        const requiredKeys = [
            "serverIp",
            "port",
            "apn",
            "smsResponse",
            "mode",
            "pStop",
            "sendingInterval",
            "angle",
            "sdm",
            "wifiPassword",
            "smsPassword"
        ];


        for (const key of requiredKeys) {

            if (!iniObject.hasOwnProperty(key)) {
                return false;
            }
        }

        if (!isValidIpAddress(iniObject.serverIp)) {
            return false;
        }

        if (!isValidPort(iniObject.port)) {
            return false;
        }

        if (!isValidUrl(iniObject.apn)) {
            return false;
        }

        if (!isValidNumber(iniObject.smsResponse)) {
            return false;
        }

        if (!isValidNumber(iniObject.mode) && iniObject.mode !== "0" && iniObject.mode !== "1") {
            return false;

        }

        if (!isValidNumericRange(iniObject.pStop, 0, 20)) {
            return false;
        }
        if (!isValidNumericRange(iniObject.sendingInterval, 6, 120)) {
            return false;

        }

        if (!isValidNumericRange(iniObject.angle, 6, 380)) {
            return false;

        }

        if (!isValidNumber(iniObject.sdm)) {
            return false;
        }

        if (iniObject.wifiPassword.length < 8) {
            return false;
        }

        if (!isValidSmsPassword(iniObject.smsPassword)) {
            return false;
        }

        return true;
    };

    const isValidSmsPassword = (password) => {
        const regex = /^\d{6}$/;
        return regex.test(password);
    };

    const isValidIpAddress = (ipAddress) => {
        const ipRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
        return ipRegex.test(ipAddress);
    };

    const isValidPort = (port) => {
        const portNumber = parseInt(port, 10);
        return !isNaN(portNumber) && portNumber >= 1 && portNumber <= 65535;
    };

    const isValidUrl = (url) => {
        if (url === "") {
            return true;
        }
        const urlRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return urlRegex.test(url);
    };

    const isValidNumber = (value) => {
        const number = parseInt(value, 10);
        return !isNaN(number);
    };

    const isValidNumericRange = (value, min, max) => {
        const number = parseInt(value, 10);
        return !isNaN(number) && number >= min && number <= max;
    };


    let data = null;
    const handleIniFileSelected = async (iniText) => {
        const iniObject = parseIni(iniText);
        data=iniObject;

        if (!isValidIni(iniObject)) {
            toast.error("Configuration file is invalid", {
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }
        try {
            await sendDeviceSequentially();
        } catch (error) {
            console.error("Error during configuration:", error);
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
            toast.success("Configuration successfully completed.", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            onClose();
            return;
        }

        const myImei = imei[index];
        const payload = {
            ...data,
            imei: myImei
        };


        try {
            await ConfigurationServices.config(payload);
        } catch (error) {
            console.error("Error during configuration:", error);
            toast.error("An error has occurred during configuration", {
                position: "top-right",
                autoClose: 1500,
            });
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
