'use client'
import { useState, useEffect } from "react";
import { setFixCost } from "@/app/lib/dbConnection";
import { useRouter } from "next/navigation";

const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
)


type FinanzenTable = {name: string, value: number}[]
type FixCostRow = {name: string, value: number}

export default function EditFixCost({fixCost}: {fixCost: FinanzenTable}) {
    const [localFixCost, setLocalFixCost] = useState<FinanzenTable>(fixCost);
    const [showToast, setShowToast] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (showToast) {
            setIsVisible(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            setTimeout(() => setIsVisible(false), 1000);
        }
    }, [showToast]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLocalFixCost(prevFixCost => {
            const newFixCost = [...prevFixCost];
            newFixCost[index] = { ...newFixCost[index], [name]: value };
            return newFixCost;
        });
    };
        

    return(
        <div className="min-w-[250px] w-[500px] h-[580px] bg-white shadow-sm rounded-lg p-10 flex flex-col">
            <h2 className="text-[#05004E] text-xl mb-4">Fixkosten</h2>
            <div className="flex flex-col overflow-auto scrollbar-none mb-8">
                <div id="ausgaben">
                    {
                        localFixCost.map((row: FixCostRow, index: number) => (
                            <div className="mb-4 xs:flex" key={index}>
                                <label className="input input-bordered flex items-center min-w-[150px]">
                                    <input type="text" name='name' placeholder="Name" className="grow" value={row.name} onChange={e => handleInputChange(index, e)}/>
                                </label>
                                <div className="flex xs:ml-1 xs:w-[170px]">
                                    <label className="input input-bordered flex items-center grow overflow-hidden">
                                        <input type="number" name='value' placeholder="Kosten" className="grow xs:w-14" value={row.value} onChange={e => handleInputChange(index, e)}/>
                                    </label>
                                    <button className="btn btn-error ml-1 shrink-0" onClick={() => {
                                        setLocalFixCost(prevFixCost => {
                                            const newFixCost = [...prevFixCost];
                                            newFixCost.splice(index, 1);
                                            return newFixCost;
                                        });
                                    }}>X</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <button className="btn btn-outline border-gray-300 hover:bg-gray-200" onClick={() => {
                    setLocalFixCost(prevArray => [...prevArray, {name: "", value: 0}])
                }}>
                    {plusSVG}
                </button>
            </div>
            <div className="flex justify-between mt-auto">
                <button className="btn" onClick={() => {
                    setLocalFixCost(fixCost)
                }}>Reset</button>
                <button className="btn" onClick={() => {
                    const localCleanedFixCost = localFixCost.filter(item => !(item.name === "" && item.value === 0)).map(item => ({name: item.name, value: Number(item.value)}));
                    if (JSON.stringify(fixCost) === JSON.stringify(localCleanedFixCost)) {
                        return
                    }
                    setFixCost(localCleanedFixCost);
                    router.refresh();
                    setShowToast(true);
                }}>Speichern</button>
            </div>
            <div className="toast fixed bottom-10 left-1/2 -translate-x-1/2">
                {isVisible && (
                    <div 
                        className={`px-4 py-2 rounded-lg shadow-lg alert alert-success flex justify-center items-center 
                            transition-all ease-out
                            ${showToast ? "opacity-100 scale-100 duration-150" : "opacity-0 scale-95 duration-1000"}`}
                    >
                        <span>Gespeichert!</span>
                    </div>
                )}
            </div>
        </div>
    )
}