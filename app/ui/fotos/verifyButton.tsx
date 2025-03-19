'use client'

import { verifyFile } from "@/app/lib/imageHandling";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const checkSVG = (
    <svg className="fill-current h-[25px] w-[25px] xs:h-[40px] xs:w-[40px]" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z"/>
    </svg>
)

export default function VerifyButton({selectedImages, setSelectedImages}: {selectedImages: string[], setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>}) {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    if (type === "verified") {
        return <></>
    }

    return(
        <>
            <button className="btn btn-success w-[125px] h-[50px] xs:w-[180px] xs:h-[80px] bg-white shadow-sm rounded-lg flex flex-nowrap items-center text-abi-gray hover:text-white justify-around" onClick={() => {
                if (selectedImages.length == 0) {
                    return;
                }
                handleVerification(selectedImages, setSelectedImages, setCurrentImage, router)
            }}>
                <span className="font-semibold text-xl xs:text-2xl">Verify</span>
                {checkSVG}
            </button>
            <VerifyModal currentImage={currentImage} imageCount={selectedImages.length}/>
        </>
        
    );
}

const handleVerification = async (selectedImages: string[], setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>, setCurrentImage: React.Dispatch<React.SetStateAction<number>>, router: ReturnType<typeof useRouter>) => {
    setCurrentImage(0)
    var modal = document.getElementById(`verify-modal`) as HTMLDialogElement;
    modal.showModal();
    for (var image of selectedImages) {
        var originFolder = image.split("/")[0]
        var student = image.split("/")[1]
        var fileName = image.split("/")[2]
        await verifyFile(originFolder, student, fileName)
        setCurrentImage(prev => prev+1)
    }
    setSelectedImages([])
    modal.close()
    router.refresh()
}

function VerifyModal({currentImage, imageCount}: {currentImage: number, imageCount: number}) {
    return(
        <dialog className="modal" id="verify-modal" >
            <div className="modal-box flex flex-col justify-center items-center">
                <span className="font-semibold text-2xl mb-4">Bilder werden verifiziert!</span>
                <progress className="progress progress-primary w-56 h-3" value={`${currentImage}`} max={`${imageCount}`}></progress>
                <span>{currentImage + "/" + imageCount}</span>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    
                }}>close</button>
            </form>
        </dialog>
    );
}