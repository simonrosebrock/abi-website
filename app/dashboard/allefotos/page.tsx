import UploadButton from "@/app/ui/fotos/uploadButton";
import DownloadButton from "@/app/ui/fotos/downloadButton";
import {getVerifiedList, getVerifiedFileCount} from "@/app/lib/imageHandling"; // getFile, 
import ImageList from "@/app/ui/fotos/imageList";
import { getAuth } from "@/app/lib/getAuth";
import ImagePagination from "@/app/ui/fotos/imagePagination";
import { redirect } from 'next/navigation'
import StudentSelection from "@/app/ui/fotos/studentSelection";

type imageListType = string[]
const proxyUrl = process.env.PROXY_URL as string;

const AlleFotos = async ({ searchParams }: any) => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const student = searchParams.student as string;
    const fileCount: {[key: string]: number} = (await getVerifiedFileCount());

    const studentEntries = Object.keys(fileCount)

    if (!student || !studentEntries.includes(student)) {
        redirect(`/dashboard/allefotos?student=all&page=${page}`)
    } 


    const pageCount = Math.max(1, Math.ceil(fileCount[student]/image_limit_per_page))
    
    if (!page) {
        redirect(`/dashboard/allefotos?student=${student}&page=1`)
    } else if (page < 1) {
        redirect(`/dashboard/allefotos?student=${student}&page=1`)
    } else if (page > pageCount) {
        redirect(`/dashboard/allefotos?student=${student}&page=${pageCount}`)
    }

    const images: imageListType = (await getVerifiedList(student, page, image_limit_per_page));

    return(
        <div className="flex flex-col h-full p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            <div className="flex flex-wrap w-auto gap-5 items-center mb-5 xs:justify-normal justify-center">
                {role === "admin" ? <></> : <UploadButton token={token}/>}
                <StudentSelection  studentEntries={studentEntries} fileCount={fileCount}/>
                <DownloadButton token={token} proxyUrl={proxyUrl}/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                <ImageList images={images} token={token} proxyUrl={proxyUrl}/>
            </div>
            { images.length == 0 ? 
                <></> : <div className="w-auto flex mt-5">
                    <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount[student]}/>
                </div>
            }
        </div>
    );
}

export default AlleFotos;