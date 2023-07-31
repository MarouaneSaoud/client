import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import CompanyService from "../../../services/company.services";

export const lists = [
    {
        title: "Project start date",
        desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
        date: "Sep 20, 2021 ",
        time: "12:32 AM",
        status: "ok",
    },
    {
        title: "Project start date",
        date: "Sep 20, 2021 ",
        desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
        time: "12:32 AM",
        status: "ok",
    },
    {
        title: "Project start date",
        date: "Sep 20, 2021 ",
        desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
        time: "12:32 AM",
        status: "ok",
    },
    {
        title: "Project start date",
        date: "Sep 20, 2021 ",
        desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
        time: "12:32 AM",
    },
    {
        title: "Project start date",
        date: "Sep 20, 2021 ",
        desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
        time: "12:32 AM",
    },
];
const companyDetails = () => {

    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getCompanyById() {
            try {
                const result = await CompanyService.companyById(id);
                setCompany(result.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company details:", error);
                setLoading(false);
            }
        }
        getCompanyById();
    }, [id]);


        return (
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : company ? (
                    <ul className="relative ltr:pl-2 rtl:pr-2">
                        <li>
                        <div className="p-[10px] relative top-[-20px]" >
                            <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                Departement
                            </h2>
                            <p className="text-xs capitalize dark:text-slate-400">
                                {company.departement}
                            </p>
                        </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Address
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.address}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    National Identity Card
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.cin}
                                </p>
                            </div>
                        </li>     <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Email
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.email}
                                </p>
                            </div>
                        </li>     <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    website
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.website}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    skype
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.skype}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                   Id (rc)
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.idrc}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Id (if)
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.idif}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Id (patent)
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.patent}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Cnss
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.cnss}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Contry
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.country}
                                </p>
                            </div>
                        </li>

                    </ul>
                ) : (
                    <div>Company not found</div>
                )}
            </div>
        );
};

export default companyDetails;
