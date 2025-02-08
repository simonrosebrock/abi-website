'use client'

import Link from 'next/link';
import Image from 'next/image';
import { deleteCookies } from '@/app/lib/setCookies';
import { usePathname } from 'next/navigation'

export default function Sidebar({children, user}: Readonly<{children: React.ReactNode, user: string}>) {
    
    const getButtonStatus = (button: string) => {
        if (button === "/dashboard" && pathname !== "/dashboard") {
            return 'btn-ghost text-abi-gray'
        }
        return pathname.includes(button) ? 'btn-primary text-white' : 'btn-ghost text-abi-gray'
    }

    const pathname = usePathname()
    
    return(
        <div className='h-[calc(100dvh-40px)] w-[calc(100dvw-40px)] bg-[#F9FAFB] m-5 rounded-xl flex lg:flex-row flex-col'>
            <div className="drawer block lg:hidden h-[60px] w-[calc(100vw-40px)] z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button p-[5px] h-[60px]">
                        <Image src={"/menu.png"} alt='menu' width={50} height={50}></Image>
                    </label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                        <div className='flex justify-center items-center pt-[40px] scale-75'>
                            <Image
                                src="/logo.png"
                                width={60}
                                height={60}
                                className="mr-5"
                                alt="LOGO"
                            />
                            <span className="text-abi-black text-5xl">ABI 25</span>
                        </div>
                        <li className='content-center'><Link href={"/dashboard"} className={`btn ${getButtonStatus("/dashboard")} mt-5 w-[170px] left content-start flex-col`}>Dashboard</Link></li>
                        {/* <li className='content-center'><Link href={"/dashboard/abimotto"} className={`btn ${getButtonStatus("/dashboard/abimotto")} mt-5 w-[170px] content-start flex-col`}>Abimotto</Link></li>
                        <li className='content-center'><Link href={"/dashboard/mottowoche"} className={`btn ${getButtonStatus("/dashboard/mottowoche")} mt-5 w-[170px] content-start flex-col`}>Mottowoche</Link></li> */}
                        <li className='content-center'><Link href={"/dashboard/termine"} className={`btn ${getButtonStatus("/dashboard/termine")} mt-5 w-[170px] content-start flex-col`}>Termine</Link></li>
                        <li className='content-center'><Link href={"/dashboard/finanzen"} className={`btn ${getButtonStatus("/dashboard/finanzen")} mt-5 w-[170px] content-start flex-col`}>Finanzen</Link></li>
                        {user === "admin" ? <></> : <li className='content-center'><Link href={"/dashboard/deinefotos?type=uploaded&page=1"} className={`btn ${getButtonStatus("/dashboard/deinefotos")} mt-5 w-[170px] content-start flex-col`}>Deine Fotos</Link></li> }
                        {user === "admin" ? <li className='content-center'><Link href={"/dashboard/fotoverifikation?student=all&page=1"} className={`btn ${getButtonStatus("/dashboard/fotoverifikation")} mt-5 w-[170px] content-start flex-col`}>Foto Verifikation</Link></li> : <></>}
                        <li className='content-center'><Link href={"/dashboard/allefotos?page=1"} className={`btn ${getButtonStatus("/dashboard/allefotos")} mt-5 w-[170px] content-start flex-col`}>Alle Fotos</Link></li>
                        <li className='content-center'>
                            <button onClick={e => deleteCookies()} className='btn btn-ghost mt-5 w-[170px] text-abi-gray content-start flex-col'>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.7747 22.2011L26.3371 16.8777C26.555 16.6292 26.6665 16.3154 26.6666 16C26.6667 15.7842 26.6147 15.5676 26.5091 15.3706C26.4621 15.2828 26.4047 15.1994 26.3371 15.1223L21.7747 9.79894C21.2955 9.23982 20.4538 9.17502 19.8947 9.65422C19.3356 10.1334 19.2708 10.9751 19.75 11.5343L22.4345 14.6666L12.1083 14.6666C11.3719 14.6666 10.775 15.2636 10.775 15.9999C10.775 16.7363 11.3719 17.3333 12.1083 17.3333L22.4347 17.3333L19.75 20.4658C19.2708 21.0249 19.3356 21.8666 19.8947 22.3458C20.4538 22.825 21.2955 22.7602 21.7747 22.2011ZM13.3333 7.99992C14.0697 7.99992 14.6666 8.59687 14.6666 9.33325L14.6666 11.3333C14.6666 12.0696 15.2636 12.6666 16 12.6666C16.7363 12.6666 17.3333 12.0696 17.3333 11.3333L17.3333 9.33325C17.3333 7.12411 15.5424 5.33325 13.3333 5.33325L9.33329 5.33325C7.12415 5.33325 5.33329 7.12411 5.33329 9.33325L5.33329 22.6666C5.33329 24.8757 7.12415 26.6666 9.33329 26.6666L13.3333 26.6666C15.5424 26.6666 17.3333 24.8757 17.3333 22.6666L17.3333 20.6666C17.3333 19.9302 16.7363 19.3333 16 19.3333C15.2636 19.3333 14.6666 19.9302 14.6666 20.6666L14.6666 22.6666C14.6666 23.403 14.0697 23.9999 13.3333 23.9999L9.33329 23.9999C8.59691 23.9999 7.99996 23.403 7.99996 22.6666L7.99996 9.33325C7.99996 8.59687 8.59691 7.99992 9.33329 7.99992L13.3333 7.99992Z" fill="#737791"/>
                                </svg>
                                Logout
                            </button>
                        </li>
                        <li className='content-center mt-auto mb-4'><Link href={"/passwordchange"} className={`btn btn-ghost text-abi-gray w-[170px] content-start flex-col ${user === "admin" ? "hidden" : "flex"}`}>Passwort öndern</Link></li>
                    </ul>
                </div>
            </div>
           
            <div className='h-full w-[256px] bg-white rounded-tl-lg rounded-bl-lg shadow-lg hidden lg:block '>
                <div className='flex flex-col h-full'>
                    <div className='flex justify-center items-center pt-[40px] scale-75'>
                        <Image
                            src="/logo.png"
                            width={60}
                            height={60}
                            className="mr-5"
                            alt="LOGO"
                        />
                        <span className="text-abi-black text-5xl">ABI 25</span>
                    </div>
                    <div className='flex grow flex-col items-center w-[256px]'>
                        <Link href={"/dashboard"} className={`btn ${getButtonStatus("/dashboard")} mt-5 w-[170px] left content-start flex-col`}>Dashboard</Link>
                        {/* <Link href={"/dashboard/abimotto"} className={`btn ${getButtonStatus("/dashboard/abimotto")} mt-5 w-[170px] content-start flex-col`}>Abimotto</Link>
                        <Link href={"/dashboard/mottowoche"} className={`btn ${getButtonStatus("/dashboard/mottowoche")} mt-5 w-[170px] content-start flex-col`}>Mottowoche</Link> */}
                        <Link href={"/dashboard/termine"} className={`btn ${getButtonStatus("/dashboard/termine")} mt-5 w-[170px] content-start flex-col`}>Termine</Link>
                        <Link href={"/dashboard/finanzen"} className={`btn ${getButtonStatus("/dashboard/finanzen")} mt-5 w-[170px] content-start flex-col`}>Finanzen</Link>
                        {user === "admin" ? <></> : <Link href={"/dashboard/deinefotos?type=uploaded&page=1"} className={`btn ${getButtonStatus("/dashboard/deinefotos")} mt-5 w-[170px] content-start flex-col`}>Deine Fotos</Link>}
                        {user === "admin" ? <Link href={"/dashboard/fotoverifikation?student=all&page=1"} className={`btn ${getButtonStatus("/dashboard/fotoverifikation")} mt-5 w-[170px] content-start flex-col`}>Foto Verifikation</Link> : <></>}
                        <Link href={"/dashboard/allefotos?page=1"} className={`btn ${getButtonStatus("/dashboard/allefotos")} mt-5 w-[170px] content-start flex-col`}>Alle Fotos</Link>
                        <button onClick={e => deleteCookies()} className='btn btn-ghost mt-5 w-[170px] text-abi-gray content-start flex-col'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.7747 22.2011L26.3371 16.8777C26.555 16.6292 26.6665 16.3154 26.6666 16C26.6667 15.7842 26.6147 15.5676 26.5091 15.3706C26.4621 15.2828 26.4047 15.1994 26.3371 15.1223L21.7747 9.79894C21.2955 9.23982 20.4538 9.17502 19.8947 9.65422C19.3356 10.1334 19.2708 10.9751 19.75 11.5343L22.4345 14.6666L12.1083 14.6666C11.3719 14.6666 10.775 15.2636 10.775 15.9999C10.775 16.7363 11.3719 17.3333 12.1083 17.3333L22.4347 17.3333L19.75 20.4658C19.2708 21.0249 19.3356 21.8666 19.8947 22.3458C20.4538 22.825 21.2955 22.7602 21.7747 22.2011ZM13.3333 7.99992C14.0697 7.99992 14.6666 8.59687 14.6666 9.33325L14.6666 11.3333C14.6666 12.0696 15.2636 12.6666 16 12.6666C16.7363 12.6666 17.3333 12.0696 17.3333 11.3333L17.3333 9.33325C17.3333 7.12411 15.5424 5.33325 13.3333 5.33325L9.33329 5.33325C7.12415 5.33325 5.33329 7.12411 5.33329 9.33325L5.33329 22.6666C5.33329 24.8757 7.12415 26.6666 9.33329 26.6666L13.3333 26.6666C15.5424 26.6666 17.3333 24.8757 17.3333 22.6666L17.3333 20.6666C17.3333 19.9302 16.7363 19.3333 16 19.3333C15.2636 19.3333 14.6666 19.9302 14.6666 20.6666L14.6666 22.6666C14.6666 23.403 14.0697 23.9999 13.3333 23.9999L9.33329 23.9999C8.59691 23.9999 7.99996 23.403 7.99996 22.6666L7.99996 9.33325C7.99996 8.59687 8.59691 7.99992 9.33329 7.99992L13.3333 7.99992Z" fill="#737791"/>
                            </svg>
                            Logout
                        </button>
                        <Link href={"/passwordchange"} className={`btn btn-ghost text-abi-gray mt-auto mb-10 w-[170px] content-start flex-col ${user === "admin" ? "hidden" : "flex"}`}>Passwort ändern</Link>
                    </div>
                </div>
                
            </div>
            <div className='block overflow-hidden grow'>{children}</div>
        </div>
        )
}