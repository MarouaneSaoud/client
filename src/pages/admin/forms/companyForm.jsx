import React, { Fragment } from "react";
import Accordion from "@/components/ui/Accordion";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

import { useForm, useFieldArray } from "react-hook-form";

import Company from "@/pages/admin/forms/ClientForms/company.jsx";
import Particular from "@/pages/admin/forms/ClientForms/particular.jsx";


const faqmenus = [
    {
        title: "Company",
    },
    {
        title: "Particular",
    },

];
const dep = [
    { value: "ref", label: "ref" },


];
const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};
const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    // Add more countries with their respective codes and names
];

const FaqPage = () => {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm(
        {
            defaultValues: {
                test: [{ Name: "", email: "" }],
            },
        }
    );



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
                            <Tab.Panel >
                               <Company/>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Particular/>
                            </Tab.Panel>
                        </Tab.Panels>
                    </div>
                </div>
            </Tab.Group>
        </div>
    );
};

export default FaqPage;
