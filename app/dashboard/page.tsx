'use server'
import { getAuth } from '@/app/lib/getAuth';
import NextAppointment from '@/app/ui/dashboard/nextAppointment';
import { getClosestTermin, getFeatures, getFixCost, updateFeatures } from '@/app/lib/dbConnection';
import { QueryResultRow } from '@vercel/postgres';
import FeatureSelect from '@/app/ui/general/featureSelect';

type FinanzenTable = {name: string, value: number}[]

const Dashboard = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    const termin: QueryResultRow = await getClosestTermin();
    const ausgaben: FinanzenTable = await getFixCost();

    

    var ausgabenSum = 0;
    ausgaben.forEach((element: any) => {
        ausgabenSum += element.money;
    });

    const dashboardFeatures = await getFeatures("dashboard");

    if (role === "user")
        return (
            <div className='grow flex flex-wrap gap-5 p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal'>
                {
                    dashboardFeatures[0] ? <NextAppointment termin={termin}/> : <></>
                }
                
            </div>);
    else if (role === "admin") { //admin user
        const featureList = await getFeatures("general")
        const homepageFeatures = await getFeatures("homepage")
        homepageFeatures.push(dashboardFeatures[0])
        return (
            <div className='grow flex flex-wrap gap-5 p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal'>
                <FeatureSelect featureList={featureList}/>
                <FeatureSelect featureList={homepageFeatures}/>
            </div>
        );
    }
};

export default Dashboard;