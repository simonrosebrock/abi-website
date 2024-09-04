'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCheckpoints, updateFinanzen } from "@/app/lib/dbConnection";

const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
)

type CheckpointsTable = {money: number, cardprice: number}[]
type CheckpointRow = {money: number, cardprice: number}
type AusgabenRow = {name: string, money: number}

export default function EditCardPrices({excessGoal, checkpoints}: {excessGoal: number, checkpoints: CheckpointsTable}) {
    const [localCheckpoints, setLocalCheckpoints] = useState(checkpoints);
    const [localGoal, setLocalGoal] = useState(excessGoal);
    const router = useRouter();

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLocalCheckpoints(prevCheckpoints => {
          const newCheckpoints = [...prevCheckpoints];
          newCheckpoints[index] = { ...newCheckpoints[index], [name]: value };
          return newCheckpoints;
        });
      };
    
    
    
    return(
        <div className="min-w-[250px] w-[500px] h-[580px] bg-white shadow-sm rounded-lg p-10 flex flex-col">
            <div className="flex flex-col overflow-auto scrollbar-none mb-8">
                <h2 className="text-[#05004E] text-xl mb-4">Überschuss Ziel</h2>
                <div>
                    <label className="input input-bordered flex items-center">
                        <input type="number" name='einnahmen' placeholder="Einnahmen" className="grow" value={localGoal} onChange={e => {
                            const { name, value } = e.target;
                            setLocalGoal(Number(value));
                        }}/>
                    </label>
                </div>
                
                <div className="divider mt-4 mb-4"></div>
                <h2 className="text-[#05004E] text-xl mb-4">Zwischenziele</h2>
                <div id="ausgaben">
                    {
                        localCheckpoints.map((row: CheckpointRow, index: number) => (
                            <div className="mb-4 xs:flex" key={index}>
                                <label className="input input-bordered flex items-center min-w-[150px]">
                                    <input type="text" name='money' placeholder="Name" className="grow" value={row.money} onChange={e => handleInputChange(index, e)}/>
                                </label>
                                <div className="flex xs:ml-1 xs:w-[170px]">
                                    <label className="input input-bordered flex items-center grow overflow-hidden">
                                        <input type="number" name='cardprice' placeholder="Kosten" className="grow xs:w-14" value={row.cardprice} onChange={e => handleInputChange(index, e)}/>
                                    </label>
                                    <button className="btn btn-error ml-1 shrink-0" onClick={() => {
                                        setLocalCheckpoints(prevCheckpoints => {
                                            const newCheckpoints = [...prevCheckpoints];
                                            newCheckpoints.splice(index, 1);
                                            return newCheckpoints;
                                        });
                                    }}>X</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <button className="btn btn-outline border-gray-300 hover:bg-gray-200" onClick={() => {
                    setLocalCheckpoints(prevArray => [...prevArray, {money: 0, cardprice: 0}])
                }}>
                    {plusSVG}
                </button>
            </div>
            <div className="flex justify-between">
                <button className="btn" onClick={() => {
                    setLocalCheckpoints(checkpoints)
                }}>Zurück</button>
                <button className="btn" onClick={() => {
                    const localCleanedCheckpoints = localCheckpoints.filter(item => !(item.money === 0 && item.cardprice === 0));
                    if (JSON.stringify(checkpoints) === JSON.stringify(localCleanedCheckpoints) && excessGoal == localGoal) {
                        return
                    }
                    updateCheckpoints(localCleanedCheckpoints, localGoal);
                }}>Speichern</button>
            </div>
        </div>
        
    );
}