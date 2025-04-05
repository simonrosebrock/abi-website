'use client'

import { addVorschlag } from "@/app/lib/dbConnection"
import { useState } from "react"


export default function VorschlagCreateModal({token, kategorie_id, kategorie_name}:{token: string, kategorie_id: string, kategorie_name: string}) {
    const [text, setText] = useState<string>("")
    return(
        <dialog id={`vorschlag-create-modal-${kategorie_id}`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
                <h1 className="text-2xl mr-auto">{`Kategorie: ${kategorie_name}`}</h1>
                <textarea className="textarea textarea-bordered w-full max-h-[200px] h-[200px]" placeholder="Dein Vorschlag" value={text} onChange={(e) => {setText(e.target.value)}}></textarea>
                <button className="btn ml-auto" onClick={async () => {
                    if (text === "") {
                        return;
                    }
                    await addVorschlag(kategorie_id, token, text)
                    setText("")
                    const modal = document.getElementById(`vorschlag-create-modal-${kategorie_id}`) as HTMLDialogElement;
                    modal.close();
                }}>Speichern</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                }}>close</button>
            </form>
        </dialog>
    )
}