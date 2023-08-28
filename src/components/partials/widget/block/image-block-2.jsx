import React, {useEffect, useState} from "react";
import Image2 from "@/assets/images/all-img/widget-bg-2.png";
import authNameAuth from "@/services/auth/auth.email.js";
import AuthServices from "@/services/auth.services.js";

const ImageBlock2 = () => {

  const [name, setName]=useState();

  const sendUsernameToServer = () => {
      AuthServices.loadUserByUsername(authNameAuth())
          .then(response => {
            setName(response.data.name)
      })
          .catch(error => {
            console.error(error);
          });
  }


  useEffect(()=>{
      sendUsernameToServer()
  },[])
  return (
    <div
      className="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative"
      style={{
        backgroundImage: `url(${Image2})`,
      }}
    >
      <div>
        <h4 className="text-xl font-medium text-white mb-2">
          <span className="block font-normal">Welcome to Numotronic,</span>
          <span className="block">{name}</span>
        </h4>
        <p className="text-sm text-white font-normal">Have a good day</p>
      </div>
    </div>
  );
};

export default ImageBlock2;
