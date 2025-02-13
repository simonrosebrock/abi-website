'use client'
import Image from "next/image"

export default function AbiMottoDisplay() {
  return(
    <div className="w-[400px] sm:w-[600px] md:w-[800px] h-auto min-h-[400px] bg-white flex rounded-box border-2 border-black md ml-2 mr-2">
      <div className="hidden sm:flex h-full justify-center items-center ml-[30px] pt-[30px] pb-[30px]">
        <div className="border-2 border-gray-300 rounded-box h-full w-[250px] flex justify-center items-center">
            <Image src={"/ChatGPT-Logo.png"} alt="image" width={150} height={150}/>
        </div>
      </div>
        
        <div className="relative flex flex-col ml-10 mt-[30px] text-6xl font-mono">
            <h1 className="text-5xl font-semibold text-abi-black font-serif text-left ">Abimotto</h1>
            <div className="flex mt-10 z-10">
                <span className="">A</span>
                <span className="ml-[4px]">I-tur,</span>
            </div>
            <span className="absolute text-gray-300 top-[88px] left-[20px] z-0">B</span>
            <span className="">danke ChatGPT!</span>
            <div className="md:mt-5">
              <Chat/>
            </div>
        </div>
    </div>
  )
}


export function Chat() {
  return(
    <div className="text-sm relative h-[150px] md:h-[130px]">
      <div className="chat chat-end absolute right-0">
      <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="avatar"
              src="/thg-media.jpg" />
          </div>
        </div>
        <div className="chat-header">THG</div>
        <div className="chat-bubble w-[200px]"></div>
      </div> 
      <div className="chat chat-start absolute top-16 md:top-12">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="avatar"
              src="/ChatGPT-Logo.png" />
          </div>
        </div>
        <div className="chat-header">ChatGPT</div>
        <div className="chat-bubble w-[150px]"></div>
      </div>
    </div>
  )
}