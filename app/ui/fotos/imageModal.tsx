'use client'
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface ImageModalProps {
  image: string
  token: string
}



export default function ImageModal({ image, token }: ImageModalProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const dialogRef = useRef<HTMLDialogElement>(null)

    const downloadURL = `https://image-proxy.simon-rosebrock.workers.dev/getImage?url=${image}&token=${token}&quality=high`
    const imageName = image.split("/")[2]

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        // Override showModal to update state
        const originalShowModal = dialog.showModal.bind(dialog)
        dialog.showModal = function () {
        setOpen(true)
        originalShowModal()
        }

        // Override close to update state
        const originalClose = dialog.close.bind(dialog)
        dialog.close = function () {
        setOpen(false)
        originalClose()
        }
    }, [])

    return (
        <dialog ref={dialogRef} id={image} className="modal">
            {open && (
                <div className={`${loaded ? "" : "skeleton"} modal-box p-0 relative w-[250px] h-[250px] xs:w-[350px] xs:h-[350px] md:w-[500px] md:h-[500px] overflow-hidden`}>
                    <Image
                    src={downloadURL}
                    alt="image"
                    width={600}
                    height={600}
                    loading="lazy"
                    style={{ objectFit: "contain" }}
                    className={` rounded-lg flex w-[250px] h-[250px] xs:w-[350px] xs:h-[350px] md:w-[500px] md:h-[500px] p-2`}
                    key={image}
                    onLoadingComplete={() => setLoaded(true)}
                    />
                    <a href={downloadURL} download={imageName} className="absolute btn btn-sm xs:btn-md btn-circle right-5 top-5">
                        <Image src={"/download.png"} width={30} height={30} alt="Download" className="w-[20px] h-[20px] xs:w-[30px] xs:h-[30px]"></Image>
                    </a>
                </div>
            )}
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => dialogRef.current?.close()}>close</button>
            </form>
        </dialog>
    )
}
