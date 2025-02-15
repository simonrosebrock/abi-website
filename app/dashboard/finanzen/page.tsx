import { getAusgaben, getCheckpoints, getEinnahmen, getExcessGoal } from "@/app/lib/dbConnection";
import PieChart from "@/app/ui/finanzen/pieChart";
import RevenueTrackerBig from "@/app/ui/finanzen/revenueTrackerBig";
import { getAuth } from "@/app/lib/getAuth";
import EditFinanzen from "@/app/ui/finanzen/editFinanzen";
import CardPrice from "@/app/ui/finanzen/cardPrice";
import EditCardPrices from "@/app/ui/finanzen/editCardPrices";

type FinanzenTable = {name: string, money: number}[]
type CheckpointsTable = {money: number, cardprice: number}[]

const Finanzen = async () => {
    const ausgaben:FinanzenTable = await getAusgaben();
    const einnahmen:number = await getEinnahmen();

    const checkpoints:CheckpointsTable = await getCheckpoints();
    const excessGoal:number = await getExcessGoal();

    var [token, role, user] = await getAuth();

    var ausgabenSum = 0;
    ausgaben.forEach((element: any) => {
        ausgabenSum += element.money;
    });

    if (user === "admin") {
        return(
            <div className="flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
                <EditFinanzen einnahmen={einnahmen} ausgaben={ausgaben}/>
                <EditCardPrices checkpoints={checkpoints} excessGoal={excessGoal} />
            </div>
        );
    }
    var uberschuss_einnahmen = einnahmen - ausgabenSum;
    if (uberschuss_einnahmen < 0) {
        uberschuss_einnahmen = 0;
    }
    
    return(
        <div className="flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            <RevenueTrackerBig ausgaben={ausgabenSum} einnahmen={einnahmen} />
            <PieChart ausgaben={ausgaben}/>
            <CardPrice value={uberschuss_einnahmen} max={excessGoal} checkpoints={checkpoints}/>
        </div>
    );

    
    
}

export default Finanzen;