'use client'
import Image from "next/image"
import ImageModal from "@/app/ui/fotos/imageModal"


type imageListType = string[]

export default function ImageList({images, token}: {images: imageListType, token: string}) {

    if (images.length == 0) {
        return(
            <div className="w-[250px] h-[250px] rounded-lg flex items-center justify-center">
                <span className="font-semibold text-xl text-gray-400">Hier sind keine Bilder!</span>
            </div>
        )
    }
    const serverURL = "https://image-proxy.simon-rosebrock.workers.dev"

    return (
        <div className="flex flex-wrap gap-5 justify-center sm:justify-normal">
            {
                images.map((image: string) => (
                    <div key={`div/${image}`}>
                        <button className="btn bg-white border-2 border-gray-200 w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] rounded-lg flex items-center justify-center"
                        onClick={() => {
                            const modal = document.getElementById(image) as HTMLDialogElement;
                            modal.showModal();
                        }}>
                            <img
                                src={`${serverURL}/getImage?url=${image}&token=${token}&quality=low`}
                                alt={``}
                                loading="lazy"
                                style={{maxWidth: 246, maxHeight: 246, objectFit: 'contain'}}
                                className="rounded-md flex w-[121px] h-[121px] xs:w-[146px] xs:h-[146px] sm:w-[196px] sm:h-[196px] lg:w-[246px] lg:h-[246px]"
                                key={image}
                            />
                            
                        </button>
                        <ImageModal image={image} token={token} />
                    </div>
                ))
            }
        </div>
    );
}