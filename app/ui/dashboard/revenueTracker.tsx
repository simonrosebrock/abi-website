'use client'


const arrowSVG= (
    <svg fill="#000000" height="60px" width="60px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
        <path id="XMLID_21_" d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
        c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15
        V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"/>
    </svg>
)

const infoSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20 md:30" height="20 md:30" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
)
type CheckpointsTable = {money: number, cardprice: number}[]

export default function RevenueTracker({value, max, excessGoal, checkpoints}: {value: number, max: number, excessGoal: number, checkpoints: CheckpointsTable}) {
    if (value - max > 0) {
        return(
            <CardPrice value={value-max} max={excessGoal} checkpoints={checkpoints}/>
        );
    }

    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex">
            {/* <div className="flex justify-around h-24 rounded-md border-black border-2">
                <div className="flex flex-col justify-around items-center">
                    <span>Jetzt</span>
                    <span>Ziel</span>
                </div>
                <div className="flex flex-col justify-around items-center">
                    <span>7000</span>
                    <span>9600</span>
                </div>
            </div> */}
            <ProgressBar value={value} max={max}></ProgressBar>
            <div className="flex flex-col items-center w-[230px]">
                <h3 className="text-[#05004E] text-2xl">Einnahmen</h3>
                <div className="h-[100%] flex flex-col justify-evenly">
                    <span className="flex justify-center text-lg">{max + " €"}</span>
                    <span className="text-gray-500">{arrowSVG}</span>                    
                    <span className="flex justify-center text-lg">{value + " €"}</span>
                </div>
            </div>
        </div>
    );
}
//${percentage}%
type progressBarProps = {
    value: number,
    max: number
}
//<span className="text-white text-xl">{percentage}%</span>

const ProgressBar = ({value, max}: progressBarProps) => {
    var percentage = Math.round((100/max*value)/100*230);
    return(
        <div className="w-14 bg-gray-200 rounded-full h-[230px] flex flex-col-reverse">
            <div className={`flex justify-center items-center bg-gradient-to-b from-blue-700 to-cyan-300 text-xs font-medium text-center p-0.5 w-auto rounded-full text-white`} style={{ height: `${percentage}px` }}>{Math.round(100/max*value) + "%"}</div>
        </div>
    );
}

function CardPrice({value, max, checkpoints}: {value: number, max: number, checkpoints: CheckpointsTable}) {
    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col items-center">
            <div className="flex items-center justify-center relative">
                <h3 className="text-[#05004E] text-2xl">Überschuss</h3>
                <DescriptionModal title="Erklärung" description={
                    <>
                    Wenn die Einnahmen die Fixkosten (Wichtig: können aufgrund von Kostenerhöhungen bei der Hohensyburg noch steigen) überschreiten, 
                    könnten diese Überschüsse zur Senkung des Kartenpreises verwendet werden. 
                </>
                }/>
                <button className="btn btn-circle btn-ghost btn-xs self-start absolute ml-[200px] mt-1" onClick={() => {
                    var modal = document.getElementById(`description_modal_money`) as HTMLDialogElement; 
                    if (modal) {modal.showModal()}
                }}>
                    {infoSVG}
                </button>
            </div>
            <span className="ml-auto mr-2 text-sm">Kartenpreis</span>
            <div className="flex w-full h-[230px] pt-7 pb-4">
                <ProgressBar2 value={value} max={max}/>
                <div className="flex flex-col grow relative">
                    {
                        checkpoints.map((values, index) => (
                            <Checkpoint key={`checkpoint-${index}`} value={values.money} max={max} cardprice={values.cardprice}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

const ProgressBar2 = ({value, max}: {value: number, max: number}) => {
    var percentage = Math.round(100/max*value);
    return(
        <div className="w-10 bg-gray-200 rounded-full h-[150px] flex flex-col-reverse overflow-hidden items-center ml-4 mr-2">
            <div className={`bg-gradient-to-b from-blue-700 to-cyan-300 text-xs font-medium text-blue-100 text-center p-0.5 w-full`} style={{ height: `${percentage}%` }}></div>
            <span className="text-xs">{value + "€"}</span>
        </div>
    );
}

const Checkpoint = ({value, max, cardprice}: {value: number, max: number, cardprice: number}) => {
    const percentage = Math.round(150 - (1 / max * value * 150) - 22);

    return(
        <div className="absolute flex h-[40px] items-center" style={{marginTop: percentage}}>
            <div className="flex flex-col items-center h-auto mb-auto mr-2">
                <span>{value + "€"}</span>
                <hr className="w-[90px] h-[2px] bg-gray-400"/>
            </div>
            <span className="text-xl">{cardprice + "€"}</span>
        </div>
    );
}

const DescriptionModal = ({title, description}: {title: string, description: any}) => {
    return(
        <dialog id={`description_modal_money`} className="modal">
            <div className="modal-box">
                <h3 className="text-abi-black text-lg font-bold">{title}</h3>
                <p>{description}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
        
}