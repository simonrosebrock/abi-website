'use client'
import Link from 'next/link';
import { updateAccountPassword } from '@/app/lib/dbConnection';
import { useRouter } from 'next/navigation';
import { getCleanUser } from '../lib/miniFuncs';

export function InputField({token, user}: {token: string, user: string}) {
    const router = useRouter();
    const cleanUser = getCleanUser(user);

    return(
        <form action={async (formData: FormData) => {
            const password = (formData.get('password') as string).trim();
            if (password === "" || password == null || password.length > 255) {
                return
            }
            updateAccountPassword(token as string, password as string);
            router.push("/dashboard");
        }}> 
            <div className='sm:mt-10'>
                <div className='flex justify-center text-2xl text-gray-400 gap-2'>
                    <span>{`Account:`}</span>
                    <span className='text-gray-600'>{cleanUser}</span>
                </div>
                <label className="input input-bordered flex items-center m-10">
                    <input type="text" name='password' placeholder="New Password" className="grow"/>
                </label>
            </div>
            
            <div className='flex justify-around mr-6 ml-6 sm:mr-40 sm:ml-40 mb-10'>
                <Link href={"/dashboard"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                <input type='submit' value='Weiter ->' className='btn btn-primary text-white' />
            </div>
        </form>
    )
}