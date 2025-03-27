'use client'

import Image from "next/image"

export default function AbiMottoDisplay({image, zeile1, zeile2}: {image: string, zeile1: string, zeile2: string}) {
  return(
    <div className="flex flex-col gap-3 mx-5">
      <h1 className="text-6xl font-semibold text-abi-black font-serif text-center ">Abimotto</h1>
      <div className="w-auto max-w-[600px] h-min bg-white shadow-sm rounded-lg p-5 flex flex-col gap-5 border-2 border-solid border-black">
          <div className="flex">
            <Image src={image} alt="abimotto" height={100} width={100} className="h-full mr-5" style={{objectFit: 'contain'}}/>
            <div className="flex flex-col text-2xl xs:text-4xl sm:text-5xl break-words">
                <span>{zeile1}</span>
                <span>{zeile2}</span>
            </div>
          </div>
      </div>
    </div>
    
  )
}