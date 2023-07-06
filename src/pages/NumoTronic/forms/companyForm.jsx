import React, { Fragment } from "react";
import Accordion from "@/components/ui/Accordion";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import InputGroup from "@/components/ui/InputGroup";
import ReactFlagsSelect from "react-flags-select";
import DropZone from "../../forms/file-input/DropZone";
import Fileinput from "@/components/ui/Fileinput";


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
    const history= useNavigate();



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
                                <Card title="Create company">
                                    <div className="space-y-4">
                                        <InputGroup
                                            label="Name"
                                            type="text"
                                            placeholder="Name of third party"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Alternative name"
                                            type="text"
                                            placeholder="Alternative name"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Address"
                                            type="text"
                                            placeholder="Address"
                                            prepend={<Icon icon="heroicons-outline:map-pin" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Zip code"
                                            type="number"
                                            placeholder="Zip code"
                                            prepend={<Icon icon="heroicons-outline:qr-code" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Pays"
                                            type="country"
                                            placeholder="Pays"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <div>
                                            <label htmlFor=" hh2" className="form-label ">
                                               Departement
                                            </label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                defaultValue={dep[0]}
                                                styles={styles}
                                                name="clear"
                                                options={dep}
                                                isClearable
                                                id="hh2"
                                                register={register}
                                            />
                                        </div>
                                        <InputGroup
                                            label="Email"
                                            id="hi_email1"
                                            type="email"
                                            placeholder="Type your email"
                                            prepend={<Icon icon="heroicons-outline:mail" />}
                                            merged
                                        />
                                        <Textinput
                                            label="Website"
                                            type="text"
                                            placeholder="Enter your website URL"
                                            register={register}
                                        />
                                        <Textinput
                                            label="Skype"
                                            type="text"
                                            placeholder="https://www.skype.com/profile"
                                            register={register}

                                        />
                                        <InputGroup
                                            label="Id prof (R.C)"
                                            type="number"
                                            placeholder="Id prof (R.C)"
                                            prepend={<Icon icon="heroicons-outline:identification" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Id prof (I.F)"
                                            type="number"
                                            placeholder="Id prof (I.F)"
                                            prepend={<Icon icon="heroicons-outline:identification" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Id prof (patent)"
                                            type="number"
                                            placeholder="Id prof (patent)"
                                            prepend={<Icon icon="heroicons-outline:identification" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="CNSS"
                                            type="number"
                                            placeholder="CNSS"
                                            prepend={<Icon icon="heroicons-outline:identification" />}
                                            merged
                                        />
                                        <div className="xl:col-span-2 col-span-1">
                                            <Card title="Logo">
                                                <DropZone />
                                            </Card>
                                        </div>
                                        <div className=" space-y-4">
                                            <Button text="Submit" className="btn-dark" />
                                        </div>
                                    </div>
                                </Card>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Card title="Create particular company">
                                    <div className="space-y-4">
                                        <InputGroup
                                            label="Name"
                                            type="text"
                                            placeholder="Name of third party"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Alternative name"
                                            type="text"
                                            placeholder="Alternative name"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="National Identity Card"
                                            type="text"
                                            placeholder="National Identity Card"
                                            prepend={<Icon icon="heroicons-outline:identification" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Address"
                                            type="text"
                                            placeholder="Address"
                                            prepend={<Icon icon="heroicons-outline:map-pin" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Zip code"
                                            type="number"
                                            placeholder="Zip code"
                                            prepend={<Icon icon="heroicons-outline:qr-code" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Pays"
                                            type="country"
                                            placeholder="Alternative name"
                                            prepend={<Icon icon="heroicons-outline:user" />}
                                            merged
                                        />
                                        <InputGroup
                                            label="Email"
                                            id="hi_email1"
                                            type="email"
                                            placeholder="Type your email"
                                            prepend={<Icon icon="heroicons-outline:mail" />}
                                            merged
                                        />
                                        <div className=" space-y-4">
                                            <Button text="Submit" className="btn-dark" />
                                        </div>
                                    </div>
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
