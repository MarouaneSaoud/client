import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import {useParams} from "react-router-dom";
import CompanyService from "../../../services/company.services";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";

const columns = [
    {
        label: "id",
    },
    {
        label: "name",
    },
    {
        label: "Created",
    },

];

const BasicTablePage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState([]);
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

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    //Get Company Data
    async function getCompanyDeviceGroupById() {
        try {
            const result = await CompanyService.companyDeviceGroupById(id);
            setGroup(result.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCompanyDeviceGroupById();
    }, [id]);
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
        <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                    {loading ? (
                        <div>Loading...</div>
                    ) : group ? (
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
                            {group.map((row, i) => (
                                <tr key={i}>
                                    <td className="table-td">{row.id}</td>
                                    <td className="table-td">{row.name}</td>

                                    <td className="table-td "> {formatDate(row.createdAt)}</td>

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

export default BasicTablePage;
