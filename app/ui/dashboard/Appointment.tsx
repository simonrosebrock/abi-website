'use client'
import { v4 } from "uuid";
import { useState } from "react";

type Personen = {
    [key: string]: string[];
};

type AppointmentProps = {
    title: string;
    description: string;
    ort: string;
    date: Date;
    start_time: string;
    end_time: string;
    persons: Personen;
    user: string;
};

function weekDayToString(day: number) {
    switch (day) {
        case 1: return "Mon"; break;
        case 2: return "Die"; break;
        case 3: return "Mit"; break;
        case 4: return "Don"; break;
        case 5: return "Fre"; break;
        case 6: return "Sam"; break;
        case 7: return "Son"; break;
    }
    return;
}

export function Appointment({title, description, ort, date, start_time, end_time, persons, user}: AppointmentProps) {
    const id = v4();
    const [personen, setPersonen] = useState<Personen>(persons);
    const [unsavedPersonen, setUnsavedPersonen] = useState<Personen>(persons)
    start_time = start_time.slice(0, -3);
    end_time = end_time.slice(0, -3);
    

    var gruppen = Object.keys(personen)
    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col">
            <div className="flex">
                <div className="flex flex-col">
                    <span className="text-[#05004E] text-xl">{title}</span>
                    <span className="text-abi-gray">{ort}</span>
                </div>
                
                <button className="btn btn-circle btn-ghost btn-xs ml-auto self-start" onClick={() => {var modal = document.getElementById(`description_modal_${id}`) as HTMLDialogElement; modal.showModal()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                    </svg>
                </button>
                <dialog id={`description_modal_${id}`} className="modal">
                    <div className="modal-box">
                        <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                        <p>{description}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="mt-auto mb-auto ">
                <div className="flex">
                    <span>Personen</span>
                    <button className="btn btn-circle btn-ghost btn-xs ml-auto" onClick={() => {
                        var modal = document.getElementById(`personen_modal_${id}`) as HTMLDialogElement; 
                        if(modal) {modal.showModal()}
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                    </button>
                    <dialog id={`personen_modal_${id}`} className="modal">
                        <div className="modal-box">
                            <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                            <h3 className="text-abi-black text-lg mb-5">Personen</h3>
                            {gruppen.map((gruppe, index_1) => (
                                <div key={index_1} className="h-auto p-2 w-auto bg-red-300 rounded-md flex flex-col mt-3">
                                    <span className="font-bold">{gruppe}</span>
                                    <div id={`personen_div_${id}_${gruppe}`} className="flex flex-wrap gap-3 mt-2">
                                        {unsavedPersonen[gruppe].map((name, index_2) => (
                                            <div key={index_2} id={`${name}-${gruppe}-${id}`} className="indicator h-[32px]">
                                                <button onClick={() => {
                                                    var updated_personen = { ...unsavedPersonen}
                                                    updated_personen[gruppe].splice(index_2, 1);
                                                    console.log(updated_personen)
                                                    setUnsavedPersonen(updated_personen);
                                                    // var element = document.getElementById(`${name}-${gruppe}-${id}`) as HTMLElement; 
                                                    // element.style.display = 'none'; 
                                                    // element.classList.add("delete");
                                                }} className={`${user === name ? "block" : "hidden"} indicator-item badge bg-white scale-75 hover:bg-gray-300 font-bold border-black`}>X</button> 
                                                <div className="grid w-auto h-auto bg-white place-items-center rounded-md pl-1 pr-1">{name}</div>
                                            </div>
                                        ))}
                                        <button onClick={() => {
                                            var updated_personen = { ...unsavedPersonen}
                                            if (!updated_personen[gruppe].includes(user)) {
                                                updated_personen[gruppe].push(user)
                                                setUnsavedPersonen(updated_personen);
                                            }
                                        }} className={`btn btn-sm bg-white rounded-md h-auto ${unsavedPersonen[gruppe].includes(user) ? "hidden" : "block"}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={() => {
                                        setPersonen(unsavedPersonen);
                                        // var parent_div = document.getElementById(`personen_modal_${id}`) as HTMLElement;
                                        // var deleteElements = parent_div.querySelectorAll('.delete');
                                        // deleteElements.forEach((element) => {
                                        //     if (element instanceof HTMLElement) {
                                        //         element.remove();
                                        //         //update db
                                        //     }
                                        // });
                                    }}>Speichern</button>
                                </form>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => {
                                setUnsavedPersonen(personen);
                                // var parent_div = document.getElementById(`personen_modal_${id}`) as HTMLElement;
                                // var deleteElements = parent_div.querySelectorAll('.delete');
                                // deleteElements.forEach((element) => {
                                //     if (element instanceof HTMLElement) {
                                //         element.classList.remove("delete");
                                //         element.style.display = 'block';
                                //     }
                                // });
                            }}>close</button>
                        </form>
                    </dialog>
                </div>
                {
                    gruppen.map((gruppe, index) => (
                        <div key={`1-${gruppe}-${id}`} className="w-[200px] text-abi-gray text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="text-red-500">•</span>
                            <span>{` ${personen[gruppe].join(", ")}`}</span>
                        </div>
                    ))
                }
                
                
                
            </div>
            <span className="text-abi-gray text-md">{`${weekDayToString(date.getDay()+1)}, ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`}</span>
            <span className="text-abi-gray text-md">{`${start_time} - ${end_time} Uhr`}</span>
        </div>
    );
}