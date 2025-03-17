'use client'

import Image from "next/image";

export default function DownloadButton({token}: {token: string}) {
    const serverURL = "https://image-proxy.simon-rosebrock.workers.dev"
    return(
        <>
            <a className="btn xs:w-[200px] xs:h-[80px] w-[250px] h-[50px] bg-white shadow-sm rounded-lg flex justify-center items-center" href={`${serverURL}/download?token=${token}`}>
                <span className="font-semibold text-2xl">Download</span>
                <Image src={"/download.png"} width={30} height={30} alt="Download" className="w-[20px] h-[20px] xs:w-[30px] xs:h-[30px]"></Image>
            </a>
        </>
    );
}