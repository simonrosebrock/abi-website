'use client'

import Image from "next/image";
import Link from "next/link";

export default function DownloadButton() {
    return(
        <>
            <Link className="btn xs:w-[200px] xs:h-[80px] w-[250px] h-[50px] bg-white shadow-sm rounded-lg flex justify-center items-center" href={"/api/download"}>
                <span className="font-semibold text-2xl">Download</span>
                <Image src={"/download.png"} width={30} height={30} alt="Download" className="w-[20px] h-[20px] xs:w-[30px] xs:h-[30px]"></Image>
            </Link>
        </>
    );
}