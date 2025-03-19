import ImagePagination from "@/app/ui/fotos/imagePagination";
import { getAuth } from "@/app/lib/getAuth";
import { redirect } from 'next/navigation';
import { getAllDeletedFileList, getFileCountAdmin, getFileList } from "@/app/lib/imageHandling";
import ImageEditing from "@/app/ui/fotos/imageEditing";


type FileCount = {
    'uploaded': { [key: string]: number },
    'verified': { [key: string]: number },
    'deleted': { [key: string]: number },
}
type imageListType = string[]

const adminToken = process.env.ADMIN_TOKEN as string;

const FotoVerifikation = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    if (user !== "admin") return <></>

    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const student = searchParams.student as string;
    const type = searchParams.type as 'uploaded' | 'verified' | 'deleted';

    if (!type || !['verified', 'uploaded', 'deleted'].includes(type)) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=${page}&type=uploaded`)
    }

    const fileCount = {
        'uploaded': await getFileCountAdmin("uploaded") ,
        'verified': await getFileCountAdmin("verified"),
        'deleted': await getFileCountAdmin("deleted"),
    } as FileCount;
    
    const studentEntries = Object.keys(fileCount[type as 'uploaded' | 'verified' | 'deleted'])

    if (!student || !studentEntries.includes(student)) {
        redirect(`/dashboard/fotoverifikation?student=all&page=${page}&type=${type}`)
    } 

    
    const pageCount = Math.max(1, Math.ceil(fileCount[type][student]/image_limit_per_page))
    

    if (!page) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=1&type=${type}`)
    } else if (page < 1) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=1&type=${type}`)
    } else if (page > pageCount) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=${pageCount}&type=${type}`)
    }

    const images: imageListType = (await getFileList(type, student, page, image_limit_per_page));
    const deletedImages: imageListType = (await getAllDeletedFileList())

    return(
        <div className="flex flex-col h-full p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            <ImageEditing images={images} deletedImages={deletedImages} token={adminToken} studentEntries={studentEntries} fileCount={fileCount[type]}/>
            { images.length == 0 ? 
                <></> : <div className="w-auto mt-5 flex">
                            <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount[type][student]}/>
                        </div>
            }
        </div>
    );
}

export default FotoVerifikation;