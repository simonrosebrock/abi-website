'use client'
import Link from 'next/link';
import { changePassword } from '@/app/lib/dbConnection';
import { useRouter } from 'next/navigation';

export function InputField({token, user}: {token: string, user: string}) {
    const router = useRouter();

    return(
        <div>
            <div className='sm:mt-10'>
            <label className="input input-bordered flex items-center m-10">
                <input type="text" name='username' placeholder="Username" className="grow" value={user} readOnly/>
            </label>
            <label className="input input-bordered flex items-center m-10">
                <input id='password_field' type="text" name='password' placeholder="Password" className="grow"/>
            </label>
            </div>
            
            <div className='flex justify-around mr-6 ml-6 sm:mr-40 sm:ml-40 mb-10'>
                <Link href={"/dashboard"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                <button className='btn btn-primary text-white' onClick={() => {
                    const password = (document.getElementById('password_field') as HTMLInputElement).value;
                    changePassword(token as string, password as string);
                    router.push("/dashboard");
                }}>{"Weiter ->"}</button>
            </div>
        </div>
    )
}