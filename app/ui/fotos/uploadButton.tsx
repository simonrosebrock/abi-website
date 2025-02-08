'use client'

import Image from "next/image";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
//import { uploadFile } from "@/app/lib/fileHandling";



export default function UploadButton({user} : {user: string}) {
    return(
        <>
            <button className="btn w-[250px] xs:w-[180px] h-[50px] xs:h-[80px] bg-white shadow-sm rounded-lg flex justify-center items-center" onClick={() => {
                var modal = document.getElementById(`upload-modal`) as HTMLDialogElement;
                console.log(modal)
                if(modal) {modal.showModal()}
            }}>
                <span className="font-semibold text-xl xs:text-2xl">Upload</span>
                <Image src={"/upload.png"} width={30} height={30} alt="Upload" className="w-[20px] h-[20px] xs:w-[30px] xs:h-[30px]"></Image>
            </button>
            <UploadModal user={user}/>
        </>
    );
}

//w-[250px] h-[250px] bg-white shadow-sm rounded-lg
function UploadModal({user} : {user: string}) {
    const router = useRouter()
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname()
    return(
        <dialog className="modal" id="upload-modal" >
            <div className="modal-box">
                <UploadForm user={user}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    router.push(pathname+"?"+params.toString())
                }}>close</button>
            </form>
        </dialog>
    );
}

function UploadForm({user} : {user: string}) {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [currentFile, setCurrentFile] = useState<number>(0);
    const [currentState, setCurrentState] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(true);
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

    const handleFileSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        if (selectedFiles === null) {
            setCurrentState(`Wähle zuerst Bilder aus!`);
            return;
        }

        setIsVisible(false);
        
        for (const file of (Array.from(selectedFiles as FileList))) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await fetch('/api/uploadFile', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'student': user, 
                    }
                });
                setCurrentFile((prev) => prev + 1)
            } catch (error) {
                console.error('Fetch error:', error);
            }
            
        }
        
        var modal = document.getElementById(`upload-modal`) as HTMLDialogElement; 
        if(modal) {modal.close()}
        setIsVisible(true)
        setCurrentFile(0)
        setCurrentState("");

        router.refresh()
    }
    
    if (isVisible) {
        return(
            <form onSubmit={handleFileSubmit}>
                <input type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={true} onChange={handleFileChange} className="file-input file-input-bordered w-full"/>
                <div className="flex mt-6 items-center">
                    { isVisible ?  <button type="submit" className="btn">Upload</button> : <></>}
                    
                    <span className="ml-auto">{currentState}</span>
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
    
}

