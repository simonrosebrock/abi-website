'use server'

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAuth } from '@/app/lib/getAuth';
import { InputField } from '@/app/passwordchange/inputField';

export default async function PasswordChange() {
    const [token, role, user] = await getAuth();

    if (user === "admin") {
        redirect("/dashboard")
    }

    return(
        <div className='max-h-screen overflow-auto scrollbar-none'>
            <div className="flex justify-center mt-10 scale-75 sm:scale-100">
                <span className="text-8xl text-abi-black">ABI 25</span>
                <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
            </div>
            <div className="flex justify-center mt-10 sm:mt-20">
                <div className="bg-[#FAFBFC] w-3/4 md:w-[600px] rounded-xl max-h-[80vh] overflow-y-auto scrollbar-none">
                    <div className='flex justify-center items-center mt-10'>
                        <Image
                            src="/logo.png"
                            width={100}
                            height={100}
                            className="sm:mr-5 sm:scale-100 scale-75"
                            alt="LOGO"
                        />
                        <span className="text-abi-black text-5xl">Passwort ändern</span>
                    </div>
                    <InputField token={String(token.value)} user={String(user)}/>
                </div>
            </div>
        </div>
    );
}