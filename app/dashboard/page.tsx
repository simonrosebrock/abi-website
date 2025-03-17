'use server'
import { getAuth } from '@/app/lib/getAuth';
import NextAppointment from '@/app/ui/dashboard/nextAppointment';
import RevenueTracker from '@/app/ui/dashboard/revenueTracker';
import { getClosestTermin, getFixCost } from '@/app/lib/dbConnection';
import { QueryResultRow } from '@vercel/postgres';

type FinanzenTable = {name: string, money: number}[]
type CheckpointsTable = {money: number, cardprice: number}[]

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

    if (role === "user")
        return (
            <div className='grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal'>
                <NextAppointment termin={termin}/> 
            </div>);
    else if (role === "admin") //admin user
        return <h1>Welcome Admin</h1>;
    
    
};

export default Dashboard;