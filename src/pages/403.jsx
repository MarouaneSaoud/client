 import React from "react";
import { Link } from "react-router-dom";

import ErrorImage from "@/assets/images/all-img/403.png";
function Error() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <img src={ErrorImage} alt="" className="h-80"/>
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4">
          Page not authorized
        </h4>
        <div className="dark:text-white text-base font-normal mb-10">
            You may not have the necessary permissions to access it.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          to="/"
          className="btn btn-dark dark:bg-slate-800 block text-center"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default Error;
