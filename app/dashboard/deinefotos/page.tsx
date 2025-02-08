import UploadButton from "@/app/ui/fotos/uploadButton";
import TypeSelection from "@/app/ui/fotos/typeSelection";
import { getFileList, getVerifiedList, getFileCount } from "@/app/lib/imageHandling"; // getFile, 
import Image from "next/image";
import ImageList from "@/app/ui/fotos/imageList";
import { getAuth } from "@/app/lib/getAuth";
import { redirect } from 'next/navigation';
import ImagePagination from "@/app/ui/fotos/imagePagination";

type imageListType = string[]

const DeineFotos = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const [token, role, user] = await getAuth();
    if(user === "admin") {
        redirect("/dashboard/allefotos")
    }

    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const type = searchParams.type as string;

    
    if (!type || !['verified', 'uploaded'].includes(type)) {
        redirect(`/dashboard/deinefotos?type=uploaded&page=${page}`)
    }

    const cleanUser = user.replaceAll(" ", "_")

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
        <div className="flex flex-col h-full p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            <div className="flex w-auto gap-5 items-center mb-5 flex-wrap justify-center xs:justify-normal">
                <UploadButton user={cleanUser}/>
                <TypeSelection/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                <ImageList images={images}/>
            </div>
            { images.length == 0 ? 
                <></> : <div className="w-auto mt-5 flex">
                            <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount}/>
                        </div>
            }
            
        </div>
    );
}

export default DeineFotos;