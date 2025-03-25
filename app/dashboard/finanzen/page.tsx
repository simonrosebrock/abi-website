import { getFixCost, getVarCost, getGeneralFinanzen, getFeatures } from "@/app/lib/dbConnection";
import FixCostChart from "@/app/ui/finanzen/fixCostChart";
import VarCostChart from "@/app/ui/finanzen/varCostChart";
import RevenueTrackerBig from "@/app/ui/finanzen/revenueTrackerBig";
import { getAuth } from "@/app/lib/getAuth";
import CardPrice from "@/app/ui/finanzen/cardPrice";
import EditGeneral from "@/app/ui/finanzen/editGeneral";
import EditFixCost from "@/app/ui/finanzen/editFixCost";
import EditVarCost from "@/app/ui/finanzen/editVarCost";
import FeatureSelect from "@/app/ui/general/featureSelect";

type FinanzenTable = {name: string, value: number}[]

const Finanzen = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];

    const fixCost:FinanzenTable = await getFixCost();
    const varCost:FinanzenTable = await getVarCost();

    const generalFinanzen = await getGeneralFinanzen();
    const einnahmen = generalFinanzen.find(row => row.name === 'einnahmen')?.value || 0;
    const guestCount = generalFinanzen.find(row => row.name === 'guestcount')?.value || 0;
    const customZiel = generalFinanzen.find(row => row.name === 'customziel')?.value || 0;
    const customCardPrice = generalFinanzen.find(row => row.name === 'customcardprice')?.value || 0;

    var fixCostSum = 0;
    fixCost.forEach((element: any) => {
        fixCostSum += element.money;
    });

    var varCostSum = 0;
    varCost.forEach((element: any) => {
        varCostSum += element.money;
    });

    const features = await getFeatures("finanzen");
    const featureList = features.reduce((acc: any, { feature, value }) => {
        acc[feature] = value;
        return acc;
    }, {});

    if (role === "admin") {
        return(
            <div className="flex flex-wrap gap-5 p-5 md:pt-5 pt-0 h-[calc(100dvh-103px)] lg:h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
                <FeatureSelect featureList={features}/>
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
        <div className="flex flex-wrap gap-5 p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            { featureList["Einnahmeziel"] ? <RevenueTrackerBig ausgaben={fixCostSum} einnahmen={einnahmen} customZiel={customZiel}/> : <></> }
            { featureList["Fixkosten"] ? <FixCostChart ausgaben={fixCost}/> : <></> }
            { featureList["Kosten pro Person"] ? <VarCostChart ausgaben={varCost}/> : <></> }
            { featureList["Kartenpreis"] ? <CardPrice einnahmen={einnahmen} fixCost={fixCostSum} varCost={varCostSum} guestCount={guestCount} customCardPrice={customCardPrice}/> : <></> }
        </div>
    );    
}

export default Finanzen;