'use client'

const arrowSVG= (
    <svg fill="#000000" height="60px" width="60px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
        <path id="XMLID_21_" d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
        c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15
        V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"/>
    </svg>
)

export default function RevenueTracker({value, max}: {value: number, max: number}) {
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
            <div className={`bg-gradient-to-b from-blue-700 to-cyan-300 text-xs font-medium text-blue-100 text-center p-0.5 w-auto rounded-full`} style={{ height: `${percentage}px` }}></div>
        </div>
    );
}