'use client'

import { deleteFile, deleteFilePermanent } from "@/app/lib/imageHandling";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const crossSVG = (
    <svg className="fill-current h-[15px] w-[15px] xs:h-[25px] xs:w-[25px]" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 460.775 460.775">
        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
            c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
            c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
            c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
            l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
            c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
    </svg>
)

export default function DeleteButton({selectedImages, setSelectedImages, permanent}: {selectedImages: string[], setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>, permanent: boolean}) {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const pathname = usePathname();
    if (type === "deleted" && pathname.includes('/fotoverifikation')) {
        return <></>
    }

    return(
        <>
            <button className="btn btn-error w-[125px] h-[50px] xs:w-[180px] xs:h-[80px] bg-white shadow-sm rounded-lg flex items-center text-abi-gray hover:text-white justify-around" onClick={() => {
                if (selectedImages.length == 0) {
                    return;
                }
                handleDeletion(permanent, selectedImages, setSelectedImages, setCurrentImage, router)
            }}>
                <span className="font-semibold text-xl xs:text-2xl">Delete</span>
                {crossSVG}
            </button>
            <DeleteModal currentImage={currentImage} imageCount={selectedImages.length}/>
        </>
    );
}

const handleDeletion = async (permanent: boolean, selectedImages: string[], setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>, setCurrentImage: React.Dispatch<React.SetStateAction<number>>, router: ReturnType<typeof useRouter>) => {
    setCurrentImage(0)
    var modal = document.getElementById(`delete-modal`) as HTMLDialogElement;
    modal.showModal();
    for (var image of selectedImages) {
        var originFolder = image.split("/")[0]
        var student = image.split("/")[1]
        var fileName = image.split("/")[2]
        if (permanent) {
            await deleteFilePermanent(originFolder, student, fileName);
        } else {
            await deleteFile(originFolder, student, fileName)
        }
        setCurrentImage(prev => prev+1)
    }
    setSelectedImages([])
    modal.close()
    router.refresh()
}

function DeleteModal({currentImage, imageCount}: {currentImage: number, imageCount: number}) {
    return(
        <dialog className="modal" id="delete-modal" >
            <div className="modal-box flex flex-col justify-center items-center">
                <span className="font-semibold text-2xl mb-4">Bilder werden gelöscht!</span>
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