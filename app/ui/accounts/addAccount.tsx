'use client'
import { useRef, useState } from "react";
import NewAccountModal from "./newAccountModal";
import { createAccount } from "@/app/lib/dbConnection";

export default function AddAccount() {
    return(
        <>
            <button className="flex max-w-[600px] bg-white rounded-2xl h-[50px] btn text-abi-black" onClick={() => {
                const modal = document.getElementById(`account-creation-modal`) as HTMLDialogElement
                if (modal) {
                    modal.showModal()
                }
            }}>
                CREATE ACCOUNT
            </button>
            <AccountCreationModal/>
        </>
    )
}

function AccountCreationModal() {
    const formRef = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");

    return(
            <dialog id={`account-creation-modal`} className="modal">
                <div className="modal-box">
                    <div tabIndex={-1} className="absolute opacity-0"></div>
                    <form ref={formRef} className="flex flex-col items-center p-2 gap-5" onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        const vorname = (formData.get("vorname") as string).toLowerCase().trim()
                        const nachname = (formData.get("nachname") as string).toLowerCase().trim()

                        const localUsername = `${vorname}_${nachname}`
                        setUsername(localUsername);
                        const localPassword = `${localUsername.split("_")[0]}${Math.floor(100000 + Math.random() * 900000)}`
                        setPassword(localPassword);

                        if (!await createAccount(localUsername, localPassword)) {
                            setFeedback("Der Name existiert bereits!")
                            return;
                        }
                        setFeedback("");
                        const new_account_modal = document.getElementById(`new-account-modal`) as HTMLDialogElement
                        const account_creation_modal = document.getElementById(`account-creation-modal`) as HTMLDialogElement
                        if (new_account_modal && account_creation_modal) {
                            account_creation_modal.close()
                            new_account_modal.showModal()
                            formRef.current?.reset()
                        }
                    }}>
                        <div className="flex gap-5">
                            <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                                <input className="w-full"  type="text" name='vorname' placeholder="Vorname" required/>
                            </label>
                            <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                                <input className="w-full"  type="text" name='nachname' placeholder="Nachname" required/>
                            </label>
                        </div>
                        <button className="btn text-abi-black w-full">Erstellen</button>
                        <span className={`${feedback.length === 0 ? "hidden":"block"} text-red-500`}>{feedback}</span>
                    </form>
                    <NewAccountModal account={username} password={password}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => {
                        setFeedback("");
                        formRef.current?.reset()
                    }}>close</button>
                </form>
            </dialog>
        )
}