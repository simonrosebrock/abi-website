'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { deleteCookies } from '@/app/lib/setCookies';

type Tab = {
    name: string;
    href: string;
    status: string;
    visibility: 0 | 1 | 2;
};

export default function SidebarButtons({tabs, mode}: {tabs: Tab[], mode: 0 | 1}) {
    const pathname = usePathname()

    const getButtonStatus = (button: string) => {
        if (button === "/dashboard" && pathname !== "/dashboard") {
            return 'btn-ghost text-abi-gray'
        }
        return pathname.includes(button) ? 'btn-primary text-white' : 'btn-ghost text-abi-gray'
    }

    return(
        <>
            {
                tabs.map((tab) => {
                    if (mode === 0) {
                        return(
                            <li className='content-center' key={`mobile-tab-${tab.href}`}>
                                <Link href={tab.href} className={`btn ${getButtonStatus(tab.status)} mt-5 w-[170px] left content-start flex-col`}>
                                    {tab.name}
                                </Link>
                            </li> 
                        );
                    } else if (mode === 1) {
                        return(
                            <Link href={tab.href} className={`btn ${getButtonStatus(tab.status)} mt-5 w-[170px] left content-start flex-col`} key={`desktop-tab-${tab.href}`}>
                                {tab.name}
                            </Link>
                        )
                    }
                    
                })
            }
            { mode === 1 ?
                <>
                    <button onClick={e => deleteCookies()} className='btn btn-ghost mt-5 w-[170px] text-abi-gray content-start flex-col'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.7747 22.2011L26.3371 16.8777C26.555 16.6292 26.6665 16.3154 26.6666 16C26.6667 15.7842 26.6147 15.5676 26.5091 15.3706C26.4621 15.2828 26.4047 15.1994 26.3371 15.1223L21.7747 9.79894C21.2955 9.23982 20.4538 9.17502 19.8947 9.65422C19.3356 10.1334 19.2708 10.9751 19.75 11.5343L22.4345 14.6666L12.1083 14.6666C11.3719 14.6666 10.775 15.2636 10.775 15.9999C10.775 16.7363 11.3719 17.3333 12.1083 17.3333L22.4347 17.3333L19.75 20.4658C19.2708 21.0249 19.3356 21.8666 19.8947 22.3458C20.4538 22.825 21.2955 22.7602 21.7747 22.2011ZM13.3333 7.99992C14.0697 7.99992 14.6666 8.59687 14.6666 9.33325L14.6666 11.3333C14.6666 12.0696 15.2636 12.6666 16 12.6666C16.7363 12.6666 17.3333 12.0696 17.3333 11.3333L17.3333 9.33325C17.3333 7.12411 15.5424 5.33325 13.3333 5.33325L9.33329 5.33325C7.12415 5.33325 5.33329 7.12411 5.33329 9.33325L5.33329 22.6666C5.33329 24.8757 7.12415 26.6666 9.33329 26.6666L13.3333 26.6666C15.5424 26.6666 17.3333 24.8757 17.3333 22.6666L17.3333 20.6666C17.3333 19.9302 16.7363 19.3333 16 19.3333C15.2636 19.3333 14.6666 19.9302 14.6666 20.6666L14.6666 22.6666C14.6666 23.403 14.0697 23.9999 13.3333 23.9999L9.33329 23.9999C8.59691 23.9999 7.99996 23.403 7.99996 22.6666L7.99996 9.33325C7.99996 8.59687 8.59691 7.99992 9.33329 7.99992L13.3333 7.99992Z" fill="#737791"/>
                        </svg>
                        Logout
                    </button>
                    
                </> :
                <>
                    <li className='content-center'>
                        <button onClick={e => deleteCookies()} className='btn btn-ghost mt-5 w-[170px] text-abi-gray content-start flex-col'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.7747 22.2011L26.3371 16.8777C26.555 16.6292 26.6665 16.3154 26.6666 16C26.6667 15.7842 26.6147 15.5676 26.5091 15.3706C26.4621 15.2828 26.4047 15.1994 26.3371 15.1223L21.7747 9.79894C21.2955 9.23982 20.4538 9.17502 19.8947 9.65422C19.3356 10.1334 19.2708 10.9751 19.75 11.5343L22.4345 14.6666L12.1083 14.6666C11.3719 14.6666 10.775 15.2636 10.775 15.9999C10.775 16.7363 11.3719 17.3333 12.1083 17.3333L22.4347 17.3333L19.75 20.4658C19.2708 21.0249 19.3356 21.8666 19.8947 22.3458C20.4538 22.825 21.2955 22.7602 21.7747 22.2011ZM13.3333 7.99992C14.0697 7.99992 14.6666 8.59687 14.6666 9.33325L14.6666 11.3333C14.6666 12.0696 15.2636 12.6666 16 12.6666C16.7363 12.6666 17.3333 12.0696 17.3333 11.3333L17.3333 9.33325C17.3333 7.12411 15.5424 5.33325 13.3333 5.33325L9.33329 5.33325C7.12415 5.33325 5.33329 7.12411 5.33329 9.33325L5.33329 22.6666C5.33329 24.8757 7.12415 26.6666 9.33329 26.6666L13.3333 26.6666C15.5424 26.6666 17.3333 24.8757 17.3333 22.6666L17.3333 20.6666C17.3333 19.9302 16.7363 19.3333 16 19.3333C15.2636 19.3333 14.6666 19.9302 14.6666 20.6666L14.6666 22.6666C14.6666 23.403 14.0697 23.9999 13.3333 23.9999L9.33329 23.9999C8.59691 23.9999 7.99996 23.403 7.99996 22.6666L7.99996 9.33325C7.99996 8.59687 8.59691 7.99992 9.33329 7.99992L13.3333 7.99992Z" fill="#737791"/>
                            </svg>
                            Logout
                        </button>
                    </li>
                    
                </>
            }
            
        </>
    )
}