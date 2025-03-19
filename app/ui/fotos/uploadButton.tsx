'use client'

import Image from "next/image";
import  React, { ChangeEvent, FormEvent, useState, useRef, useImperativeHandle, forwardRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";



export default function UploadButton({token} : {token: string}) {
    return(
        <>
            <button className="btn w-[250px] xs:w-[180px] h-[50px] xs:h-[80px] bg-white shadow-sm rounded-lg flex justify-center items-center" onClick={() => {
                var modal = document.getElementById(`upload-modal`) as HTMLDialogElement;
                if(modal) {modal.showModal()}
            }}>
                <span className="font-semibold text-xl xs:text-2xl">Upload</span>
                <Image src={"/upload.png"} width={30} height={30} alt="Upload" className="w-[20px] h-[20px] xs:w-[30px] xs:h-[30px]"></Image>
            </button>
            <UploadModal token={token}/>
        </>
    );
}

function UploadModal({token} : {token: string}) {
    const uploadFormRef = useRef<any>(null);
    const router = useRouter()
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname()
    return(
        <dialog className="modal" id="upload-modal" >
            <div className="modal-box">
                <UploadForm ref={uploadFormRef} token={token}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    uploadFormRef.current?.reset();
                    router.push(pathname+"?"+params.toString())
                }}>close</button>
            </form>
        </dialog>
    );
}
interface UploadFormProps {
    token: string;
  }
  
  // Define the ref type to access the reset method
  interface UploadFormRef {
    reset: () => void;
  }
  
const UploadForm = forwardRef<UploadFormRef, UploadFormProps>(({ token }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [currentFile, setCurrentFile] = useState<number>(0);
    const [currentState, setCurrentState] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [hasRights, setHasRights] = useState<boolean>(true);
    const [allowSharing, setAllowSharing] = useState<boolean>(true);
    const [selectedRights, setSelectedRights] = useState<boolean>(false);
    const [selectedSharing, setSelectedSharing] = useState<boolean>(false);


    const formRef = useRef<HTMLFormElement | null>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            reset();
        }
      }));
    function reset() {
        if (formRef.current) {
            formRef.current.reset();
          }
        setSelectedFiles(null);
        setCurrentFile(0);
        setCurrentState("");
        setIsVisible(true);
        setHasRights(true);
        setAllowSharing(true);
        setSelectedRights(false);
        setSelectedSharing(false);
    }

    const router = useRouter()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            if (files.length > 50) {
                setCurrentState(`Du kannst maximal 50 Bilder hochladen!`);
                setSelectedFiles(null);
                return;
            }
            setIsVisible(true);
            setCurrentState("");
            setSelectedFiles(files);
            if (selectedFiles != null) {
                console.log((selectedFiles as FileList)[0])
            }
        }
    };

    const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (selectedFiles === null) {
            setCurrentState(`Wähle zuerst Bilder aus!`);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const hasRights = formData.get("hasRights") === "on";
        const allowSharing = formData.get("allowSharing") === "on";

        setHasRights(hasRights)
        setAllowSharing(allowSharing)

        if (!hasRights || !allowSharing) {
            setCurrentState(`Bitte akzeptiere alle Bedingungen!`);
            return;
        }


        setIsVisible(false);
        const serverURL = "/api" //ich benutzte hier lieber die lokale API, (scheint schneller zu sein)
        for (const file of (Array.from(selectedFiles as FileList))) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await fetch(`${serverURL}/uploadFile?token=${token}`, {
                    method: 'POST',
                    body: formData,
                });
                
                setCurrentFile((prev) => prev + 1)
            } catch (error) {
                console.error('Fetch error:', error);
            }
            
        }
        
        var modal = document.getElementById(`upload-modal`) as HTMLDialogElement; 
        if(modal) {modal.close()}
        reset()
        

        router.refresh()
    }
    

    if (isVisible) {
        return(
            <form onSubmit={handleFileSubmit} ref={formRef}>
                <input type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={true} onChange={handleFileChange} className="file-input file-input-bordered w-full"/>
                <div className="flex flex-col mt-6 items-center">
                    <div className="flex ">
                        <button type="submit" className={`flex btn mr-4 ${(selectedRights && selectedSharing && selectedFiles) ? "btn-success" : ""}`}>Upload</button>
                        <div className="flex flex-col ">
                            <div className="flex gap-2">
                                <input type="checkbox" name="hasRights" onClick={(e) => {setSelectedRights((e.target as HTMLInputElement).checked)}} className={`${hasRights ? "" : "border-red-600 checked:border-gray-400"} checkbox [--chkbg:theme(colors.gray.500)] [--chkfg:white] scale-90`}/>
                                <span className="">Ich erkläre, dass ich die Rechte an den hochgeladenen Bildern besitze und dass keine Persönlichkeitsrechte verletzt werden.</span>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                                <input type="checkbox" name="allowSharing" onClick={(e) => {setSelectedSharing((e.target as HTMLInputElement).checked)}} className={`${allowSharing ? "" : "border-red-600 checked:border-gray-400"} checkbox [--chkbg:theme(colors.gray.500)] [--chkfg:white] scale-90`} />
                                <span className="">Ich stimme zu, dass die Bilder von der gesamten Stufe eingesehen und geteilt werden können.</span>
                            </div>
                        </div>
                    </div>
                    
                    <span className={`text-red-600 font-semibold ${currentState==="" ? "" : "mt-4"}`}>{currentState}</span>
                </div>
            </form>
        );
    }
    return(
        <div className="flex flex-col items-center">
            <h2 className="font-bold text-xl text-abi-black mb-4">Uploading</h2>
            <progress className="progress progress-primary w-56 h-3" value={`${currentFile}`} max={`${(selectedFiles as FileList).length}`}></progress>
            <span>{currentFile + "/" + (selectedFiles as FileList).length}</span>
        </div>
    )
    
});

UploadForm.displayName = 'UploadForm';
