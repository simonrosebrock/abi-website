import { getAusgaben, getEinnahmen } from "@/app/lib/dbConnection";
import PieChart from "@/app/ui/finanzen/pieChart";
import RevenueTrackerBig from "@/app/ui/finanzen/revenueTrackerBig";
import { QueryResultRow } from "@vercel/postgres";
import { getAuth } from "@/app/lib/getAuth";
import EditFinanzen from "@/app/ui/finanzen/editFinanzen";

type FinanzenTable = {name: string, money: number}[]

const Finanzen = async () => {
    const ausgaben:FinanzenTable = await getAusgaben();
    const einnahmen:number = await getEinnahmen();

    var [token, role, user] = await getAuth();

    var ausgabenSum = 0;
    ausgaben.forEach((element: any) => {
        ausgabenSum += element.money;
    });

    if (user === "admin") {
        return(
            <div className="flex flex-wrap gap-5 p-5 max-h-[calc(100vh-103px)] lg:max-h-[calc(100vh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
                <EditFinanzen einnahmen={einnahmen} ausgaben={ausgaben}/>
            </div>
        );
    }

    return(
        <div className="flex flex-wrap gap-5 p-5 max-h-[calc(100vh-103px)] lg:max-h-[calc(100vh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            <RevenueTrackerBig ausgaben={ausgabenSum} einnahmen={einnahmen} />
            <PieChart ausgaben={ausgaben}/>
        </div>
    );

    
    
}

export default Finanzen;