'use client'
import Link from 'next/link';
import { updateAccountPassword } from '@/app/lib/dbConnection';
import { useRouter } from 'next/navigation';
import { getCleanUser } from '../lib/miniFuncs';
import { useState } from 'react';

export function InputField({token, user}: {token: string, user: string}) {
    const [info, setInfo] = useState<string>("");
    const router = useRouter();
    const cleanUser = getCleanUser(user);

    return(
        <form action={async (formData: FormData) => {
            const password = (formData.get('password') as string).trim();
            const passwordConfirmed = (formData.get('password-confirmed') as string).trim();
            if (password === "" || password == null || passwordConfirmed === "" || passwordConfirmed == null) {
                setInfo("Bitte fülle alle Felder aus!");
                return;
            }
            if (password.length > 255 || passwordConfirmed.length > 255) {
                setInfo("Das Passwort ist zu lang!");
                return;
            }
            if (password !== passwordConfirmed) {
                setInfo("Die Passwörter stimmen nicht überein!");
                return;
            }
            updateAccountPassword(token as string, password as string);
            router.push("/dashboard");
        }}> 
            <div className='flex flex-col items-center gap-5 p-5 xs:p-10'>
                <div className='flex justify-center text-2xl text-gray-400 gap-2'>
                    <span>{`Account:`}</span>
                    <span className='text-gray-600'>{cleanUser}</span>
                </div>
                <span className='text-center text-red-500'>{info}</span>
                <label className="input input-bordered flex items-center w-full">
                    <input type="text" name='password' placeholder="Neues Passwort" className="grow"/>
                </label>
                <label className="input input-bordered flex items-center w-full">
                    <input type="text" name='password-confirmed' placeholder="Passwort bestätigen" className="grow"/>
                </label>
            </div>
            
            <div className='flex justify-around mr-6 ml-6 sm:mr-40 sm:ml-40 mb-10'>
                <Link href={"/dashboard"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                <input type='submit' value='Weiter ->' className='btn btn-primary text-white' />
            </div>
        </form>
    )
}