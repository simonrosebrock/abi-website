'use client'
import imageCompression from 'browser-image-compression';
import { useRef, useState, useEffect } from "react";
import { setAbimotto } from '@/app/lib/dbConnection';
import { useRouter } from 'next/navigation';
import ImageUploadModal from '@/app/ui/mottos/imageUploadModal';

export default function EditAbimotto({token, exists, zeile1, zeile2}: {token: string, exists: boolean, zeile1: string, zeile2: string}) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [uploaded, setUploaded] = useState<boolean>(exists);

    const modalRef = useRef<HTMLDialogElement>(null);
    const [fileCount, setFileCount] = useState<number>(0);
    const [currentFile, setCurrentFile] = useState<number>(0);

    const [localZeile1, setLocalZeile1] = useState<string>(zeile1);
    const [localZeile2, setLocalZeile2] = useState<string>(zeile2);

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
            <form onSubmit={async (e) => {
                e.preventDefault();
                if (localZeile1 === zeile1 && localZeile2 === zeile2 && !inputFileRef.current?.files) {
                    return;
                }

                if (localZeile1 !== zeile1 || localZeile2 !== zeile2) {
                    await setAbimotto(localZeile1.trim(), localZeile2.trim(), "")
                }
                
                if (inputFileRef.current?.files) {
                    const file = inputFileRef.current.files[0];
                    setFileCount(1)
                    setCurrentFile(0)

                    if (modalRef.current) {
                        modalRef.current.showModal();
                    }

                    const options = {
                        maxSizeMB: 0.5,          // Limit the file size to 1 MB
                        maxWidthOrHeight: 800, // Limit width or height to 800px
                        useWebWorker: true,    // Use web worker for performance
                        fileType: 'image/webp', // Convert to WebP
                        initialQuality: 0.6    // Adjust quality (lower is more compression)
                    };

                    try {
                        const compressedFile = await imageCompression(file, options);
            
                        await fetch(`/api/upload?token=${token}&filename=abimotto.webp`, {
                            method: 'POST',
                            headers: { 'content-type': file?.type || 'application/octet-stream'},
                            body: compressedFile,
                        })
                        setCurrentFile(prev => prev+1)
                        setUploaded(true);
                        if (modalRef.current) {
                            modalRef.current.close();
                        }
                    } catch (error) {
                        console.error('Error during image compression or upload:', error);
                    }
                }
                router.refresh()
                setShowToast(true);
            }} className="w-auto max-w-[500px] h-min bg-white shadow-sm rounded-lg p-5 flex flex-col gap-5">
                <h1 className="text-2xl font-semibold text-abi-black font-serif text-left ">Abimotto</h1>
                <div className="flex flex-col gap-3">
                    <label className="input input-bordered flex items-center overflow-auto">
                        <input className='w-full' type="text" name='abimotto_1' placeholder="Zeile 1" value={localZeile1} onChange={(e) => {setLocalZeile1(e.target.value)}}/>
                    </label>
                    <label className="input input-bordered flex items-center overflow-auto">
                        <input className='w-full' type="text" name='abimotto_2' placeholder="Zeile 2" value={localZeile2} onChange={(e) => {setLocalZeile2(e.target.value)}}/>
                    </label>
                </div>
                <h1 className="text-2xl font-semibold text-abi-black font-serif text-left m-0">Abimotto Bild</h1>
                {
                    uploaded ? <div className='flex items-center justify-between'>
                                    <span>Ein Bild wurde bereits hochgeladen</span>
                                    <button className='btn btn-sm' onClick={() => {
                                        setUploaded(false);
                                    }}>Bild ändern</button>
                                </div> :
                                <input ref={inputFileRef} type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={false} className="file-input file-input-bordered w-full"/>
                }
                <div className="flex justify-between mt-auto">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        setUploaded(exists);
                        setLocalZeile1(zeile1);
                        setLocalZeile2(zeile2);
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