
import { redirect, useRouter } from 'next/navigation'
import { getAuth } from '@/app/lib/getAuth';
import { NextAppointment } from '@/app/ui/dashboard/nextAppointment';
import { getClosestTermin } from '../lib/dbConnection';
import { QueryResultRow } from '@vercel/postgres';

const Dashboard = async () => {
    const [token, role, user] = await getAuth();
    const termin: QueryResultRow = await getClosestTermin();

    if (!token) {
        redirect("/login");
    }
    
    // <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
    // <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
    // <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>

    if (role === "abi")
        return (
            <div className='grow flex flex-wrap gap-5 p-5 max-h-[calc(100vh-103px)] lg:max-h-[calc(100vh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal'>
                <NextAppointment termin={termin}/> 
            </div>);
    else if (role === "admin") //admin user
        return <h1>Welcome Admin</h1>;
    
    
};

export default Dashboard;