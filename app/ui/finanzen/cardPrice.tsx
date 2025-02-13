'use client'

import { set } from "date-fns";
import { useEffect, useState } from "react";

const infoSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20 md:30" height="20 md:30" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
)

type CheckpointsTable = {money: number, cardprice: number}[]

export default function CardPrice({value, max, checkpoints}: {value: number, max: number, checkpoints: CheckpointsTable}) {
    

    return(
        <div className="w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-white shadow-sm rounded-lg p-2 flex flex-col items-center">
            <div className="flex items-center justify-center relative">
                <h3 className="text-[#05004E] text-2xl md:text-4xl">Überschuss</h3>
                <DescriptionModal title="Erklärung" description={
                    <>
                        Wenn die Einnahmen die Fixkosten (Wichtig: können aufgrund von Kostenerhöhungen bei der Hohensyburg noch steigen) überschreiten, 
                        könnten diese Überschüsse zur Senkung des Kartenpreises verwendet werden. 
                    </>
                }/>
                <button className="btn btn-circle btn-ghost btn-xs md:btn-sm self-start absolute ml-[200px] md:ml-[450px] mt-1 md:mt-0" onClick={() => {
                    var modal = document.getElementById(`description_modal_money`) as HTMLDialogElement; 
                    if (modal) {modal.showModal()}
                }}>
                    {infoSVG}
                </button>
            </div>
            <span className="ml-auto mr-2 md:mr-12 text-sm md:text-2xl md:mt-2">Kartenpreis</span>
            <div className="flex w-full h-[230px] md:h-full pt-7 pb-4">
                <ProgressBar value={value} max={max}/>
                <div className="flex flex-col grow relative">
                    {
                        checkpoints.map((values, index) => (
                            <Checkpoint key={`checkpoint-${index}`} value={values.money} max={max} cardprice={values.cardprice}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

const ProgressBar = ({value, max}: {value: number, max: number}) => {
    var percentage = Math.round(100/max*value);
    return(
        <div className="w-10 md:w-20 bg-gray-200 rounded-full h-[150px] md:h-[360px] flex flex-col-reverse overflow-hidden items-center ml-4 mr-2 md:mr-6">
            <div className={`bg-gradient-to-b from-blue-700 to-cyan-300 text-xs font-medium text-blue-100 text-center p-0.5 w-full`} style={{ height: `${percentage}%` }}></div>
            <span className="text-xs md:text-xl">{value + "€"}</span>
        </div>
    );
}

const Checkpoint = ({value, max, cardprice}: {value: number, max: number, cardprice: number}) => {
    const [percentage, setPercentage] = useState(0);
    
    
    useEffect(() => {
        const calculatePercentage = () => {
            const screenWidth = window.innerWidth;
            let newPercentage = Math.round(360 - (1 / max * value * 360) - 28);
            if (screenWidth < 768) {
                newPercentage = Math.round(150 - (1 / max * value * 150) - 22); 
            }
            setPercentage(newPercentage);
        }

        calculatePercentage();
    

        window.addEventListener('resize', calculatePercentage);
    }, [value, max])

    return(
        <div className="absolute flex h-[40px] md:h-[60px] items-center" style={{marginTop: percentage}}>
            <div className="flex flex-col items-center h-auto mb-auto mr-2 md:mr-6">
                <span className="md:text-xl">{value + "€"}</span>
                <hr className="w-[90px] md:w-[180px] h-[2px] md:h-1 bg-gray-400"/>
            </div>
            <span className="text-xl md:text-4xl">{cardprice + "€"}</span>
        </div>
    );
}

const DescriptionModal = ({title, description}: {title: string, description: any}) => {
    return(
        <dialog id={`description_modal_money`} className="modal">
            <div className="modal-box">
                <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                <p>{description}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
        
}