
import { redirect, useRouter } from 'next/navigation'
import { getAuth } from '@/app/lib/getAuth';
import { NextAppointment } from '@/app/ui/dashboard/nextAppointment';

const Dashboard = async () => {
    const [token, role, user] = await getAuth();

    if (!token) {
        redirect("/login");
    }
    
    if (role === "abi") //abi user
        return (
            <div className='h-auto flex flex-wrap'>
                <NextAppointment/>
                <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
                <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
                <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
            </div>);
    else if (role === "admin") //admin user
        return <h1>Welcome Admin</h1>;
    
    
};

export default Dashboard;