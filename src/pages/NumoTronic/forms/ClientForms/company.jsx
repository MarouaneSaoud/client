import React, { Fragment } from "react";

import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Select from "react-select";
import InputGroup from "@/components/ui/InputGroup";
import {useForm} from "react-hook-form";
import DropZone from "@/pages/forms/file-input/DropZone.jsx";

const dep = [
    { value: "ref", label: "ref" },


];
const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};


const company = () => {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm(
        {
            defaultValues: {
                test: [{ Name: "", email: "" }],
            },
        }
    );

    return (
        <div>
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
                        label="Postal code"
                        type="number"
                        placeholder="Postal code"
                        prepend={<Icon icon="heroicons-outline:qr-code" />}
                        merged
                    />
                    <InputGroup
                        label="Country"
                        type="text"
                        placeholder="Country"
                        prepend={<Icon icon="heroicons-outline:globe-americas" />}
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
                        placeholder="Email"
                        prepend={<Icon icon="heroicons-outline:mail" />}
                        merged
                    />
                    <InputGroup
                        label="Website"
                        id="website"
                        type="text"
                        placeholder="Website"
                        prepend={<Icon icon="heroicons-outline:globe-alt" />}
                        merged
                    />
                    <InputGroup
                        label="Skype"
                        id="Skype"
                        type="url"
                        placeholder="Skype"
                        prepend={<Icon icon="heroicons-outline:user" />}
                        merged
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
        </div>
    );
};

export default company;
