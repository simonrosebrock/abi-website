'use client'
import Image from "next/image"


type imageListType = string[]

export default function ImageList({images, token}: {images: imageListType, token: string}) {

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
                    <div className="bg-white border-2 border-gray-200 w-[125px] h-[125px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] rounded-lg flex items-center justify-center" key={`div/${image}`}>
                        <Image
                            src={`/api/getImage?url=${image}&token=${token}`}
                            alt={`image`}
                            width={246}
                            height={246}
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