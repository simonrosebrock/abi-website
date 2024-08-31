'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateFinanzen } from "@/app/lib/dbConnection";
import Document from "next/document";
import { reset } from "canvas-confetti";

const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
)

type FinanzenTable = {name: string, money: number}[]
type AusgabenRow = {name: string, money: number}

export default function EditFinanzen({einnahmen, ausgaben}: {einnahmen: number, ausgaben: FinanzenTable}) {
    const [localAusgaben, setLocalAusgaben] = useState(ausgaben);
    const router = useRouter();
    
    return(
        <div className="min-w-[250px] w-[500px] h-[580px] bg-white shadow-sm rounded-lg p-10 flex flex-col">
            <div className="flex flex-col overflow-auto scrollbar-none mb-8">
                <h2 className="text-[#05004E] text-xl mb-4">Einnahmen</h2>
                <div>
                    <label className="input input-bordered flex items-center">
                        <input type="number" name='title' placeholder="Einnahmen" className="grow" defaultValue={einnahmen}/>
                    </label>
                </div>
                
                <div className="divider mt-4 mb-4"></div>
                <h2 className="text-[#05004E] text-xl mb-4">Ausgaben</h2>
                <div id="ausgaben">
                    {
                        localAusgaben.map((row: AusgabenRow, index: number) => (
                            <div className="mb-4 xs:flex" key={index}>
                                <label className="input input-bordered flex items-center min-w-[150px]">
                                    <input type="text" name='title' placeholder="Name" className="grow" defaultValue={row.name}/>
                                </label>
                                <div className="flex xs:ml-1 xs:w-[170px]">
                                    <label className="input input-bordered flex items-center grow overflow-hidden">
                                        <input type="number" name='title' placeholder="Kosten" className="grow xs:w-14" defaultValue={row.money}/>
                                    </label>
                                    <button className="btn btn-error ml-1 shrink-0" onClick={() => {
                                        setLocalAusgaben(prevAusgaben => {
                                            const newAusgaben = [...prevAusgaben];
                                            newAusgaben.splice(index, 1);
                                            console.log(newAusgaben)
                                            return newAusgaben;
                                        });

                                        setTimeout(() => {
                                            resetInputValues();
                                        }, 0)
                                    }}>X</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <button className="btn btn-outline border-gray-300 hover:bg-gray-200" onClick={() => {
                    setLocalAusgaben(prevArray => [...prevArray, {name: "", money: 0}])
                }}>
                    {plusSVG}
                </button>
            </div>
            <div className="flex justify-between">
                <button className="btn" onClick={() => {
                    setLocalAusgaben(ausgaben)

                    setTimeout(() => {
                        resetInputValues();
                    }, 0)
                }}>Zurück</button>
                <button className="btn" onClick={() => {
                    let localAusgabenTemp = [] as FinanzenTable;
                    const ausgaben_div = (document.getElementById('ausgaben') as HTMLElement).children;
                    Array.from(ausgaben_div).forEach(element => {
                        let ausgaben_row = {name: "", money: 0};
                        var labels = element.querySelectorAll('label');
                        ausgaben_row.name = labels[0].getElementsByTagName('input')[0].value;
                        ausgaben_row.money = labels[1].getElementsByTagName('input')[0].valueAsNumber;
                        localAusgabenTemp.push(ausgaben_row);
                    });

                    
                    setLocalAusgaben(localAusgabenTemp);

                    const localCleanedAusgaben = localAusgabenTemp.filter(item => !(item.name === "" && item.money === 0));

                    if (JSON.stringify(ausgaben) === JSON.stringify(localCleanedAusgaben)) {
                        return
                    }
                    updateFinanzen(localCleanedAusgaben, einnahmen);
                    router.refresh();
                }}>Speichern</button>
            </div>
            
        </div>
        
    );
}

function resetInputValues() {
    const ausgaben_div = (document.getElementById('ausgaben') as HTMLElement).children;
    Array.from(ausgaben_div).forEach(element => {
        var labels = element.querySelectorAll('label');
        var ausgaben_name = labels[0].getElementsByTagName('input')[0];
        var ausgaben_money = labels[1].getElementsByTagName('input')[0];
        ausgaben_name.value = ausgaben_name.defaultValue;
        ausgaben_money.value = ausgaben_money.defaultValue;
    });
}