import React from "react";
import { useDropzone } from "react-dropzone";
import uploadSvgImage from "@/assets/images/svg/upload.svg";

const DropConfig = ({ onIniFileSelected }) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        accept: ".ini",
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            const text = await file.text();
            onIniFileSelected(text);
        },
    });

    return (
        <div>
            <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center">
                <div {...getRootProps({ className: "dropzone" })}>
                    <input className="hidden" {...getInputProps()} />
                    <img src={uploadSvgImage} alt="" className="mx-auto mb-4" />
                    {isDragAccept ? (
                        <p className="text-sm text-slate-500 dark:text-slate-300 ">
                            Drop the .ini file here ...
                        </p>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                            Drop your .ini file
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropConfig;
