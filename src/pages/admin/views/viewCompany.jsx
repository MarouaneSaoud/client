import React, {Fragment, useEffect} from "react";
import Accordion from "@/components/ui/Accordion";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Tab } from "@headlessui/react";
import GroupeDetails from "./groupeDetails";
import  CompanyDetails from "./companyDetails";
import ClientDetails from "./clientDetails"
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";

const faqmenus = [
    {
        title: "Company Information",
    },
    {
        title: "Devices Groups",
    },
    {
        title: "Clients",
    },
];



const FaqPage = () => {
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
            <Tab.Group>
                <div className="grid gap-5 grid-cols-12">
                    <div className="xl:col-span-3 lg:col-span-4 col-span-12 card-auto-height">
                        <Card>
                            <Tab.List className="flex flex-col space-y-1 text-start items-start">
                                {faqmenus.map((item, i) => (
                                    <Tab key={i} as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`focus:ring-0 focus:outline-none space-x-2 text-sm flex items-center w-full transition duration-150 px-3 py-4 rounded-[6px] rtl:space-x-reverse
                            ${
                                                    selected
                                                        ? "bg-slate-100 dark:bg-slate-900 dark:text-white"
                                                        : "bg-white dark:bg-slate-800 dark:text-slate-300"
                                                }
                         `}
                                                type="button"
                                            >
                        <span
                            className={`
                              "text-lg",
                              ${
                                selected
                                    ? " opacity-100"
                                    : "opacity-50 dark:opacity-100"
                            }
                        `}
                        ></span>
                                                <Icon icon="heroicons:chevron-double-right-solid" />
                                                <span> {item.title}</span>
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </Card>
                    </div>
                    <div className="xl:col-span-9 lg:col-span-8 col-span-12">
                        <Tab.Panels>
                            <Tab.Panel>
                                <Card title="Details">
                                    <CompanyDetails />
                                </Card>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Card title="Details">
                                    <GroupeDetails/>
                                </Card>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Card title="Details">
                                    <ClientDetails/>
                                </Card>
                            </Tab.Panel>
                        </Tab.Panels>
                    </div>
                </div>
            </Tab.Group>
        </div>
    );
};

export default FaqPage;
