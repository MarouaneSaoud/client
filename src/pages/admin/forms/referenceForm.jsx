import React from "react";
import Textinput from "@/components/ui/Textinput.jsx";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ReferenceForm({visible, onClose}){
    const handleClose=(e)=>{
        if(e.target.id==='container')
        onClose()
    }
    if(!visible)
        return null;
    return(
      <div onClick={handleClose}
           id="container"
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center drop-shadow-2xl">


              <Card
                  title="Add Reference">
                  <form >
                          <div
                              className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"

                          >
                              <Textinput
                                  label="Name"
                                  type="text"
                                  placeholder="Name"
                              />
                          </div>


                      <div className="ltr:text-right rtl:text-left">
                          <Button text="Submit" className="btn-dark" />
                      </div>
                  </form>
              </Card>

      </div>
    );
}