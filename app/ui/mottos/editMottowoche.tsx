'use client'
import { useState, useRef, useEffect } from "react";
import imageCompression from 'browser-image-compression';
import { updateMottowoche } from "@/app/lib/dbConnection";
import { useRouter } from "next/navigation";
import { toCapitalized } from "@/app/lib/miniFuncs";
import ImageUploadModal from "./imageUploadModal";

type Motto = {type: string, title: string, addition: string, date: string}

export default function EditMottowoche({token, mottowoche, exists}: {token: string, mottowoche: Motto[], exists: boolean[]}) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [fileCount, setFileCount] = useState<number>(0);
    const [currentFile, setCurrentFile] = useState<number>(0);

    const [mottos, setMottos] = useState<Motto[]>(mottowoche);
    const [uploaded, setUploaded] = useState<boolean[]>(exists);
    const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([null, null, null, null, null])
    const router = useRouter();

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
            <form className="flex flex-col gap-5 p-5 bg-white max-w-[1455px]" onSubmit={async (e) => {
                e.preventDefault();
                var localFileCount = 0
                for (var i = 0; i < 5; i++) {
                    const file = uploadedFiles[i];
                    if (file !== null) {
                        localFileCount += 1;
                    }
                }

                
                
                if (JSON.stringify(mottowoche) === JSON.stringify(mottos) && localFileCount === 0) {
                    return;
                }

                if (JSON.stringify(mottowoche) !== JSON.stringify(mottos)) {
                    await updateMottowoche(mottos);
                }

                if (localFileCount > 0) {
                    setFileCount(localFileCount)
                    setCurrentFile(0)
                    modalRef.current?.showModal()
                    await handleUpload(token, setUploaded, uploadedFiles, setCurrentFile, modalRef)
                    modalRef.current?.close()
                }
                setShowToast(true);
                router.refresh();
            }}>
                <h1 className="text-4xl font-semibold text-abi-black font-serif text-left ">Mottowoche</h1>
                <div className="carousel carousel-center gap-4 w-full flex min-h-40 scrollbar-thin">
                    {
                        mottos.map((motto, index) => (
                            <MottoCard
                                key={`${motto}-${index}`}
                                motto={motto}
                                setMottos={setMottos}
                                uploaded={uploaded[index]}
                                setUploaded={setUploaded}
                                setUploadedFiles={setUploadedFiles}
                                index={index}
                            />
                        ))
                    }
                </div>
                <div className="flex justify-between mt-auto">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        setMottos(mottowoche);
                        setUploaded(exists);
                        setUploadedFiles([null, null, null, null, null])
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

function MottoCard({motto, setMottos, uploaded, setUploaded, setUploadedFiles, index}: {motto: Motto, setMottos: React.Dispatch<React.SetStateAction<Motto[]>>, uploaded: boolean, setUploaded: React.Dispatch<React.SetStateAction<boolean[]>>, setUploadedFiles: React.Dispatch<React.SetStateAction<(File | null)[]>>, index: number}) {
    
    const editMottoAtIndex = (field: string, value: string) => {
        setMottos((prevMottos) => {
          const updatedMottos = [...prevMottos];
          updatedMottos[index] = {
            ...updatedMottos[index], 
            [field]: value,
          };
          return updatedMottos; 
        });
    };

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.'); 
        const fullYear = `20${year}`;
        return `${fullYear}-${month}-${day}`;
    };

    const revertDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        const shortYear = year.slice(2, 4);
        return `${day}.${month}.${shortYear}`;
      };

    return(
        <div className="relative carousel-item w-[234px] h-[334px] bg-white rounded-box flex flex-col items-center p-4 overflow-hidden border-black border-2">
            <h1 className="text-2xl font-mono text-abi-black flex justify-center">{toCapitalized(motto.type)}</h1>
            <span className="w-full text-left">Titel</span>
            <label className="input input-bordered flex items-center overflow-auto w-full">
                <input className="w-full" type="text" name='title' placeholder="Titel" value={motto.title} onChange={(e) => {editMottoAtIndex("title", e.target.value)}}/>
            </label>
            <span className="w-full text-left mt-2">Zusatz</span>
            <label className="input input-bordered flex items-center overflow-auto w-full">
                <input className="w-full" type="text" name='addition' placeholder="Zusatz" value={motto.addition} onChange={(e) => {editMottoAtIndex("addition", e.target.value)}}/>
            </label>
            <span className="w-full text-left mt-2">Datum</span>
            <label className="input input-bordered flex items-center overflow-auto w-full">
                <input className="w-full" type="date" name='date' placeholder="Datum" value={formatDate(motto.date)} onChange={(e) => {editMottoAtIndex("date", revertDate(e.target.value))}}/>
            </label>
            <span className="w-full text-left mt-2">Bild</span>
            {
                uploaded ? <div className='flex items-center justify-between'>
                                <span>Ein Bild wurde bereits hochgeladen</span>
                                <button className='btn btn-sm' onClick={() => {
                                    setUploaded((prevUploaded) => {
                                        const updatedUploaded = [...prevUploaded]
                                        updatedUploaded[index] = false;
                                        return(updatedUploaded)
                                    });
                                }}>Bild ändern</button>
                            </div> :
                            <input type="file" name="file" accept=".png, .jpg, .jpeg, .webp" multiple={false} className="file-input file-input-bordered w-full" onChange={(e) => {
                                setUploadedFiles((prev) => {
                                    const updated = [...prev];
                                    if (e.target.files) {
                                        updated[index] = e.target.files[0];
                                    } else {
                                        updated[index] = null;
                                    }
                                    return(updated);
                                })
                            }}/>
            }
        </div>
    )
}

async function handleUpload(token: string, setUploaded: React.Dispatch<React.SetStateAction<boolean[]>>, uploadedFiles: (File | null)[], setCurrentFile: React.Dispatch<React.SetStateAction<number>>, modalRef: React.RefObject<HTMLDialogElement>) {
    const filenameList = ["mottowoche/montag.webp", "mottowoche/dienstag.webp", "mottowoche/mittwoch.webp", "mottowoche/donnerstag.webp", "mottowoche/freitag.webp"];
    for (var i = 0; i < 5; i++) {
        const file = uploadedFiles[i]
        if (!file) {
            continue;
        }
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 500,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.6
        };

        try {
            const compressedFile = await imageCompression(file, options);

            await fetch(`/api/upload?token=${token}&filename=${filenameList[i]}`, {
                method: 'POST',
                headers: { 'content-type': file?.type || 'application/octet-stream'},
                body: compressedFile,
            })
            const index = i;
            setUploaded((prevUploaded) => {
                const updatedUploaded = [...prevUploaded];
                updatedUploaded[index] = true;
                return updatedUploaded;
            });
            
            
            
            setCurrentFile(prev => prev +1)
        } catch (error) {
            console.error('Error during image compression or upload:', error);
        }
    }
}