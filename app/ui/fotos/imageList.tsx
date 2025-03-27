'use client'
import Image from "next/image"
import ImageModal from "@/app/ui/fotos/imageModal"
import { GetServerSideProps } from 'next';
import { getCleanUser } from "@/app/lib/miniFuncs";


type imageListType = string[]



export default function ImageList({images, token, proxyUrl}: {images: imageListType, token: string, proxyUrl: string}) {
    if (images.length == 0) {
        return(
            <div className="w-[250px] h-[250px] rounded-lg flex items-center justify-center">
                <span className="font-semibold text-xl text-gray-400">Hier sind keine Bilder!</span>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-5 justify-center sm:justify-normal">
            {
                images.map((image: string) => (
                    <div key={`div/${image}`}>
                        <button className="relative btn bg-white border-2 border-gray-200 w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] rounded-lg flex items-center justify-center"
                        onClick={() => {
                            const modal = document.getElementById(image) as HTMLDialogElement;
                            modal.showModal();
                        }}>
                            <div data-tip={getCleanUser(image.split("/")[1])} className="tooltip tooltip-right absolute w-[50px] h-[25px] xs:w-[60px] xs:h-[30px] sm:w-[80px] sm:h-[40px] rounded-lg flex items-center justify-center bg-white border-2 border-gray-200 left-3 top-3">
                                <span className="text-xs">{
                                    getCleanUser(image.split("/")[1]).split(" ")[0]
                                }</span>
                            </div>
                            <img
                                src={`${proxyUrl}/getImage?url=${image}&token=${token}&quality=low`}
                                alt={``}
                                loading="lazy"
                                style={{maxWidth: 246, maxHeight: 246, objectFit: 'contain'}}
                                className="rounded-md flex w-[121px] h-[121px] xs:w-[146px] xs:h-[146px] sm:w-[196px] sm:h-[196px] lg:w-[246px] lg:h-[246px]"
                                key={image}
                            />
                            
                        </button>
                        <ImageModal image={image} token={token} proxyUrl={proxyUrl}/>
                    </div>
                ))
            }
        </div>
    );
}