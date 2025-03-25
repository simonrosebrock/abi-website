'use client'
import { addKategorie } from "@/app/lib/dbConnection";
import { useState } from "react"

export default function AddKategorie() {
    return(
        <>
            <button className="btn w-[150px] h-[50px] text-4xl" onClick={() => {
                const modal = document.getElementById("kategorie-create-modal") as HTMLDialogElement;
                modal.showModal()
            }}>+</button>
            <AddKategorieModal/>
        </>
    )
}

function AddKategorieModal() {
    const [name, setName] = useState<string>("")
    return(
        <dialog id={`kategorie-create-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
            <h1 className="text-xl mr-auto">Kategorie Name</h1>
            <input type="text" name="name" id="name-kategorie" className="input input-bordered w-full" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <div className="flex gap-5 w-full">
                <button className="btn btn-error w-[calc(50%-10px)]" onClick={() => {
                    const deletion_modal = document.getElementById(`kategorie-create-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Zurück</button>
                <button className="btn btn-success w-[calc(50%-10px)]" onClick={async () => {
                    if (name === "") {
                        return;
                    }
                    await addKategorie(name)
                    const deletion_modal = document.getElementById(`kategorie-create-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                    setName("")
                }}>Speichern</button>
            </div>
        </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}