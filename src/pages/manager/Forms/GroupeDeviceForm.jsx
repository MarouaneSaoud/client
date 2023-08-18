import React, {useEffect, useState} from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GroupeService from "../../../services/groupeDevice.services";
import {toast} from "react-toastify";


export default function ReferenceForm({visible, onClose}){
    const [name,setName]=useState({});

    const handleClose=(e)=>{
        if(e.target.id==='container')
            onClose()
    }

    async function submitHandler(e) {
        e.target.reset();
        e.preventDefault();
        const ref={name:name}
        console.log(ref)
        await GroupeService.addDeviceGroup(ref).then(response=>{
            if (response.status === 200) {
                onClose()
            }
        })
            .catch(error=>{
                if (error.response) {
                    toast.error("error", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })

    }

    if(!visible)
        return null;

    return(
        <div onClick={handleClose}
             id="container"
             className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl">


            <Card
                title="Add Group">
                <form onSubmit={submitHandler}>
                    <div
                        className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                    >
                        <Textinput
                            onChange={(e)=>setName(e.target.value)}
                            label="Group Name"
                            type="text"
                            placeholder="Add Group Name"
                        />
                    </div>
                    <div className="ltr:text-right rtl:text-left">
                        <Button type="submit" text="Submit" className="btn-dark" />
                    </div>
                </form>
            </Card>

        </div>
    );
}