'use server'

import { getAuth } from '@/app/lib/getAuth';
import { redirect } from 'next/navigation';
import Sidebar from '@/app/dashboard/sidebar';
import { getFeatures } from '../lib/dbConnection';

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const auth = await getAuth();
    if (!auth) {
        redirect("/login");
    }
    const [token, role, user] = auth;
    const features = await getFeatures("general");

    return(
        <Sidebar role={role} features={features}>{children}</Sidebar>
    )
}
