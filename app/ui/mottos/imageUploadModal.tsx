import React, { forwardRef } from "react";

const ImageUploadModal = ({ currentFile, fileCount }: { currentFile: number, fileCount: number }, ref: React.Ref<HTMLDialogElement>) => {
    return (
        <dialog ref={ref} className="modal">
            <div className="modal-box">
                <div className="flex flex-col items-center">
                    <h2 className="font-bold text-xl text-abi-black mb-4">Uploading</h2>
                    <progress className="progress progress-primary w-56 h-3" value={currentFile} max={fileCount}></progress>
                    <span>{currentFile + "/" + fileCount}</span>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => {}}>close</button>
            </form>
        </dialog>
    );
};

export default forwardRef(ImageUploadModal);