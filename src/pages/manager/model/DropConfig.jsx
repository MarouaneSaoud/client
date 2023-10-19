import React from "react";
import { useDropzone } from "react-dropzone";
import uploadSvgImage from "@/assets/images/svg/upload.svg";

const DropConfig = ({ onIniFileSelected }) => {
    // Utilisation du composant useDropzone pour gérer le glisser-déposer de fichiers
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        accept: ".ini", // Accepte uniquement les fichiers avec l'extension .ini
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            const text = await file.text();
            onIniFileSelected(text,file.name); // Appelle la fonction onIniFileSelected avec le contenu du fichier .ini
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
                            Déposez le fichier .ini ici ...
                        </p>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                            Déposez votre fichier .ini
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropConfig;
