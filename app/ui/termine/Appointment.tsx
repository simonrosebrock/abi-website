'use client'

import { useState } from "react";
import { setHelfer } from "@/app/lib/dbConnection";
import { getDateString } from "@/app/lib/miniFuncs";
import { EditAppointment } from "./EditAppointment";

const infoSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
)

const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
)

const editSVG = (
    <svg fill="#000000" width="45px" height="45px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5,10.2071068 L8,14.7071068 L8,16 L9.29289322,16 L13.7928932,11.5 L12.5,10.2071068 Z M13.2071068,9.5 L14.5,10.7928932 L15.7928932,9.5 L14.5,8.20710678 L13.2071068,9.5 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M14.8535534,7.14644661 L16.8535534,9.14644661 C17.0488155,9.34170876 17.0488155,9.65829124 16.8535534,9.85355339 L9.85355339,16.8535534 C9.7597852,16.9473216 9.63260824,17 9.5,17 L7.5,17 C7.22385763,17 7,16.7761424 7,16.5 L7,14.5 C7,14.3673918 7.05267842,14.2402148 7.14644661,14.1464466 L14.1464466,7.14644661 C14.3417088,6.95118446 14.6582912,6.95118446 14.8535534,7.14644661 Z"/>
    </svg>
)


type Personen = {
    [key: string]: string[];
};

type AppointmentProps = {
    id: string,
    termin_id: string;
    title: string;
    description: string;
    ort: string;
    date: Date;
    start_time: string;
    end_time: string;
    persons: Personen;
    user: string;
    users: string[];
};

