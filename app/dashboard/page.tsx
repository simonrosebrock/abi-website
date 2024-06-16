'use client'

import { useRouter } from 'next/navigation'
import { getAuth } from '@/app/lib/getAuth';
import { useEffect, useState } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextAppointment } from '@/app/ui/dashboard/nextAppointment';

const Dashboard = () => {
    const router = useRouter()
    const [token, setToken] = useState<string | RequestCookie | undefined>();
    const [user, setUser] = useState<string | RequestCookie | undefined>();

    useEffect(() => {
        Promise.resolve(getAuth()).then((info) => {setToken(info[0]); setUser(info[1]); if(!info[0]) {router.push("/login")}});
    }, [])

    if (token) {
        if (user === "abi") //abi user
            return (
                <div className='h-auto flex flex-wrap'>
                    <NextAppointment/>
                    <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
                    <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
                    <div className='w-[250px] h-[250px] bg-red-900 rounded-lg'></div>
                </div>);
        else if (user === "admin") //admin user
            return <h1>Welcome Admin</h1>;
    }
    
    
};

export default Dashboard;