'use client'
import Image from "next/image"
import { getCleanUser } from "@/app/lib/miniFuncs"

type imageListType = string[]



export default function ImageListSelection({images, token, setSelectedImages, showName}: {images: imageListType, token: string, setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>, showName: boolean}) {
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
                    <div className="relative bg-white border-2 border-gray-200 w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] rounded-lg flex items-center justify-center" key={`div/${image}`}
                        onClick={(e) => {
                            if ((e.target as HTMLElement).tagName === "INPUT") return;
                    
                            const checkbox = e.currentTarget.querySelector("input[type='checkbox']") as HTMLInputElement;
                            if (!checkbox) {
                                return;
                            }
                            if (checkbox.checked) {
                                checkbox.checked = false;
                                setSelectedImages(prevImages => prevImages.filter(img => img !== image))
                            } else {
                                checkbox.checked = true;
                                setSelectedImages(prevImages => [...prevImages, image])
                            }
                    }}>
                        {
                            showName ? <div data-tip={getCleanUser(image.split("/")[1])} className="tooltip tooltip-right absolute w-[50px] h-[25px] xs:w-[60px] xs:h-[30px] sm:w-[80px] sm:h-[40px] rounded-lg flex items-center justify-center bg-white border-2 border-gray-200 left-3 top-3">
                                            <span className="text-xs">{
                                                getCleanUser(image.split("/")[1]).split(" ")[0]
                                            }</span>
                                        </div> : <></>
                        }
                        
                        <input type="checkbox" defaultChecked={false} className="checkbox checkbox-primary bg-white absolute right-3 top-3" />
                        <img
                            src={`https://image-proxy.simon-rosebrock.workers.dev/getImage?url=${image}&token=${token}&quality=low`}
                            alt={``}
                            loading="lazy"
                            style={{maxWidth: 250, maxHeight: 250, objectFit: 'contain'}}
                            className="rounded-lg flex w-[121px] h-[121px] xs:w-[146px] xs:h-[146px] sm:w-[196px] sm:h-[196px] lg:w-[246px] lg:h-[246px]"
                            key={image}
                        />
                    </div>
                    
                ))
            }
        </div>
    );
}