'use client'

import { setGeneralFinanzen } from "@/app/lib/dbConnection";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditGeneral({einnahmen, guestCount, customZiel, customCardPrice}: {einnahmen: number, guestCount: number, customZiel: number, customCardPrice: number}) {
    const [localEinnahmen, setLocalEinnahmen] = useState<number>(einnahmen);
    const [localGuestCount, setLocalGuestCount] = useState<number>(guestCount);
    const [localCustomZiel, setLocalCustomZiel] = useState<number>(customZiel);
    const [localCustomCardPrice, setLocalCustomCardPrice] = useState<number>(customCardPrice);

    const router = useRouter();

    const [showToast, setShowToast] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (showToast) {
            setIsVisible(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            setTimeout(() => setIsVisible(false), 1000);
        }
    }, [showToast]);

    return(
        <div className="min-w-[250px] w-[500px] h-[580px] bg-white shadow-sm rounded-lg p-10 flex flex-col">
            <div className="flex flex-col overflow-auto scrollbar-none mb-8 gap-4">
                <div>
                    <h2 className="text-[#05004E] text-xl mb-4">Einnahmen</h2>
                    <div>
                        <label className="input input-bordered flex items-center">
                            <input type="number" name='einnahmen' placeholder="Einnahmen" className="grow" value={localEinnahmen} onChange={e => {
                                setLocalEinnahmen(Number(e.target.value));
                            }}/>
                        </label>
                    </div>
                </div>
                <div>
                    <h2 className="text-[#05004E] text-xl mb-4">Gästeanzahl</h2>
                    <div>
                        <label className="input input-bordered flex items-center">
                            <input type="number" name='guestCount' placeholder="Gästeanzahl" className="grow" value={localGuestCount} onChange={e => {
                                setLocalGuestCount(Number(e.target.value));
                            }}/>
                        </label>
                    </div>
                </div>
                <div>
                <div className="flex items-center mb-4">
                        <h2 className="text-[#05004E] text-xl">Custom Ziel</h2>
                        <span className="text-gray-400 text-lg ml-2">{"(0 für Aus)"}</span>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center">
                            <input type="number" name='customZiel' placeholder="Custom Ziel" className="grow" value={localCustomZiel} onChange={e => {
                                setLocalCustomZiel(Number(e.target.value));
                            }}/>
                        </label>
                    </div>
                </div>
                <div>
                    <div className="flex items-center mb-4">
                        <h2 className="text-[#05004E] text-xl">Custom Kartenpreis</h2>
                        <span className="text-gray-400 text-lg ml-2">{"(0 für Aus)"}</span>
                    </div>
                    
                    <div>
                        <label className="input input-bordered flex items-center">
                            <input type="number" name='customCardPrice' placeholder="Custom Kartenpreis" className="grow" value={localCustomCardPrice} onChange={e => {
                                setLocalCustomCardPrice(Number(e.target.value));
                            }}/>
                        </label>
                    </div>
                </div>

            </div>
            <div className="flex justify-between mt-auto">
                <button className="btn" onClick={() => {
                    setLocalEinnahmen(einnahmen);
                    setLocalGuestCount(guestCount);
                    setLocalCustomCardPrice(customCardPrice)
                    setLocalCustomZiel(customZiel)
                }}>Reset</button>
                <button className="btn" onClick={async () => {
                    if (einnahmen === localEinnahmen && guestCount === localGuestCount && customZiel === localCustomZiel && customCardPrice === localCustomCardPrice) {
                        return
                    }
                    await setGeneralFinanzen(localEinnahmen, localGuestCount, localCustomZiel, localCustomCardPrice);
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