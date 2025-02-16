import UploadButton from "@/app/ui/fotos/uploadButton";
import DownloadButton from "@/app/ui/fotos/downloadButton";
import {getVerifiedList, getFileCount } from "@/app/lib/imageHandling"; // getFile, 
import ImageList from "@/app/ui/fotos/imageList";
import { getAuth } from "@/app/lib/getAuth";
import ImagePagination from "@/app/ui/fotos/imagePagination";
import { redirect } from 'next/navigation'

type imageListType = string[]

const AlleFotos = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const [token, role, user] = await getAuth();
    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const fileCount: number = (await getFileCount("verified", "all"));
    const pageCount = Math.max(1, Math.ceil(fileCount/image_limit_per_page))
    
    if (!page) {
        redirect("/dashboard/allefotos?page=1")
    } else if (page < 1) {
        redirect("/dashboard/allefotos?page=1")
    } else if (page > pageCount) {
        redirect(`/dashboard/allefotos?page=${pageCount}`)
    }

    const images: imageListType = (await getVerifiedList(page, image_limit_per_page));
    


    return(
        <div className="flex flex-col h-full p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            <div className="flex flex-wrap w-auto gap-5 items-center mb-5 xs:justify-normal justify-center">
                {user === "admin" ? <></> : <UploadButton token={token}/>}
                <DownloadButton token={token}/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                <ImageList images={images} token={token}/>
            </div>
            { images.length == 0 ? 
                <></> : <div className="w-auto flex mt-5">
                    <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount}/>
                </div>
            }
        </div>
    );
}

export default AlleFotos;