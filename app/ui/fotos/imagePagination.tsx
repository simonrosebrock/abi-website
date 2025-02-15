'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ImagePagination({image_limit_per_page, fileCount}: {image_limit_per_page: number, fileCount: number}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const page = searchParams.get('page')

    const pageNumber = parseInt((page as string), 10)

    
    const pageCount = Math.max(1, Math.ceil(fileCount/image_limit_per_page))

    const resultPageMin = (pageNumber - 1) * image_limit_per_page + 1;
    const resultPageMax = Math.min(pageNumber * image_limit_per_page, fileCount);

    return(
        <div className='relative w-full flex justify-center items-center'>
            <span className="absolute left-0 invisible sm:visible">{`Result: ${resultPageMin}-${resultPageMax} of ${fileCount}`}</span>
            <span className="absolute left-0 invisible xs:visible sm:invisible">{`${resultPageMin}-${resultPageMax} of ${fileCount}`}</span>
            <div className="join">
                <button className="join-item btn btn-outline border-gray-300 hover:btn-primary" onClick={() => {
                    params.set('page', "1");
                    replace(`${pathname}?${params.toString()}`);
                }}>««</button>
                <button className="join-item btn btn-outline border-gray-300 hover:btn-primary" onClick={() => {
                    if (pageNumber > 1) {
                        const newPage = pageNumber - 1;
                        params.set('page', `${newPage}`);
                        replace(`${pathname}?${params.toString()}`);
                    }
                }}>«</button>
                <button className="join-item btn btn-outline border-gray-300 hover:btn-primary">{`Page ${page}`}</button>
                <button className="join-item btn btn-outline border-gray-300 hover:btn-primary" onClick={() => {
                    if (pageNumber < pageCount) {
                        const newPage = pageNumber + 1;
                        params.set('page', `${newPage}`);
                        replace(`${pathname}?${params.toString()}`);
                    }
                }}>»</button>
                <button className="join-item btn btn-outline border-gray-300 hover:btn-primary"onClick={() => {
                    params.set('page', `${pageCount}`);
                    replace(`${pathname}?${params.toString()}`);
                }}>»»</button>
            </div>
        </div>
    );
}