'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function TypeSelection({setSelectedImages}: {setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    
    const type = searchParams.get('type');

    return(
        <select className="select select-bordered flex font-sans font-bold text-xl h-[50px] xs:h-[80px] w-[125px] xs:w-auto border border-gray-200 lg:mr-auto" onChange={(e) => {
            params.set('type', `${e.target.value}`);
            params.set('page', '1' );
            replace(`${pathname}?${params.toString()}`);
            setSelectedImages([])
        }} value={(type as string)}>
            <option value="uploaded">Unverifizierte Bilder</option>
            <option value="verified">Verifizierte Bilder</option>
            <option value="deleted">Gelöschte Bilder</option>
        </select> 
    );
}