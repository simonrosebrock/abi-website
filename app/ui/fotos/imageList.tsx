'use client'
import Image from "next/image"


type imageListType = string[]

export default function ImageList({images}: {images: imageListType}) {
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
                    <div className="w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] rounded-lg flex items-center justify-center" key={`div/${image}`}>
                        <Image
                        src={`/api/getImage?url=${image}`}
                        alt={`image`}
                        width={250}
                        height={250}
                        loading="lazy"
                        style={{maxWidth: 250, maxHeight: 250, objectFit: 'contain'}}
                        className="rounded-lg flex w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]"
                        key={image}
                        />
                    </div>
                    
                ))
            }
        </div>
    );
}