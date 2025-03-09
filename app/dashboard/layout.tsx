'use server'

import { getAuth } from '@/app/lib/getAuth';
import { redirect } from 'next/navigation';
import Sidebar from '@/app/dashboard/sidebar';

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const auth = await getAuth();
    if (!auth) {
        redirect("/login");
    }
    const [token, role, user] = auth;

    return(
        <Sidebar role={role}>{children}</Sidebar>
    )
}
