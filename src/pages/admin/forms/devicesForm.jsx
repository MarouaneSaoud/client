import React, {useEffect, useState} from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Card from "../../../components/ui/Card";
import Button from "@/components/ui/Button.jsx";
import ReferenceForm from "@/pages/admin/forms/referenceForm.jsx";
import {toast, ToastContainer} from "react-toastify";
import ReferenceService from "../../../services/reference.services";
import DeviceService from "../../../services/device.services";
import Papa from "papaparse";
import Fileinput from "@/components/ui/Fileinput.jsx";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import { useNavigate } from "react-router-dom";

const FormValidationSchema = yup
    .object({
        serialNum: yup.string().required(" User serial number is required"),
        imei: yup.string().required("Emei is required"),
        description: yup.string().required("Description is required"),
    })
    .required();

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};
const devicesForm = () => {
    const [values, setValues] = useState({ serialNum: 0, imei: 0,reference: 0, description: ""});

    // load reference from database
    const [ref , setReference]= useState([])

    async function getReferences() {
        await ReferenceService.allReference().then(response => {
            const data = response.data
            setReference(data.map(item => ({value: item.id, label: item.name})));
        }).catch(error => {

        })
    }
    useEffect(() => {
        getReferences()
    },[])
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
    // Upload Device from csv
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        // Check if the selected file is a CSV file
        if (file.name.endsWith(".csv")) {

        setSelectedFile(file);
        let totalDevices = 0;
        let successCounter = 0;
        const failedDevices = [];

        Papa.parse(file, {
            complete: async (result) => {
                const devicesFromCSV = result.data; // Skip the header row if present
                // Assuming the CSV columns are in the order: serialNum, imei, reference, description
                totalDevices = devicesFromCSV.length;

                for (const device of devicesFromCSV) {

                    const referenceName = device.reference.replace(/^"|"$/g, '');
                    const reference = ref.find((r) => r.label === referenceName);
                    const formattedDevice = {
                        serialNum: device.serialNum,
                        imei: device.imei,
                        reference:reference.value,
                        description: device.description,
                    };

                    await DeviceService.addDevice(formattedDevice).then(response=>{
                        console.log("Device added successfully!", response.data);
                        successCounter++;

                    })
                        .catch(error=>{
                            console.error("Error adding device:", error);
                            failedDevices.push(formattedDevice);

                    })
                }
                if (successCounter === totalDevices) {
                    console.log("All data recorded successfully!");
                    // Show success toast or do any other UI update
                    toast.success('All devices have been added', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                  /*  console.log(
                        `${successCounter} devices recorded successfully, ${
                            totalDevices - successCounter
                        } devices failed to record.`
                    );
                    console.log("Failed devices:", failedDevices);*/
                    toast.warning("Some devices have not been added!", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // Show warning or error toast for partial success or do any other UI update
                    const csvString = Papa.unparse(failedDevices, {
                        quotes: true, // Encadrer les valeurs entre guillemets
                        delimiter: ',', // Utiliser la virgule comme séparateur
                        header: true, // Inclure une ligne d'en-tête avec les noms de colonnes
                    });
                    // Créer un fichier blob à partir de la chaîne CSV
                    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                    // Créer un objet URL pour le fichier blob
                    const url = URL.createObjectURL(blob);
                    // Créer un lien pour le téléchargement
                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('download', 'failed_upload_devices.csv');

                    document.body.appendChild(link);
                    // Déclencher le téléchargement
                    link.click();
                    // Nettoyer l'objet URL
                    URL.revokeObjectURL(url);
                }
            },
            header: true, // Set to true if the CSV file has a header row
            skipEmptyLines: true,
        });

        }else{
            toast.error("Please choose csv file!", {
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
    };



    // save device from form

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();
        await DeviceService.addDevice(values).then(response=>{
            if (response.status === 200) {
                toast.success('Device Added', {
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
            .catch(error=>{
                if (error.response) {
                    toast.error("error!", {
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
    }


    const [showMyModal,setShowMyModal]=useState(false)
    const handleOnClose =()=>{setShowMyModal(false)
        getReferences()

    }
    const navigate= useNavigate()
    useEffect(() => {
        if(whoAuth.isCurrentUserManager()){
            navigate("/403");
        }
        const storedToken = localStorage.getItem('accessToken');

        if (storedToken) {
            const isExpired = authTokenExpired;

            if (isExpired) {
                localStorage.removeItem('accessToken');

                navigate("/login")
            }
        }else {
            navigate("/login")
        }
    });
    const handleDownload = () => {
        const csvData = Papa.unparse(
            [{ serialNum: '', imei: '', reference: '', description: '' }],
            {
                quotes: true,
                delimiter: ',',
                header: true,
            }
        );

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'header_only.csv');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <>
            <ToastContainer />
            <Card title="Add Devices">
                <h4>Upload Devices automatically</h4>
                <div className="my-8">
                    <Fileinput
                        selectedFile={selectedFile}
                        name="basic"
                        onChange={ handleFileUpload}
                    />


                    <Button
                        onClick={handleDownload}
                        icon="heroicons-outline:newspaper"
                        className="btn btn-dark  rounded-[999px] bg-black-900 mt-6"
                        /> Download Example CSV File
                </div>

                <div>
                    <h4>Upload Devices manually</h4>
                    <form
                        onSubmit={submitHandler}
                        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
                    >
                        <Textinput
                            label="Serial number"
                            type="number"
                            placeholder="Type your serial number "
                            name="serialNum"
                            error={errors.serialNum}
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Textinput
                            label="Imei"
                            type="number"
                            placeholder="Type your Imei"
                            name="imei"
                            error={errors.imei}
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />

                        <div className="grid grid-cols-5">
                            <div className="col-span-4">
                                <label htmlFor=" hh2" className="form-label ">
                                    Reference
                                </label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    styles={styles}
                                    options={ref}
                                    isClearable
                                    id="reference"
                                    register={register}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            reference: e.value,
                                        })
                                        console.log(values)
                                    }
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="top-2.5 m-7 ">
                                <Button
                                    onClick={()=> setShowMyModal(true)}
                                    icon="heroicons-outline:plus"
                                    className="btn btn-dark  rounded-[999px] bg-black-900"
                                /></div>
                            </div>

                        </div>



                        <Textinput
                            label="Description"
                            type="text"
                            placeholder="Description"
                            name="description"
                            error={errors.description}
                            register={register}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />

                        <div className="lg:col-span-2 col-span-1">
                            <div className="ltr:text-right rtl:text-left">
                                <button className="btn btn-dark  text-center">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </Card>

            <ReferenceForm onClose={handleOnClose} visible={showMyModal}/>

        </>
    );
};

export default devicesForm;