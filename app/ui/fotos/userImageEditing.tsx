'use client'

import { useState } from "react"
import UploadButton from "./uploadButton"
import TypeSelection from "./typeSelection"
import ImageListSelection from "./imageListSelection"
import DeleteButton from "./deleteButton"

export default function UserImageEditing({images, token}: {images: string[], token: string}) {
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    
    return (
        <>
            <div className="flex w-auto gap-5 items-center mb-5 flex-wrap justify-center xs:justify-normal">
                <UploadButton token={token}/>
                <TypeSelection setSelectedImages={setSelectedImages}/>
                <DeleteButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} permanent={true}/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                {/* <ImageList images={images} token={token}/> */}
                <ImageListSelection images={images} token={token} setSelectedImages={setSelectedImages} showName={false} />
            </div>
        </>
    )
}