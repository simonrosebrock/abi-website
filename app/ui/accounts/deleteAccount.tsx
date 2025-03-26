'use client'
import { deleteAccount } from "@/app/lib/dbConnection";
import { getCleanUser } from "@/app/lib/miniFuncs";
import { useRouter } from "next/navigation";

export default function DeleteAccount({account, token}: {account: string, token: string}) {
    
    return(
        <>
            <button className="btn btn-error btn-sm" onClick={() => {
                const deletion_modal = document.getElementById(`${account}-deletion-modal`) as HTMLDialogElement;
                if (deletion_modal) {
                    deletion_modal.showModal();
                }
            }}>
                DELETE
            </button>
            <DeletionModal account={account} token={token}/>
        </>
    )
}

function DeletionModal({account, token}: {account: string, token: string}) {
    const router = useRouter();
    return(
        <dialog id={`${account}-deletion-modal`} className="modal">
            <div className="modal-box flex flex-col items-center gap-5">
            <h1 className="text-xl">Bist du sicher?</h1>
            <span className="text-wrap">
                <span>{`Account "`}</span>
                <span className="text-red-500">{getCleanUser(account)}</span>
                <span>{`" wird gelöscht!`}</span>
            </span>
                
            <div className="flex gap-5 w-full">
                <button className="btn btn-success w-[calc(50%-10px)]" onClick={() => {
                    const deletion_modal = document.getElementById(`${account}-deletion-modal`) as HTMLDialogElement;
                    if (deletion_modal) {
                        deletion_modal.close()
                    }
                }}>Zurück</button>
                <button className="btn btn-error w-[calc(50%-10px)]" onClick={() => {
                    deleteAccount(token);
                    router.refresh()
                    const deletion_modal = document.getElementById(`${account}-deletion-modal`) as HTMLDialogElement;
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