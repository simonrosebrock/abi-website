

export default function RevenueTrackerBig({ausgaben, einnahmen, customZiel}: {ausgaben: number, einnahmen: number, customZiel: number}) {
    const ziel = (customZiel === 0 ? ausgaben : customZiel) | 0;

    return(
        <div className="w-full h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col items-center">
            <h2 className="text-[#05004E] text-2xl lg:text-5xl mb-4">Abikasse</h2>
            <ProgressBar value={einnahmen} max={ziel}/>
            <div className="flex mt-auto mb-auto sm:justify-around w-full flex-col sm:flex-row items-center">
                <div>
                    <span className="text-2xl text-gray-400">Einnahmen</span>
                    <span className="text-2xl ml-4">{einnahmen + "€"}</span>
                </div>
                <div>
                    <span className="text-2xl text-gray-400">Ziel</span>
                    <span className="text-2xl ml-4">{ziel + "€"}</span>
                </div>
            </div>
        </div>
    );
}

const ProgressBar = ({value, max}: {value: number, max: number}) => {
    var percentage = Math.round(100/max*value);
    if (percentage > 100) {
        percentage = 100;
    }
    return(
        <>
            <div className="w-full bg-gray-200 rounded-full h-20 overflow-hidden">
                <div className={`bg-gradient-to-r from-blue-700 to-cyan-300 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full h-20 flex items-center justify-center`} style={{width: percentage+"%"}}>
                    <span className="text-white text-2xl">{percentage + "%"}</span>
                </div>
            </div>
        </>
    );
}