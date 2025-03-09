'use client'
import { getCleanUser } from "@/app/lib/miniFuncs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const copySVG = (
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 14H19C20.1046 14 21 13.1046 21 12V5C21 3.89543 20.1046 3 19 3H12C10.8954 3 10 3.89543 10 5V6.5M5 10H12C13.1046 10 14 10.8954 14 12V19C14 20.1046 13.1046 21 12 21H5C3.89543 21 3 20.1046 3 19V12C3 10.8954 3.89543 10 5 10Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default function NewAccountModal({account, password}: {account: string, password: string}) {
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();
    
    return(
        <dialog id={`new-account-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
                <div className="flex gap-1 text-xl">
                    <h1>Passwort von</h1>
                    <h1 className="text-red-500">{getCleanUser(account)}</h1>
                    <h1>:</h1>
                </div>
                <div className="flex gap-5 items-center border-gray-300 border-2 rounded-lg w-full justify-center">
                    <span>{password}</span>
                    <button className="btn btn-ghost btn-sm w-[40px] h-[40px] p-0" onClick={() => {
                        navigator.clipboard.writeText(password);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000); 
                    }}>{copySVG}</button>
                </div>
            </div>
            <div className="toast fixed bottom-10 left-1/2 -translate-x-1/2">
                <div 
                className={`px-4 py-2 rounded-lg shadow-lg alert alert-success flex justify-center items-center 
                    transition-all ease-out
                    ${showToast ? "opacity-100 scale-100 duration-150" : "opacity-0 scale-95 duration-1000"}`}
                >
                <span>kopiert!</span>
                </div>
            </div>
                
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {
                    router.refresh()
                }}>close</button>
            </form>
        </dialog>
    )
}