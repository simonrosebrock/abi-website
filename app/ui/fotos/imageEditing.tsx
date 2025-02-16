'use client'
import StudentSelection from "./studentSelection"
import DeleteButton from "./deleteButton"
import VerifyButton from "./verifyButton"
import ZipButton from "./zipButton"
import ImageListSelection from "./imageListSelection"
import { useState } from "react"

export default function ImageEditing ({images, token, studentEntries, fileCount}: {images: string[], token: string,studentEntries: string[], fileCount: {[key: string]: number}}) {
    const [selectedImages, setSelectedImages] = useState<string[]>([])

    return(
        <>
            <div className="flex flex-wrap w-auto gap-5 items-center mb-5 justify-center sm:justify-normal">
                <StudentSelection studentEntries={studentEntries} fileCount={fileCount} />
                <DeleteButton selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
                <VerifyButton selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
                <ZipButton/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                <ImageListSelection images={images} token={token} setSelectedImages={setSelectedImages}/>
            </div>
        </>
    )
}