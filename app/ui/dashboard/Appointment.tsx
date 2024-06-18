'use client'

type AppointmentProps = {
    title: string;
    description: string;
    ort: string;
    date: Date;
    start_time: string;
    end_time: string;
    personen: string[];
};

export function Appointment({title, description, ort, date, start_time, end_time, personen}: AppointmentProps) {
    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col">
            <div className="flex">
                <div className="flex flex-col">
                    <span className="text-[#05004E] text-xl">{title}</span>
                    <span className="text-abi-gray">{ort}</span>
                </div>
                
                <button className="btn btn-circle btn-ghost btn-xs ml-auto self-start" onClick={() => {var modal = document.getElementById('description_modal') as HTMLDialogElement; modal.showModal()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                    </svg>
                </button>
                <dialog id="description_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                        <p>{description}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="mt-auto mb-auto ">
                <div className="flex">
                    <span>Personen</span>
                    <button className="btn btn-circle btn-ghost btn-xs ml-auto" onClick={() => {var modal = document.getElementById('personen_modal') as HTMLDialogElement; modal.showModal()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                    </button>
                    <dialog id="personen_modal" className="modal">
                        <div className="modal-box">
                            <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                            <h3 className="text-abi-black text-lg mb-5">Personen</h3>
                            <div className="h-auto p-2 w-auto bg-red-300 rounded-md flex flex-col">
                                <span className="font-bold">Verkauf</span>
                                <div id="personen-div" className="flex gap-3 mt-2">
                                    {personen.map((name, index) => (
                                        <div id={`${name}-${index}`} className="indicator">
                                            <button onClick={() => {var element = document.getElementById(`${name}-${index}`) as HTMLElement; element.style.display = 'none';}} className="indicator-item badge bg-white scale-75 hover:bg-gray-300 font-bold border-black">X</button> 
                                            <div className="grid w-auto h-auto bg-white place-items-center rounded-md pl-1 pr-1">{name}</div>
                                        </div>
                                    ))}
                                    <button className="btn btn-sm bg-white rounded-md h-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                        </svg>
                                    </button>
                                </div>
                                
                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={() => {console.log("gaysex")}}>Speichern</button>
                                </form>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => {var parent_div = document.getElementById("personen-div") as HTMLElement;}}>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="w-[200px] text-abi-gray text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-red-500">•</span>
                    <span> Simon, Marek, David</span>
                </div>
                <div className="w-[200px] text-abi-gray text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-blue-600">•</span>
                    <span> Giuliano, Torben, Leo</span>
                </div>
                
                
                
            </div>
            <span className="text-abi-gray text-md">Mo, 15 Jul 2024</span>
            <span className="text-abi-gray text-md">{`${start_time} - ${end_time} Uhr`}</span>
        </div>
    );
}