export function Appointment({id, termin_id, title, description, ort, date, start_time, end_time, persons, user, users}: AppointmentProps) {
    
    const [savedPersonen, setSavedPersonen] = useState<Personen>(persons); 
    const [personen, setPersonen] = useState<Personen>(persons)

    //console.log(savedPersonen)

    start_time = start_time.slice(0, -3);
    end_time = end_time.slice(0, -3);
    var gruppen = Object.keys(savedPersonen)
    //console.log(gruppen)
    
    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col">
            <div className="flex">
                <div className="flex flex-col">
                    <span className="text-[#05004E] text-xl">{title}</span>
                    <span className="text-abi-gray">{ort}</span>
                </div>
                <DescriptionModal id={id} title={title} description={description}/>
                <button className="btn btn-circle btn-ghost btn-xs ml-auto self-start" onClick={() => {
                    var modal = document.getElementById(`description_modal_${id}`) as HTMLDialogElement; 
                    console.log(modal)
                    if (modal) {modal.showModal()}
                }}>
                    {infoSVG}
                </button>
            </div>
            <div className="mt-auto mb-auto ">
                <div className="flex">
                    <span>Personen</span>
                    <button className="btn btn-circle btn-ghost btn-xs ml-auto" onClick={() => {
                        var modal = document.getElementById(`personen_modal_${id}`) as HTMLDialogElement; 
                        if(modal) {modal.showModal()}
                    }}>
                        {plusSVG}
                    </button>
                    <PersonenModal termin_id={termin_id} id={id} title={title} user={user} personen={personen} setPersonen={setPersonen} savedPersonen={savedPersonen} setSavedPersonen={setSavedPersonen} gruppen={gruppen} users={users}/>
                </div>
                {
                    gruppen.map((gruppe, index) => (
                        <div key={`${index}-${gruppe}-${id}`} className="w-[200px] text-abi-gray text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="text-red-500">•</span>
                            <span>{` ${savedPersonen[gruppe].join(", ")}`}</span>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-row">
                <div>
                    <h4 className="text-abi-gray text-md">{getDateString(date)}</h4>
                    <h4 className="text-abi-gray text-md">{`${start_time} - ${end_time} Uhr`}</h4>
                </div>
                <button onClick={() => {
                    var modal = document.getElementById(`edit_modal_${id}`) as HTMLDialogElement; 
                    if (modal) {modal.showModal()}
                }} className={`${user === "admin" ? "block":"hidden"} btn btn-circle btn-ghost ml-auto`}>
                    {editSVG}
                </button>
                <EditAppointment termin_id={termin_id} id={id} title={title} description={description} ort={ort} start_time={start_time} end_time={end_time} date={date} persons={savedPersonen} setPersons={setSavedPersonen} />
            </div>
        </div>
    );
}

type DescriptionModalProps = {
    id: string;
    title: string;
    description: string;
}

const DescriptionModal = ({id, title, description}: DescriptionModalProps) => {
    return(
        <dialog id={`description_modal_${id}`} className="modal">
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

type PersonenModalProps = {
    termin_id: string;
    id: string;
    title: string;
    user: string;
    personen: Personen;
    setPersonen: any;
    savedPersonen: Personen;
    setSavedPersonen: any;
    gruppen: string[];
    users: string[];
};

const PersonenModal = ({termin_id, id, title, user, personen, setPersonen, savedPersonen, setSavedPersonen, gruppen, users}: PersonenModalProps) => {
    return(
        <dialog id={`personen_modal_${id}`} className="modal">
            <div className="modal-box">
                <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                <h3 className="text-abi-black text-lg mb-5">Personen</h3>
                {gruppen.map((gruppe, index_1) => (
                    <PersonenGruppe key={index_1} gruppe={gruppe} personen={personen} setPersonen={setPersonen} user={user} id={id} users={users}/>
                ))}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={async () => {
                            setSavedPersonen(personen);
                            setHelfer(personen, termin_id);
                        }}>Speichern</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    setPersonen(savedPersonen);
                    const parent_div = document.getElementById(`personen_modal_${id}`) as HTMLElement;
                    const select_elems = parent_div.getElementsByClassName("hide") as HTMLCollectionOf<HTMLElement>;
                    for (let i = 0; i < select_elems.length; i++) {
                        select_elems[i].style.display = 'none';
                    }
                    const button_elems = parent_div.getElementsByClassName("show") as HTMLCollectionOf<HTMLElement>;
                    for (let i = 0; i < button_elems.length; i++) {
                        button_elems[i].style.display = 'block';
                    }
                }}>close</button>
            </form>
        </dialog>
    )
}

type PersonenGruppeProps = {
    gruppe: string;
    personen: Personen;
    setPersonen: any;
    user: string;
    id: string;
    users: string[];
}

const PersonenGruppe = ({gruppe, personen, setPersonen, user, id, users}: PersonenGruppeProps) => {
    return(
        <div className="h-auto p-2 w-auto bg-red-300 rounded-md flex flex-col mt-3">
            <span className="font-bold">{gruppe}</span>
            
            <div id={`personen_div_${id}_${gruppe}`} className="flex flex-wrap gap-3 mt-2">
                { personen[gruppe] ? personen[gruppe].map((name, index_2) => (
                    <div key={index_2} id={`${name}-${gruppe}-${id}`} className="indicator h-[32px]">
                        <button onClick={() => { // on delete click
                            var updated_personen = JSON.parse(JSON.stringify(personen))
                            updated_personen[gruppe].splice(index_2, 1);
                            setPersonen(updated_personen);
                        }} className={`${user === name || user === "admin" ? "block" : "hidden"} indicator-item badge bg-white scale-75 hover:bg-gray-300 font-bold border-black`}>X</button> 
                        <div className="grid w-auto h-auto bg-white place-items-center rounded-md pl-1 pr-1">{name}</div>
                    </div>
                )) : <></>}
                <button id={`plus-${gruppe}-${id}`} onClick={() => { // on create click
                    if (user === "admin") {
                        const self_button = document.getElementById(`plus-${gruppe}-${id}`) as HTMLElement
                        const self_select = document.getElementById(`select-${gruppe}-${id}`) as HTMLElement
                        self_button.style.display = 'none';
                        self_select.style.display = 'block';

                    } else {
                        var updated_personen = JSON.parse(JSON.stringify(personen))
                        if (!updated_personen[gruppe].includes(user)) {
                            updated_personen[gruppe].push(user)
                            setPersonen(updated_personen);
                        }
                    }
                }} className={`btn btn-sm bg-white rounded-md h-auto ${personen[gruppe] ? (personen[gruppe].includes(user) ? "hidden" : "block") : ''} show`}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                    </svg>
                </button>
                
                <select id={`select-${gruppe}-${id}`} defaultValue={"Schüler"} onChange={(event) => {
                    const selectedPerson = event.target.value;
                    var updated_personen = JSON.parse(JSON.stringify(personen))
                        if (!updated_personen[gruppe].includes(selectedPerson)) {
                            updated_personen[gruppe].push(selectedPerson)
                            setPersonen(updated_personen);
                        }
                    const self_button = document.getElementById(`plus-${gruppe}-${id}`) as HTMLElement
                    const self_select = document.getElementById(`select-${gruppe}-${id}`) as HTMLSelectElement
                    self_button.style.display = 'block';
                    self_select.selectedIndex = 0;
                    self_select.style.display = 'none';
                }} className="select select-bordered hidden select-sm h-[32px] hide">
                    <option disabled>Schüler</option>
                    {
                        users.map((username, index) => (
                            <option key={index}>{username}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

const TerminEditModal = () => {
    return(
        <>
        
        </>
    );
}