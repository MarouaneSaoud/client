import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import {useParams} from "react-router-dom";
import CompanyService from "../../../services/company.services";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import whoAuth from "@/services/auth/auth.who.js";

const columns = [
    {
        label: "id",
    },
    {
        label: "name",
    },

    {
        label: "cin",
    },
    {
        label: "address",
    },
    {
        label: "postalCode",
    },
    {
        label: "created",
    },
    {
        label: "email",
    },
];

const ClientDetails = () => {
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
    const { id } = useParams();
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    // Date Format
    function formatNumberWithTwoDigits(number) {
        return number.toString().padStart(2, '0');
    }
    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = formatNumberWithTwoDigits(dateObject.getMonth() + 1);
        const day = formatNumberWithTwoDigits(dateObject.getDate());
        const hours = formatNumberWithTwoDigits(dateObject.getHours());
        const minutes = formatNumberWithTwoDigits(dateObject.getMinutes());
        const seconds = formatNumberWithTwoDigits(dateObject.getSeconds());

        return `${year}-${month}-${day}`;
    }
    //Get Company Data
    async function getCompanyClientById() {
        try {
            const result = await CompanyService.companyClientById(id);
            setClient(result.data);
            console.log(client)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCompanyClientById();
    }, [id]);


    return (
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            {loading ? (
                                <div>Loading...</div>
                            ) : client ? (
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className=" border-t border-slate-100 dark:border-slate-800">
                                <tr>
                                    {columns.map((column, i) => (
                                        <th key={i} scope="col" className=" table-th ">
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                {client.map((row, i) => (
                                    <tr key={i}>
                                        <td className="table-td">{row.id}</td>
                                        <td className="table-td">{row.name}</td>
                                        <td className="table-td">{row.email}</td>
                                        <td className="table-td ">{row.cin}</td>
                                        <td className="table-td ">{row.postalCode}</td>
                                        <td className="table-td "> {formatDate(row.createdAt)}</td>
                                        <td className="table-td ">{row.cin}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                            ) : (
                                <div className="ml-6">The Company has no Customers</div>
                            )}
                                </div>
                    </div>
                </div>


    );
};

export default ClientDetails;
