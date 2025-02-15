
import { getAuth } from '@/app/lib/getAuth';
import NextAppointment from '@/app/ui/dashboard/nextAppointment';
import RevenueTracker from '@/app/ui/dashboard/revenueTracker';
import { getClosestTermin, getAusgaben, getEinnahmen, getCheckpoints, getExcessGoal } from '@/app/lib/dbConnection';
import { QueryResultRow } from '@vercel/postgres';

type FinanzenTable = {name: string, money: number}[]
type CheckpointsTable = {money: number, cardprice: number}[]

const Dashboard = async () => {
    const [token, role, user] = await getAuth();
    const termin: QueryResultRow = await getClosestTermin();
    const ausgaben: FinanzenTable = await getAusgaben();
    const einnahmen: number = await getEinnahmen();
    const checkpoints:CheckpointsTable = await getCheckpoints();
    const excessGoal:number = await getExcessGoal();

    

    var ausgabenSum = 0;
    ausgaben.forEach((element: any) => {
        ausgabenSum += element.money;
    });

    if (role === "user")
        return (
            <div className='grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal'>
                <NextAppointment termin={termin}/> 
                <RevenueTracker value={einnahmen} max={ausgabenSum} excessGoal={excessGoal} checkpoints={checkpoints}/>
            </div>);
    else if (role === "admin") //admin user
        return <h1>Welcome Admin</h1>;
    
    
};

export default Dashboard;