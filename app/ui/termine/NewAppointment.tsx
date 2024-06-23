'use client'
import { QueryResultRow } from "@vercel/postgres";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTermin } from "@/app/lib/dbConnection";
// import { v4 } from "uuid";


const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
)

type NewAppointmentProps = {
    termine: QueryResultRow;
    setTermine: any;
}

export const NewAppointment = ({termine, setTermine}:NewAppointmentProps) => {
    return(
        <>
            <button onClick={() => {
                const modal = document.getElementById("create_appointment_modal") as HTMLDialogElement;
                if (modal) {
                    modal.showModal();
                }
            }} className="btn no-animation w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col">
                <svg className="fill-gray-500" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="150" height="150" viewBox="0 0 50 50">
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                </svg>
            </button>
            <CreateAppointmentModal termine={termine} setTermine={setTermine}/>
        </>
    )
}

type CreateAppointmentModalProps = {
    termine: QueryResultRow;
    setTermine: any;
}

const CreateAppointmentModal = ({termine, setTermine}: CreateAppointmentModalProps) => {
    const [gruppen, setGruppen] = useState<string[]>([])
    const router = useRouter();
    return(
        <dialog id={`create_appointment_modal`} className="modal">
                        <div className="modal-box">
                            <h3 className="text-abi-black text-lg font-bold">Termin</h3>
                            <CreateAppointmentForm gruppen={gruppen} setGruppen={setGruppen}/>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={async (event) => {
                                        event.preventDefault();
                                        const form = document.getElementById("create-form") as HTMLFormElement
                                        var formData = new FormData(form);

                                        var title = (formData.get('title') as string).trim();
                                        var description = (formData.get('description') as string).trim();
                                        var ort = (formData.get('ort') as string).trim();
                                        var start_time = formData.get('start_time') + ":00";
                                        var end_time = formData.get('end_time') + ":00";
                                        var date = formData.get('date') as string;

                                        if (title === "" || description === "" || ort === "" || start_time === "" || end_time === "" || date === "" || gruppen.length === 0) {
                                            return
                                        }

                                        const helferObject: { [key: string]: any } = {};
                                            gruppen.map(name => {
                                            helferObject[name] = [];
                                        });
                                        
                                        const new_termin = {
                                            'title': title,
                                            'description': description,
                                            'ort': ort,
                                            'start_time': start_time,
                                            'end_time': end_time,
                                            'date': date,
                                            'helfer': JSON.stringify(helferObject)
                                        }

                                        // const id = v4();
                                        // const dateObj = new Date(date);
                                        // dateObj.setUTCHours(0, 0, 0, 0);
                                        // const isoFormatDate = dateObj.toISOString();

                                        // const new_local_termin = {
                                        //     'id': id,
                                        //     'title': title,
                                        //     'description': description,
                                        //     'ort': ort,
                                        //     'start_time': start_time,
                                        //     'end_time': end_time,
                                        //     'date': isoFormatDate,
                                        //     'helfer': helferObject
                                        // }

                                        addTermin(new_termin);

                                        // var updated_termine = JSON.parse(JSON.stringify(termine));
                                        // updated_termine.push(new_local_termin);
                                        // updated_termine.sort(compareDates);
                                        // setTermine(updated_termine);

                                        const dialog = document.getElementById('create_appointment_modal') as HTMLDialogElement;
                                        dialog.close();

                                        form.reset();
                                        setGruppen([]);

                                        router.refresh()
                                    }}>Speichern</button>
                                </form>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => {
                                const form = document.getElementById(`create-form`) as HTMLFormElement;
                                setGruppen([])
                                form.reset();
                            }}>close</button>
                        </form>
                    </dialog>
    )
}

function compareDates(a: any, b: any) {
    const a_date = new Date(a.date);
    const b_date = new Date(b.date);

    if (a_date < b_date) {
        return -1
    } else if (a_date > b_date) {
        return 1;
    }
    return 0;
}

type CreateAppointmentFormProps = {
    gruppen: string[];
    setGruppen: any;
}

