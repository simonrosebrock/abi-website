'use client'
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from "react";
import ImageUploadModal from './imageUploadModal';

export default function EditAbipulli({token, exists1, exists2}: {token: string, exists1: boolean, exists2: boolean}) {
    const inputFileRef1 = useRef<HTMLInputElement>(null);
    const inputFileRef2 = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const modalRef = useRef<HTMLDialogElement>(null);
    const [uploaded1, setUploaded1] = useState<boolean>(exists1);
    const [uploaded2, setUploaded2] = useState<boolean>(exists2);

    const router = useRouter()
    const [fileCount, setFileCount] = useState<number>(0);
    const [currentFile, setCurrentFile] = useState<number>(0);

    const [showToast, setShowToast] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (showToast) {
            setIsVisible(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            setTimeout(() => setIsVisible(false), 1000);
        }
    }, [showToast]);

    return(
        <>
            <ImageUploadModal ref={modalRef} fileCount={fileCount} currentFile={currentFile}/>
            <form ref={formRef} onSubmit={async (e) => {
                e.preventDefault();
                if (!inputFileRef1.current?.files && !inputFileRef2.current?.files) {
                    return;
                }

                if (!!inputFileRef1.current?.files !== !!inputFileRef2.current?.files) {
                    setFileCount(1)
                } else {
                    setFileCount(2)
                }

                
                if (modalRef.current) {
                    modalRef.current.showModal()
                }


                if (inputFileRef1.current?.files) {
                    const file1 = inputFileRef1.current?.files[0]
                    await handleUpload(token, "abipulli_front.webp", setUploaded1, file1);
                    setCurrentFile(prev => prev+1)
                }
                
                if (inputFileRef2.current?.files) {
                    const file2 = inputFileRef2.current?.files[0]
                    await handleUpload(token, "abipulli_back.webp", setUploaded2, file2);
                    setCurrentFile(prev => prev+1)
                }

                if (modalRef.current) {
                    modalRef.current.close()
                }
                
                router.refresh()
                setShowToast(true);
            }} className="w-auto max-w-[500px] h-min bg-white shadow-sm rounded-lg p-5 flex flex-col gap-5">
                <h1 className="text-2xl font-semibold text-abi-black font-serif text-left ">Abipulli</h1>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-semibold'>Vorderseite</h2>
                    {
                        uploaded1 ? <div className='flex items-center justify-between'>
                                        <span>Ein Bild wurde bereits hochgeladen</span>
                                        <button className='btn btn-sm' onClick={() => {
                                            setUploaded1(false);
                                        }}>Bild ändern</button>
                                    </div> :
                                    <input ref={inputFileRef1} type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={false} className="file-input file-input-bordered w-full"/>
                    }
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-semibold'>Rückseite</h2>
                    {
                        uploaded2 ? <div className='flex items-center justify-between'>
                                        <span>Ein Bild wurde bereits hochgeladen</span>
                                        <button className='btn btn-sm' onClick={() => {
                                            setUploaded2(false);
                                        }}>Bild ändern</button>
                                    </div> :
                                    <input ref={inputFileRef2} type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={false} className="file-input file-input-bordered w-full"/>
                    }
                </div>
                
                
                <div className="flex justify-between mt-auto">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        formRef.current?.reset();
                        if (inputFileRef1.current) {
                            inputFileRef1.current.value = "";
                        }
                        setUploaded1(true);
                        if (inputFileRef2.current) {
                            inputFileRef2.current.value = "";
                        }
                        setUploaded2(true);
                    }}>Reset</button>
                    <button className="btn">Speichern</button>
                </div>
                {isVisible && (
                    <div 
                        className={`px-4 py-2 rounded-lg shadow-lg alert alert-success flex justify-center items-center 
                            transition-all ease-out
                            ${showToast ? "opacity-100 scale-100 duration-150" : "opacity-0 scale-95 duration-1000"}`}
                    >
                        <span>Gespeichert!</span>
                    </div>
                )}
            </form>
        </>
    )
}

async function handleUpload(token: string, filename: string, setUploaded: React.Dispatch<React.SetStateAction<boolean>>, file: File) {

    const options = {
        maxSizeMB: 0.5,          // Limit the file size to 1 MB
        maxWidthOrHeight: 800, // Limit width or height to 800px
        useWebWorker: true,    // Use web worker for performance
        fileType: 'image/webp', // Convert to WebP
        initialQuality: 0.6    // Adjust quality (lower is more compression)
    };

    try {
        const compressedFile = await imageCompression(file, options);

        await fetch(`/api/upload?token=${token}&filename=${filename}`, {
            method: 'POST',
            headers: { 'content-type': file?.type || 'application/octet-stream'},
            body: compressedFile,
        })

        setUploaded(true);
    } catch (error) {
        console.error('Error during image compression or upload:', error);
    }
}