'use client'

import { useState } from "react";
import PasswordApprovalModal from "@/app/ui/accounts/passwordApprovalModal"
import { updateAccountName } from "@/app/lib/dbConnection";
import { useRouter } from "next/navigation";

export default function EditAccount({account, token}: {account: string, token: string}) {
    return(
        <>
            <button className="btn btn-warning btn-sm" onClick={() => {
                const modal = document.getElementById(`${account}-modal`) as HTMLDialogElement;
                if (modal) {modal.showModal()}
            }}>
                EDIT
            </button>
            <EditAccountModal account={account} token={token}/>
        </>
    )
}

function EditAccountModal({account, token}: {account: string, token: string}) {
    const [vorname, setVorname] = useState<string>(account.split("_")[0].charAt(0).toUpperCase() + account.split("_")[0].slice(1))
    const [nachname, setNachname] = useState<string>(account.split("_")[1].charAt(0).toUpperCase() + account.split("_")[1].slice(1))
    const [feedback, setFeedback] = useState<string>("");
    const router = useRouter();

    return(
        <dialog id={`${account}-modal`} className="modal">
            <div className="modal-box">
                <div tabIndex={-1} className="absolute opacity-0"></div>
                <form className="flex flex-col p-2 gap-5 items-center" onSubmit={async (e) => {
                    e.preventDefault()
                    if (account === `${vorname.toLowerCase().trim()}_${nachname.toLowerCase().trim()}`) {
                        setFeedback("Ändere zuerst den Namen!")
                        return;
                    }
                    if (!await updateAccountName(token, `${vorname.toLowerCase().trim()}_${nachname.toLowerCase().trim()}`)) {
                        setFeedback("Der Name existiert bereits!")
                        return;
                    }
                    router.refresh()
                }}>
                    <div className="flex gap-5">
                        <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                            <input className="w-full"  type="text" name='vorname' placeholder="Vorname" value={vorname} onChange={(e) => {
                                setVorname(e.target.value)
                            }} required/>
                        </label>
                        <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                            <input className="w-full"  type="text" name='nachname' placeholder="Nachname" value={nachname} onChange={(e) => {
                                setNachname(e.target.value)
                            }} required/>
                        </label>
                    </div>
                    <button className="btn text-abi-black w-full">SAVE</button>
                    <span className={`${feedback.length === 0 ? "hidden": "block"} text-red-500`}>{feedback}</span>
                </form>
                <button className="btn btn-warning ml-2 mr-2 w-[calc(100%-16px)] mt-5" onClick={() => {
                    const approval_modal = document.getElementById(`${account}-approval-modal`) as HTMLDialogElement;
                    const edit_modal = document.getElementById(`${account}-modal`) as HTMLDialogElement;
                    if (approval_modal && edit_modal) {
                        edit_modal.close()
                        approval_modal.showModal()
                    }
                }}>Reset Password</button>
                <PasswordApprovalModal account={account} token={token}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    setFeedback("");
                    setVorname(account.split("_")[0].charAt(0).toUpperCase() + account.split("_")[0].slice(1));
                    setNachname(account.split("_")[1].charAt(0).toUpperCase() + account.split("_")[1].slice(1));
                }}>close</button>
            </form>
        </dialog>
    )
}