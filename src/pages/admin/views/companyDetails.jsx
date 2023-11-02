import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import CompanyService from "../../../services/company.services";
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";


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
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : company ? (
                    <ul className="relative ltr:pl-2 rtl:pr-2">
                        {company.departement ? (
                            <li>
                                <div className="p-[10px] relative top-[-20px]" >
                                    <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                        Département
                                    </h2>
                                    <p className="text-xs capitalize dark:text-slate-400">
                                        {}
                                    </p>
                                </div>
                            </li>
                        ) : null}
                        {company.address ? (
                            <li>
                                <div className="p-[10px] relative top-[-20px]" >
                                    <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                        Adresse
                                    </h2>
                                    <p className="text-xs capitalize dark:text-slate-400">
                                        {company.address}
                                    </p>
                                </div>
                            </li>
                        ) : null}
                        {company.cin_rc ? (
                            <li>
                                <div className="p-[10px] relative top-[-20px]" >
                                    <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                        Carte nationale d'identité | Registre de Commerce
                                    </h2>
                                    <p className="text-xs capitalize dark:text-slate-400">
                                        {company.cin_rc}
                                    </p>
                                </div>
                            </li>
                        ) : null}
                        {company.email ? (
                           <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                  Email
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.email}
                                </p>
                            </div>
                        </li>
                        ) : null}
                        {company.website ? (
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Site web
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.website}
                                </p>
                            </div>
                        </li>
                        ) : null}
                        {company.skype ? (
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
                        ) : null}
                        {company.idif ? (
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
                        ) : null}
                        {company.patent ? (
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
                        ) : null}
                        {company.cnss ? (
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
                        ) : null}
                        {company.country ? (
                        <li>
                            <div className="p-[10px] relative top-[-20px]" >
                                <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                    Pays
                                </h2>
                                <p className="text-xs capitalize dark:text-slate-400">
                                    {company.country}
                                </p>
                            </div>
                        </li>
                        ) : null}
                        {company.tel ? (
                            <li>
                                <div className="p-[10px] relative top-[-20px]" >
                                    <h2 className="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600">
                                        Telephone
                                    </h2>
                                    <p className="text-xs capitalize dark:text-slate-400">
                                        {company.tel}
                                    </p>
                                </div>
                            </li>
                        ) : null}
                    </ul>
                ) : (
                    <div>Entreprise non trouvée</div>
                )}
            </div>
        );
};

export default companyDetails;