const CreateAppointmentForm = ({gruppen, setGruppen}:CreateAppointmentFormProps) => {
    

    return (
        <form id="create-form">
            <div className='sm:mt-10'>
                <label className="input input-bordered flex items-center m-10">
                    <input type="text" name='title' placeholder="Titel" className="grow"/>
                </label>
                <label className="flex items-center m-10">
                    <textarea name="description" placeholder="Beschreibung" className="grow textarea textarea-bordered textarea-lg text-base p-4"></textarea>
                </label>
                <label className="input input-bordered flex items-center m-10">
                    <input type="text" name='ort' placeholder="Ort" className="grow"/>
                </label>
                <div className="justify-center xs:justify-between flex flex-row h-auto w-auto m-10 flex-wrap-reverse gap-10 xs:gap-0">
                    <div className="flex flex-col justify-between border-2 rounded-lg p-2 w-[100%] xs:w-auto">
                        <div className="flex flex-row">
                            <input aria-label="Time" type="time" name="start_time"/>
                            <span className="ml-2">Von</span>
                        </div>
                        <div className="flex flex-row mt-2 ">
                            <input aria-label="Time" type="time" name="end_time"/>
                            <span className="ml-2">Bis</span>
                        </div>
                    </div>
                    <div className="border-2 rounded-lg w-[100%] xs:w-auto p-2 flex flex-col">
                        <input className="mb-2" aria-label="Date" type="date" name="date"/>
                        <span>Datum</span>
                    </div>
                </div>
                <GruppenSettings id={"1"} gruppen={gruppen} setGruppen={setGruppen}/>
            </div>
        </form>
    )
}

type GruppenSettingsProps = {
    id: string;
    gruppen: string[];
    setGruppen: any;
}

export const GruppenSettings = ({id, gruppen, setGruppen}: GruppenSettingsProps) => {
    return (
        <div className="m-10 border-2 p-2 rounded-lg">
            <h4 className="text-gray-400">Gruppen</h4>
            <div className="mt-2 flex flex-wrap gap-3">
                {
                    gruppen.map((gruppe, index) => (
                        <div key={index} id={`${gruppe}-${index}-div-${id}`} className="indicator h-[32px]">
                            <button type="button" onClick={() => { // on delete click
                                var updated_gruppen = JSON.parse(JSON.stringify(gruppen))
                                updated_gruppen.splice(index, 1);
                                setGruppen(updated_gruppen);
                            }} className={`indicator-item badge bg-white scale-75 hover:bg-gray-300 font-bold border-black`}>X</button> 
                            <div className="grid w-auto h-auto bg-gray-200 place-items-center rounded-md pl-1 pr-1">{gruppe}</div>
                        </div>
                    ))
                }
                <button id={`new-group-${id}`} type="button" onClick={() => { // on create click
                    const self_button = document.getElementById(`new-group-${id}`) as HTMLElement
                    const self_input_div = document.getElementById(`gruppe-input-div-${id}`) as HTMLElement
                    self_button.style.display = 'none';
                    self_input_div.style.display = 'flex';
                }} className={`btn btn-sm bg-white rounded-md h-auto`} >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                    </svg>
                </button>
                <div id={`gruppe-input-div-${id}`} className="bg-gray-100 hidden flex-row rounded-lg items-center">
                    <input id={`gruppe-input-${id}`} type="text" className="input input-xs bg-gray-100 h-[32px] w-32 text-base" onSubmit={() => console.log("hi")}/>
                    <button type="button" onClick={() => {
                        const self_input = document.getElementById(`gruppe-input-${id}`) as HTMLInputElement
                        var value = self_input.value.trim();
                        self_input.value = "";
                        
                        const self_button = document.getElementById(`new-group-${id}`) as HTMLElement
                        const self_input_div = document.getElementById(`gruppe-input-div-${id}`) as HTMLElement
                        self_button.style.display = 'block';
                        self_input_div.style.display = 'none';

                        if (value === "" ) {
                            return
                        }
                        
                        var updated_gruppen = JSON.parse(JSON.stringify(gruppen))
                        if (!updated_gruppen.includes(value)) {
                            updated_gruppen.push(value)
                            setGruppen(updated_gruppen);
                        }
                    }} className="btn btn-ghost btn-circle btn-xs ml-2 mr-2 bg-gray-200">{plusSVG}</button>
                </div>
                
            </div>
            
        </div>
    )
    
}