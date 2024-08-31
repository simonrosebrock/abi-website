'use server'

import { getAuth } from '@/app/lib/getAuth';
import { redirect } from 'next/navigation';
import Sidebar from '@/app/dashboard/sidebar';

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const [token, role, user] = await getAuth();
    if (!token) {
        redirect("/login");
    }

    return(
        <Sidebar children={children} user={user}/>
    )
}
