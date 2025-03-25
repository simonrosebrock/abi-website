'use client'

import { addLike, deleteKategorie, deleteLike, deleteVorschlag, updateKategorie } from "@/app/lib/dbConnection"
import { getCleanUser } from "@/app/lib/miniFuncs"
import { useState } from "react"
import VorschlagCreateModal from "./vorschlagCreateModal"
import { isAdmin } from "@/app/lib/getAuth"

type Kategorie = {
    kategorie_id: string,
    kategorie_name: string,
    kategorie_enabled: boolean,
    'vorschläge': Vorschlag[]
}

type Vorschlag = {
    id: string,
    likes: string[],
    author: string,
    vorschlag: string
}

const heartEmptySVG = (
    <svg width="35px" height="35px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="black">
        <path d="M28 13.682L16 28 4 13.623C2.565 11.629 2 10.282 2 8.438 2 4.999 4.455 1.904 8 1.875c2.916-.024 6.222 2.954 8 5.199C17.731 4.908 21.084 1.875 24 1.875 27.451 1.875 30 4.999 30 8.438c0 1.844-.447 3.291-2 5.244ZM24 0c-3.333 0-5.855 1.956-8 4-2.043-2.169-4.667-4-8-4C3.306 0 0 4.036 0 8.438c0 2.361.967 4.061 2.026 5.659L14.459 29.003c1.395 1.477 1.659 1.477 3.054 0L29.974 14.097C31.22 12.499 32 10.799 32 8.438 32 4.036 28.694 0 24 0Z" />
    </svg>
)

const heartFullSVG = (
    <svg width="35px" height="35px" viewBox="0 -1 35 35" xmlns="http://www.w3.org/2000/svg" fill="black">
        <path d="M26 0c-3.333 0-6.018 1.842-8.031 4.235C15.013 1.76 12.333 0 9 0 4.306 0 1 4.036 1 8.438c0 2.361.967 4.061 2.026 5.659L15.459 28.003c1.395 1.309 1.659 1.309 3.054 0L30.974 14.097C32.22 12.499 33 10.799 33 8.438 33 4.036 29.694 0 26 0Z" />
    </svg>
)



export default function KategorieView ({kategorie, username, token}: {kategorie: Kategorie, username: string, token: string}) {
    
    return(
        <div className="w-[400px] h-[400px] bg-white shadow-sm rounded-lg p-4 flex flex-col">
            <div className="flex mb-4">
                <h2 className="text-[#05004E] text-xl">{kategorie["kategorie_name"]}</h2>
                { username === "admin" ? <KategorieSettings kategorie={kategorie}/> :
                    <button className="btn btn-sm ml-auto" onClick={() => {
                        const modal = document.getElementById("vorschlag-create-modal") as HTMLDialogElement;
                        modal.showModal();
                    }}>+</button>
                }
                
            </div>
            <VorschlagCreateModal token={token} kategorie_id={kategorie.kategorie_id} kategorie_name={kategorie.kategorie_name}/>
            <div className="flex flex-col gap-4">
                {
                    kategorie['vorschläge'].map((element) => (
                        <Vorschlag key={element.id} vorschlag={element} username={username} token={token}/>
                    ))
                }
            </div>
        </div>
    )
}

function KategorieSettings({kategorie}: {kategorie: Kategorie}) {
    const [enabled, setEnabled] = useState<boolean>(kategorie.kategorie_enabled)
    const [disabled, setDisabled] = useState<boolean>(false);

    function disable() {
        setDisabled(false)
    }

    return(
        <div className="flex items-center w-full ml-2 gap-2">
            <button className="btn btn-xs" onClick={() => {
                const modal = document.getElementById(`${kategorie.kategorie_id}-edit-modal`) as HTMLDialogElement;
                modal.showModal();
            }}>EDIT</button>
            <button className="btn btn-xs" onClick={() => {
                const modal = document.getElementById(`${kategorie.kategorie_id}-deletion-modal`) as HTMLDialogElement;
                modal.showModal();
            }}>DELETE</button>
            <input type="checkbox" className="toggle toggle-success ml-auto" disabled={disabled} checked={enabled} onChange={async () => {
                await updateKategorie(kategorie.kategorie_id, kategorie.kategorie_name, !enabled)
                setEnabled((prev) => !prev)
                setDisabled(true);
                setTimeout(disable, 1000)
            }}/>
            <KategorieEditModal kategorie_name={kategorie.kategorie_name} kategorie_id={kategorie.kategorie_id} enabled={kategorie.kategorie_enabled}/>
            <KategorieDeleteModal kategorie_id={kategorie.kategorie_id} kategorie_name={kategorie.kategorie_name}/>
        </div>
    )
}

