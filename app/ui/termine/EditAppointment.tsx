'use client'

import { deleteTermin, updateTermin } from "@/app/lib/dbConnection";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GruppenSettings } from "@/app/ui/termine/NewAppointment";

type Personen = {
    [key: string]: string[];
};

type EditAppointmentProps = {
    termin_id: string,
    id: string,
    title: string,
    description: string,
    ort: string,
    start_time: string,
    end_time: string,
    date: Date,
    persons: Personen,
    setPersons: any
}

export const EditAppointment = ({termin_id, id, title, description, ort, start_time, end_time, date, persons, setPersons}: EditAppointmentProps) => {
    const startGruppen = Object.keys(persons);
    const [gruppen, setGruppen] = useState<string[]>(Object.keys(persons))
    const router = useRouter();
    return (
        <>
            <dialog id={`edit_modal_${id}`} className="modal">
                <div className="modal-box">
                    <EditAppointmentForm id={id} title={title} description={description} ort={ort} start_time={start_time} end_time={end_time} date={date} gruppen={gruppen} setGruppen={setGruppen} />
                    <div className="modal-action flex justify-between">
                        <form method="dialog">
                            <button className="btn btn-error" onClick={async () => {
                                var modal = document.getElementById(`delete_modal_${id}`) as HTMLDialogElement;
                                if (modal) {modal.showModal()}
                            }}>Delete</button>
                        </form>
                        <form method="dialog">
                            <button className="btn" onClick={async (event) => {
                                event.preventDefault();
                                const form = document.getElementById(`edit-form-${id}`) as HTMLFormElement
                                var formData = new FormData(form);

                                var title_temp = (formData.get('title') as string).trim();
                                var description_temp = (formData.get('description') as string).trim();
                                var ort_temp = (formData.get('ort') as string).trim();
                                var start_time_temp = formData.get('start_time') + ":00";
                                var end_time_temp = formData.get('end_time') + ":00";
                                var date_temp = formData.get('date') as string;

                                var dateString = date.getFullYear()+'-' + String((date.getMonth()+1)).padStart(2, '0') + '-'+ String((date.getDate())).padStart(2, '0');

                                if (title_temp === "" || description_temp === "" || ort_temp === "" || start_time_temp === "" || end_time_temp === "" || date_temp === "" || gruppen.length === 0) {
                                    return
                                }
                                if (title_temp === title && description_temp === description && ort_temp === ort && start_time_temp === start_time + ":00" && end_time_temp === end_time + ":00" && date_temp === dateString && JSON.stringify(gruppen) === JSON.stringify(startGruppen)) {
                                    const dialog = document.getElementById(`edit_modal_${id}`) as HTMLDialogElement;
                                    dialog.close();
                                }
                                var updated_persons = JSON.parse(JSON.stringify(persons))
                                

                                for (var key in updated_persons) {
                                    if (!gruppen.includes(key)) {
                                        delete updated_persons[key];
                                    }
                                }


                                for (let gruppe of gruppen) {
                                    if (!(gruppe in persons)) {
                                        let key = gruppe;
                                        updated_persons[key] = [];
                                    }
                                }
                                
                                setPersons(updated_persons);

                                const updated_termin = {
                                    'title': title_temp,
                                    'description': description_temp,
                                    'ort': ort_temp,
                                    'start_time': start_time_temp,
                                    'end_time': end_time_temp,
                                    'date': date_temp,
                                    'helfer': JSON.stringify(updated_persons)
                                }

                                updateTermin(termin_id, updated_termin);

                                const dialog = document.getElementById(`edit_modal_${id}`) as HTMLDialogElement;
                                dialog.close();

                                router.refresh()
                            }}>Speichern</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => {
                        const form = document.getElementById(`edit-form-${id}`) as HTMLFormElement;
                        setGruppen(startGruppen)
                        form.reset();
                    }}>close</button>
                </form>
            </dialog>
            <DeleteAppointment termin_id={termin_id} id={id} title={title} />
        </>
    )
}

type EditAppointmentFromProps = {
    id: string,
    title: string,
    description: string,
    ort: string,
    start_time: string,
    end_time: string,
    date: Date,
    gruppen: string[],
    setGruppen: any
}

const EditAppointmentForm = ({id, title, description, ort, start_time, end_time, date, gruppen, setGruppen}: EditAppointmentFromProps) => {
    var dateString = date.getFullYear()+'-' + String((date.getMonth()+1)).padStart(2, '0') + '-'+ String((date.getDate())).padStart(2, '0')

    return(
        <form id={`edit-form-${id}`}>
            <div className='sm:mt-10'>
                <label className="input input-bordered flex items-center m-10">
                    <input type="text" name='title' placeholder="Titel" className="grow" defaultValue={title}/>
                </label>
                <label className="flex items-center m-10">
                    <textarea name="description" placeholder="Beschreibung" className="grow textarea textarea-bordered textarea-lg text-base p-4" defaultValue={description}></textarea>
                </label>
                <label className="input input-bordered flex items-center m-10">
                    <input type="text" name='ort' placeholder="Ort" className="grow" defaultValue={ort}/>
                </label>
                <div className="justify-center xs:justify-between flex flex-row h-auto w-auto m-10 flex-wrap-reverse gap-10 xs:gap-0">
                    <div className="flex flex-col justify-between border-2 rounded-lg p-2 w-[100%] xs:w-auto">
                        <div className="flex flex-row">
                            <input aria-label="Time" type="time" name="start_time" defaultValue={start_time}/>
                            <span className="ml-2">Von</span>
                        </div>
                        <div className="flex flex-row mt-2 ">
                            <input aria-label="Time" type="time" name="end_time" defaultValue={end_time}/>
                            <span className="ml-2">Bis</span>
                        </div>
                    </div>
                    <div className="border-2 rounded-lg w-[100%] xs:w-auto p-2 flex flex-col">
                        <input className="mb-2" aria-label="Date" type="date" name="date" defaultValue={dateString}/>
                        <span>Datum</span>
                    </div>
                </div>
                <GruppenSettings id={id} gruppen={gruppen} setGruppen={setGruppen}/>
            </div>
        </form>
    )
}

type DeleteAppointmentProps = {
    termin_id: string,
    id: string,
    title: string
}

const DeleteAppointment = ({termin_id, id, title}:DeleteAppointmentProps) => {
    const router = useRouter();
    return (
        <dialog id={`delete_modal_${id}`} className="modal">
            <div className="modal-box">
                <h2 className="text-xl">Bist du dir Sicher?</h2>
                <h3>{`Du löschst "${title}"`}</h3>
                <div className="modal-action flex justify-between">
                    <form method="dialog">
                        <button className="btn btn-success" onClick={async () => {
                            var modal = document.getElementById(`edit_modal_${id}`) as HTMLDialogElement;
                            if (modal) {modal.showModal()}
                        }}>Zurück</button>
                    </form>
                    <form method="dialog">
                        <button className="btn btn-error" onClick={async () => {
                            deleteTermin(termin_id);
                            router.refresh()
                        }}>Delete</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {

                }}>close</button>
            </form>
        </dialog>
    )
}