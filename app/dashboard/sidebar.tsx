'use server'

import Image from 'next/image';
import SidebarButtons from '../ui/sidebar/sidebarButtons';
import Link from 'next/link';


export default async function Sidebar({children, role}: Readonly<{children: React.ReactNode, role: string}>) {

    type Tab = {
        name: string;
        href: string;
        status: string;
        visibility: 0 | 1 | 2;
    };

    const tabs: Tab[] = [ // visibility, 0 = all, 1 = only users, 2 = only admins
        {name: "Dashboard", href: "/dashboard", status: "/dashboard", visibility: 0},
        {name: "Accounts", href: "/dashboard/accounts", status: "/dashboard/accounts", visibility: 2},
        {name: "Termine", href: "/dashboard/termine", status: "/dashboard/termine", visibility: 0},
        {name: "Mottos", href: "/dashboard/mottos", status: "/dashboard/mottos", visibility: 0},
        {name: "Finanzen", href: "/dashboard/finanzen", status: "/dashboard/finanzen", visibility: 0},
        {name: "Deine Fotos", href: "/dashboard/deinefotos?type=uploaded&page=1", status: "/dashboard/deinefotos", visibility: 1},
        {name: "Foto Verifikation", href: "/dashboard/fotoverifikation?student=all&page=1", status: "/dashboard/fotoverifikation", visibility: 2},
        {name: "Alle Fotos", href: "/dashboard/allefotos?page=1", status: "/dashboard/allefotos", visibility: 0},
        {name: "Homepage Edit", href: "/dashboard/homepageedit", status: "/dashboard/homepageedit", visibility: 2}
    ]


    const visibleTabs: Tab[] = []

    tabs.forEach((tab) => {
        if (tab.visibility === 0 || tab.visibility === 1 && role === "user" || tab.visibility === 2 && role === "admin") {
            visibleTabs.push(tab)
        }
    })
    
    

    
    
    return(
        <div className='h-[calc(100dvh-40px)] w-[calc(100dvw-40px)] bg-[#F9FAFB] m-5 rounded-xl flex lg:flex-row flex-col'>
            <div className="drawer block lg:hidden h-[60px] w-[calc(100vw-40px)] z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button p-[5px] h-[60px]">
                        <Image src={"/menu.png"} alt='menu' width={50} height={50}></Image>
                    </label>
                </div> 
                <div className="drawer-side overflow-auto">
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
                        <SidebarButtons tabs={visibleTabs} mode={0}/>
                        <li className='content-center mt-auto mb-4'>
                            <Link href={"/passwordchange"} className={`btn btn-ghost text-abi-gray w-[170px] content-start flex-col ${role === "admin" ? "hidden" : "flex"}`}>
                                Passwort ändern
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
           
            <div className='h-full w-[256px] bg-white rounded-tl-lg rounded-bl-lg shadow-lg hidden lg:block '>
                <div className='flex flex-col h-full overflow-auto'>
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
                        <SidebarButtons tabs={visibleTabs} mode={1}/>
                        <Link href={"/passwordchange"} className={`btn btn-ghost text-abi-gray mt-auto mb-10 w-[170px] content-start flex-col ${role === "admin" ? "hidden" : "flex"}`}>Passwort ändern</Link>
                    </div>
                </div>
                
            </div>
            <div className='block overflow-hidden grow'>{children}</div>
        </div>
        )
}