'use client'


import Image from 'next/image';
import Link from 'next/link';
import { setCookies } from '../lib/setCookies';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (formData: FormData) => {
        setCookies(formData).then((response) => {
                if(response) {
                    setMessage(response.message); 
                    setSuccess(response.success)
                    if (response.success) {
                        router.push('/dashboard')
                    }
                }
            }
        );
      };

    return(
        <>
        <div className='max-h-screen overflow-auto scrollbar-none'>
            <div className="flex justify-center mt-10 scale-75 sm:scale-100">
                <span className="text-8xl text-abi-black">ABI 25</span>
                <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
            </div>
            <div className="flex justify-center mt-10 sm:mt-20">
                <form action={handleSubmit} className="bg-[#FAFBFC] w-3/4 md:w-[600px] rounded-xl max-h-[80vh] overflow-y-auto scrollbar-none">
                    <div className='flex justify-center items-center mt-10'>
                        <Image
                            src="/logo.png"
                            width={100}
                            height={100}
                            className="sm:mr-5 sm:scale-100 scale-75"
                            alt="LOGO"
                        />
                        <span className="text-abi-black text-5xl">LOGIN</span>
                    </div>
                    
                    <div className='sm:mt-10'>
                        <div className='flex justify-center'>
                            <span className={`${success ? "text-green-600" : "text-red-600"}`}>{message}</span>
                        </div>
                        
                        <label className="input input-bordered flex items-center m-10">
                            <input type="text" name='username' placeholder="Username" className="grow"/>
                        </label>
                        <label className="input input-bordered flex items-center m-10">
                            <input type="text" name='password' placeholder="Password" className="grow"/>
                        </label>
                    </div>
                    
                    <div className='flex justify-around mr-6 ml-6 sm:mr-40 sm:ml-40 mb-10'>
                        <Link href={"/"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                        <input type='submit' value='Weiter ->' className='btn btn-primary text-white' />
                    </div>
                    
                </form>
            </div>
        </div>
            
            
            {/* <div className="flex">
                <div className="bg-white h-2/3 mt-20 w-80"></div>
            </div> */}
            
        </>
    );
}