'use server'

import { getFileList, getFileCount } from "@/app/lib/imageHandling"; // getFile, 
import { getAuth } from "@/app/lib/getAuth";
import { redirect } from 'next/navigation';
import ImagePagination from "@/app/ui/fotos/imagePagination";
import UserImageEditing from "@/app/ui/fotos/userImageEditing";

type imageListType = string[]
const proxyUrl = process.env.PROXY_URL as string;

const DeineFotos = async ({ searchParams }: any) => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    if(role === "admin") {
        redirect("/dashboard/allefotos")
    }

    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const type = searchParams.type as string;

    
    if (!type || !['verified', 'uploaded', 'deleted'].includes(type)) {
        redirect(`/dashboard/deinefotos?type=uploaded&page=${page}`)
    }

    const cleanUser = (user as string).toLowerCase().replaceAll(" ", "_")

    const fileCount: number = (await getFileCount(type, cleanUser));
    const pageCount = Math.max(1, Math.ceil(fileCount/image_limit_per_page))
    

    if (!page) {
        redirect(`/dashboard/deinefotos?type=${type}&page=1`)
    } else if (page < 1) {
        redirect(`/dashboard/deinefotos?type=${type}&page=1`)
    } else if (page > pageCount) {
        redirect(`/dashboard/deinefotos?type=${type}&page=${pageCount}`)
    }

    const images: imageListType = (await getFileList(type, cleanUser, page, image_limit_per_page));

    return(
        <div className="flex flex-col h-full p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            <UserImageEditing images={images} token={token} proxyUrl={proxyUrl}/>
            { images.length == 0 ? 
                <></> : <div className="w-auto mt-5 flex">
                            <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount}/>
                        </div>
            }
            
        </div>
    );
}

export default DeineFotos;