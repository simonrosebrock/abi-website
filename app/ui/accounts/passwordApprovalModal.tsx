'use client'
import { updateAccountPassword } from "@/app/lib/dbConnection";
import { getCleanUser } from "@/app/lib/miniFuncs";
import NewPasswordModal from "@/app/ui/accounts/newPasswordModal";
import { useState } from "react";

export default function PasswordApprovalModal({account, token}: {account: string, token: string}) {
    const [password, setPassword] = useState("")

    return(
        <dialog id={`${account}-approval-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
                <h1 className="text-xl">Bist du sicher?</h1>
                <div className="flex gap-2">
                    <span>{`Passwort Reset von`}</span>
                    <span className="text-red-500">{getCleanUser(account)}</span>
                </div>
                    
                <div className="flex gap-5 w-full">
                    <button className="btn btn-success w-[calc(50%-10px)]" onClick={() => {
                        const approval_modal = document.getElementById(`${account}-approval-modal`) as HTMLDialogElement;
                        const edit_modal = document.getElementById(`${account}-modal`) as HTMLDialogElement;
                        if (approval_modal && edit_modal) {
                            approval_modal.close()
                            edit_modal.showModal()
                        }
                    }}>Zurück</button>
                    <button className="btn btn-error w-[calc(50%-10px)]" onClick={async () => {
                        const localPassword = `${account.split("_")[0]}${Math.floor(100000 + Math.random() * 900000)}`
                        setPassword(localPassword);

                        await updateAccountPassword(token, localPassword);

                        const approval_modal = document.getElementById(`${account}-approval-modal`) as HTMLDialogElement;
                        const password_modal = document.getElementById(`${account}-password-modal`) as HTMLDialogElement;
                        if (approval_modal && password_modal) {
                            approval_modal.close()
                            password_modal.showModal()
                        }
                    }}>Weiter</button>
                </div>
                <NewPasswordModal account={account} password={password}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                
                }}>close</button>
            </form>
        </dialog>
    )
}