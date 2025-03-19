'use client'


import Image from 'next/image';
import Link from 'next/link';
import { setCookies } from '@/app/lib/setCookies';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const eyeClosed = (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className='min-w-[24px]'> 
        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" /> 
        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" /> 
        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" /> 
        <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" /> 
    </svg>
)

const eyeOpened = (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className='min-w-[24px]'> 
    <path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z" /> 
    <path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" /> 
    </svg>
)

export default function Login() {
    const router = useRouter()
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [nachnameRequired, setNachnameRequired] = useState<boolean>(true);


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
        <div className='max-h-screen overflow-y-auto scrollbar-none'>
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
                        
                        <div className='flex m-5 xs:m-10 gap-5'>
                            <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                                <input type="text" name='vorname' placeholder="Vorname" required onChange={(e) => {
                                    if (e.target.value === "admin") {
                                        setNachnameRequired(false)
                                    } else if (!nachnameRequired) {
                                        setNachnameRequired(true)
                                    }
                                }}/>
                            </label>
                            <label className="input input-bordered flex items-center w-[calc(50%-10px)]">
                                <input type="text" name='nachname' placeholder="Nachname" required={nachnameRequired}/>
                            </label>
                        </div>
                        <label className="input input-bordered flex items-center m-5 xs:m-10">
                            <input type={visible ? "text":"password"} name='password' placeholder="Password" className="grow w-full" required/>
                            <button className='w-6' onClick={(e) => {
                                e.preventDefault();
                                setVisible(prev => !prev);
                            }}>
                                {visible ? eyeOpened : eyeClosed}
                            </button>
                        </label>
                    </div>
                    
                    <div className='flex justify-between mx-5 xs:mx-10 mb-10'>
                        <Link href={"/"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                        <input type='submit' value='Weiter ->' className='btn btn-primary text-white'/>
                    </div>
                </form>
            </div>
        </div>
    );
}