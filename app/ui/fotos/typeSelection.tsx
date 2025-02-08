'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function TypeSelection() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    
    const type = searchParams.get('type');

    return(
        <select className="select select-bordered flex font-semibold h-[50px] xs:h-[80px] w-[250px] xs:w-auto  text-lg border border-gray-200" onChange={(e) => {
            params.set('type', `${e.target.value}`);
            replace(`${pathname}?${params.toString()}`);
        }} value={(type as string)}>
            <option value="uploaded" className="font-semibold">Unverifizierte Bilder</option>
            <option value="verified" className="font-semibold">Verifizierte Bilder</option>
        </select> 
    );
}