function KategorieDeleteModal({kategorie_id, kategorie_name}: {kategorie_id: string, kategorie_name: string}) {
    return(
        <dialog id={`${kategorie_id}-deletion-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
                <h1 className="text-xl">Bist du sicher?</h1>
                <div className="flex gap-1">
                    <span>{`Kategorie "`}</span>
                    <span className="text-red-500">{kategorie_name}</span>
                    <span>{`" wird gelöscht!`}</span>
                </div>
                
                <div className="flex gap-5 w-full">
                    <button className="btn btn-success w-[calc(50%-10px)]" onClick={() => {
                        const deletion_modal = document.getElementById(`${kategorie_id}-deletion-modal`) as HTMLDialogElement;
                        if (deletion_modal) {
                            deletion_modal.close()
                        }
                    }}>Zurück</button>
                    <button className="btn btn-error w-[calc(50%-10px)]" onClick={() => {
                        deleteKategorie(kategorie_id)
                        const deletion_modal = document.getElementById(`${kategorie_id}-deletion-modal`) as HTMLDialogElement;
                        if (deletion_modal) {
                            deletion_modal.close()
                        }
                    }}>Delete</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

function KategorieEditModal({kategorie_name, kategorie_id, enabled}: {kategorie_name: string, kategorie_id: string, enabled: boolean}) {
    const [name, setName] = useState<string>(kategorie_name)
    return(
        <dialog id={`${kategorie_id}-edit-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
            <h1 className="text-xl mr-auto">Kategorie Name</h1>
            <input type="text" name="name" id="name-kategorie" className="input input-bordered w-full" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <div className="flex gap-5 w-full">
                <button className="btn btn-error w-[calc(50%-10px)]" onClick={() => {
                    const deletion_modal = document.getElementById(`${kategorie_id}-edit-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Zurück</button>
                <button className="btn btn-success w-[calc(50%-10px)]" onClick={async () => {
                    await updateKategorie(kategorie_id, name, enabled)
                    const deletion_modal = document.getElementById(`${kategorie_id}-edit-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Speichern</button>
            </div>
        </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}


function Vorschlag({vorschlag, username, token} : {vorschlag: Vorschlag, username: string, token: string}) {
    const [liked, setLiked] = useState<boolean>(!!vorschlag['likes'].includes(username))
    const [disabled, setDisabled] = useState<boolean>(false);

    function disable() {
        setDisabled(false)
    }

    return(
    <div className="flex justify-between bg-gray-200 rounded-lg w-auto p-2 relative overflow-visible">
        { username === "admin" || username === vorschlag.author ?
            <button className="absolute btn btn-xs btn-circle -right-3 -top-3" onClick={() => {
                const modal = document.getElementById(`${vorschlag.id}-deletion-modal`) as HTMLDialogElement;
                modal.showModal();
            }}>X</button> : <></>
        }
        
        <div className="flex flex-col">
            <span>{vorschlag.vorschlag}</span>
            <span className="text-xs text-gray-700 font-sans mt-auto">{getCleanUser(vorschlag.author)}</span>
        </div>
        { username === "admin" ? <></> :
            <div className="flex flex-col items-center mr-2">
                <button className="flex justify-center items-center" disabled={disabled} onClick={async () => {
                    if (liked) {
                        await deleteLike(vorschlag.id, token)
                    } else {
                        await addLike(vorschlag.id, token)
                    }
                    setLiked((prev) => !prev)
                    setDisabled(true);
                    setTimeout(disable, 2000)
                }}>
                    {liked ? heartFullSVG : heartEmptySVG}
                </button>
                <span>{vorschlag.likes.length}</span>
            </div>
            
        }
            
        
        <DeleteModal vorschlag_id={vorschlag.id}/>
    </div>
    )
}

function DeleteModal({vorschlag_id}:{vorschlag_id: string}) {
    return(
        <dialog id={`${vorschlag_id}-deletion-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
            <h1 className="text-xl">Bist du sicher?</h1>
            <div className="flex gap-5 w-full">
                <button className="btn btn-success w-[calc(50%-10px)]" onClick={() => {
                    const deletion_modal = document.getElementById(`${vorschlag_id}-deletion-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Zurück</button>
                <button className="btn btn-error w-[calc(50%-10px)]" onClick={async () => {
                    await deleteVorschlag(vorschlag_id);
                    const deletion_modal = document.getElementById(`${vorschlag_id}-deletion-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Delete</button>
            </div>
        </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}