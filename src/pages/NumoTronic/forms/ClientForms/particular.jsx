import React, { useState } from "react";

import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const FormValidationSchema = yup
    .object({
        name: yup.string().required("The First name is required"),
    })


const particular = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <Card title="Create particular company">
                <div className="space-y-4">
                    <form   onSubmit={handleSubmit(onSubmit)}>
                        <Textinput
                            register={register}
                            error={errors.name}
                            label="Name"
                            type="text"
                            name="name"
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
                            label="Postal code"
                            type="number"
                            placeholder="Postal code"
                            prepend={<Icon icon="heroicons-outline:qr-code" />}
                            merged
                        />
                        <InputGroup
                            label="Country"
                            type="country"
                            placeholder="Country"
                            prepend={<Icon icon="heroicons-outline:globe-americas" />}
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
                    </form>
                </div>

            </Card>
        </div>
    );
};

export default particular;
