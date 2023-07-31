import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import {useParams} from "react-router-dom";
import CompanyService from "../../../services/company.services";

const columns = [
    {
        label: "Age",
        field: "age",
    },
    {
        label: "First Name",
        field: "first_name",
    },

    {
        label: "Email",
        field: "email",
    },
];
// slice(0, 10) is used to limit the number of rows to 10
const rows = tableData.slice(0, 7);
const BasicTablePage = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getCompanyClientById() {
            try {
                const result = await CompanyService.companyClientById(id);
                setCompany(result.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company details:", error);
                setLoading(false);
            }
        }
        getCompanyClientById();
    }, [id]);


    return (
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
            <Card title="basic table" noborder>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            {loading ? (
                                <div>Loading...</div>
                            ) : company ? (
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
                                {company.map((row, i) => (
                                    <tr key={i}>
                                        <td className="table-td">{company.id}</td>
                                        <td className="table-td">{company.name}</td>
                                        <td className="table-td">{company.email}</td>
                                        <td className="table-td ">{company.cin}</td>
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
            </Card>

        </div>
    );
};

export default BasicTablePage;
