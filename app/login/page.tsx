import Image from 'next/image';
import Link from 'next/link';
import { setCookies } from '../lib/setCookies';


export default function login() {
    return(
        <>
            <div className="flex justify-center mt-10 scale-75 sm:scale-100">
                <span className="text-8xl text-abi-black">ABI 25</span>
                <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
            </div>
            <div className="flex justify-center mt-10 sm:mt-20">
                <form action={setCookies} className="bg-[#FAFBFC] w-3/4 md:w-[600px] rounded-xl">
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
                    
                    <label className="input input-bordered flex items-center m-10 sm:mt-20">
                        <input type="text" name='username' placeholder="Username" className="grow"/>
                    </label>
                    <label className="input input-bordered flex items-center m-10">
                        <input type="text" name='password' placeholder="Password" className="grow"/>
                    </label>
                    <div className='flex justify-around mr-6 ml-6 sm:mr-40 sm:ml-40 mb-10'>
                        <Link href={"/"} className='btn btn-primary text-white'>{"<- Zurück"}</Link>
                        <input type='submit' value='Weiter ->' className='btn btn-primary text-white' />
                    </div>
                    
                </form>
            </div>
            
            {/* <div className="flex">
                <div className="bg-white h-2/3 mt-20 w-80"></div>
            </div> */}
            
        </>
    );
}