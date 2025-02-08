// import StudentSelection from "@/app/ui/fotos/studentSelection";

// import DeleteButton from "@/app/ui/fotos/deleteButton";
// import VerifyButton from "@/app/ui/fotos/verifyButton";
// import ZipButton from "@/app/ui/fotos/zipButton";
// import ImageListSelection from "@/app/ui/fotos/imageListSelection";
import ImagePagination from "@/app/ui/fotos/imagePagination";
import { getAuth } from "@/app/lib/getAuth";
import { redirect } from 'next/navigation';
import { getFileCountAdmin, getFileList } from "@/app/lib/imageHandling";
import ImageEditing from "@/app/ui/fotos/imageEditing";


type imageListType = string[]
const FotoVerifikation = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const [token, role, user] = await getAuth();
    if (user !== "admin") return <></>

    const image_limit_per_page = 20;

    const page = parseInt((searchParams.page as string), 10);
    const student = searchParams.student as string;

    const fileCount = await getFileCountAdmin("uploaded");
    const studentEntries = Object.keys(fileCount)

    if (!student || !studentEntries.includes(student)) {
        redirect(`/dashboard/fotoverifikation?student=all&page=${page}`)
    } 
    
    const pageCount = Math.max(1, Math.ceil(fileCount/image_limit_per_page))
    

    if (!page) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=1`)
    } else if (page < 1) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=1`)
    } else if (page > pageCount) {
        redirect(`/dashboard/fotoverifikation?student=${student}&page=${pageCount}`)
    }

    const images: imageListType = (await getFileList("uploaded", student, page, image_limit_per_page));

    return(
        <div className="flex flex-col h-full p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)]">
            {/* <div className="flex flex-wrap w-auto gap-5 items-center mb-5 justify-center sm:justify-normal">
                <StudentSelection studentEntries={studentEntries} fileCount={fileCount}/>
                <DeleteButton/>
                <VerifyButton/>
                <ZipButton/>
            </div>
            <div className="flex-grow overflow-auto flex flex-wrap gap-5 justify-center lg:justify-normal scrollbar-none">
                <ImageListSelection images={images}/>
            </div> */}
            <ImageEditing images={images} studentEntries={studentEntries} fileCount={fileCount}/>
            { images.length == 0 ? 
                <></> : <div className="w-auto mt-5 flex">
                            <ImagePagination image_limit_per_page={image_limit_per_page} fileCount={fileCount.all}/>
                        </div>
            }
        </div>
    );
}

export default FotoVerifikation;