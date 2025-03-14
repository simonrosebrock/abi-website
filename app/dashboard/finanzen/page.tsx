import { getFixCost, getVarCost, getGeneralFinanzen } from "@/app/lib/dbConnection";
import FixCostChart from "@/app/ui/finanzen/fixCostChart";
import VarCostChart from "@/app/ui/finanzen/varCostChart";
import RevenueTrackerBig from "@/app/ui/finanzen/revenueTrackerBig";
import { getAuth } from "@/app/lib/getAuth";
import CardPrice from "@/app/ui/finanzen/cardPrice";
import EditGeneral from "@/app/ui/finanzen/editGeneral";
import EditFixCost from "@/app/ui/finanzen/editFixCost";
import EditVarCost from "@/app/ui/finanzen/editVarCost";

type FinanzenTable = {name: string, money: number}[]

const Finanzen = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];

    const fixCost:FinanzenTable = await getFixCost();
    const varCost:FinanzenTable = await getVarCost();

    const generalFinanzen = await getGeneralFinanzen();
    const einnahmen = generalFinanzen.find(row => row.name === 'Einnahmen')?.value || 0;
    const guestCount = generalFinanzen.find(row => row.name === 'GuestCount')?.value || 0;
    const customZiel = generalFinanzen.find(row => row.name === 'CustomZiel')?.value || 0;
    const customCardPrice = generalFinanzen.find(row => row.name === 'CustomCardPrice')?.value || 0;

    var fixCostSum = 0;
    fixCost.forEach((element: any) => {
        fixCostSum += element.money;
    });

    var varCostSum = 0;
    varCost.forEach((element: any) => {
        varCostSum += element.money;
    });

    if (role === "admin") {
        return(
            <div className="flex flex-wrap gap-5 p-5 h-[calc(100dvh-103px)] lg:h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
                <EditGeneral einnahmen={einnahmen} guestCount={guestCount} customZiel={customZiel} customCardPrice={customCardPrice}/>
                <EditFixCost fixCost={fixCost}/>
                <EditVarCost varCost={varCost}/>
            </div>
        );
    }
    var uberschuss_einnahmen = einnahmen - fixCostSum;
    if (uberschuss_einnahmen < 0) {
        uberschuss_einnahmen = 0;
    }
    
    return(
        <div className="flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            <RevenueTrackerBig ausgaben={fixCostSum} einnahmen={einnahmen} customZiel={customZiel}/>
            <FixCostChart ausgaben={fixCost}/>
            <VarCostChart ausgaben={varCost}/>
            <CardPrice einnahmen={einnahmen} fixCost={fixCostSum} varCost={varCostSum} guestCount={guestCount} customCardPrice={customCardPrice}/>
        </div>
    );

    
    
}

export default Finanzen;