'use client'
import Image from "next/image";

export default function AbipulliDisplay({frontUrl, backUrl}: {frontUrl: string, backUrl: string}) {
    return(
        <div className="bg-white shadow-sm rounded-lg p-5 flex flex-col gap-5 max-w-[670px]">
            <h1 className="text-4xl font-semibold text-abi-black font-serif text-left ">Abipulli</h1>
            <div className="flex sm:flex-row flex-col gap-5">
                <div className="flex flex-col border-2 border-gray-300 rounded-lg items-center">
                    <h3 className="text-2xl">Frontseite</h3>
                    <Image src={frontUrl} alt="" width={550} height={750} className="w-[300px] object-cover rounded-md"></Image>
                </div>
                <div className="flex flex-col border-2 border-gray-300 rounded-lg items-center">
                    <h3 className="text-2xl">Rückseite</h3>
                    <Image src={backUrl} alt="" width={550} height={750} className="w-[300px] object-cover rounded-md"></Image>
                </div>
            </div>
        </div>
    );
}