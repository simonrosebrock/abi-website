'use client'
import { useState } from "react"
import Image from "next/image";


export default function LehrerSelection() {
    const lehrerList = ["Siebald", "Sommer", "Von Fürstenberg", "Refflinghaus", "Schubowitz"];
    const [disabledLehrer, setDisabledLehrer] = useState<number[]>([]);

    const [selectedIndex, setSelectedIndex] = useState<number>();

    function handleSearch(input: string) {
        var newDisabledLehrer = []
        for (let i = 0; i < lehrerList.length; i++) {
            if(!lehrerList[i].toLowerCase().includes(input.toLowerCase())) {
                newDisabledLehrer.push(i)
            }
        }
        setDisabledLehrer(newDisabledLehrer);
    }


    return(
        <div className="w-[800px] max-w-[800px] h-[400px] flex flex-col">
            <h1 className="text-5xl font-semibold text-abi-black font-serif mb-4 text-center">Lieblings-Lehrer Wahl</h1>
            <div className="flex gap-2">
                <label className="input input-bordered flex items-center gap-2 flex-grow">
                    <input type="text" className="grow" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
                </label>
                <button className="btn bg-white flex rounded-lg border-[1px] border-gray-300 items-center gap-2 pl-2 pr-2">
                    <Image src={"/senden.png"} alt={"senden"} width={25} height={25} className="object-contain"></Image>
                    <span className="text-lg text-gray-400 font-sans">Senden</span>
                </button>
            </div>
            <div className="flex flex-grow bg-white mt-2 rounded-box overflow-auto p-2 gap-2">
                {
                    lehrerList.map((name, index) => (
                        <button className={`btn h-12 border-2  rounded-md  justify-center items-center p-2 
                            ${selectedIndex === index ? "btn-primary text-white": "text-abi-gray bg-white border-gray-300"}
                            ${disabledLehrer.includes(index) ? "hidden": "flex"}`} onClick={() => {
                            setSelectedIndex(index)
                        }}
                        key={`lehrer-${index}`}>
                           <span className="text-xl font-semibold">{name}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
