'use server'
import { getAuth } from "@/app/lib/getAuth"
import AbiMottoDisplay from "@/app/ui/mottos/abiMottoDisplay"
import AbipulliDisplay from "@/app/ui/mottos/abipulliDisplay"
import MottoWocheDisplay from "@/app/ui/mottos/mottoWocheDisplay"
import EditAbimotto from "@/app/ui/mottos/editAbimotto"
import { getBlobList } from "@/app/lib/blobHandling"
import EditAbipulli from "@/app/ui/mottos/editAbipulli"
import { getAbimotto, getMottowoche } from "@/app/lib/dbConnection"
import EditMottowoche from "@/app/ui/mottos/editMottowoche"

const Mottos = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];

    const abimotto = await getAbimotto();
    const mottowoche = await getMottowoche();

    const blobList = await getBlobList();
    async function getBlobExists(name: string) {
        const blob = blobList.find(blob => blob.pathname.includes(name));
        return blob !== undefined;
    }

    async function getBlobUrl(name: string) {
        const blob = blobList.find(blob => blob.pathname.includes(name));
        return blob?.url ||'';
    }

    if (role === "user") {
        const abimottoUrl = await getBlobUrl("abimotto.webp");
        const abipulliFrontUrl = await getBlobUrl("abipulli_front.webp");
        const abipulliBackUrl = await getBlobUrl("abipulli_back.webp");

        const abimotto = await getAbimotto();
        const mottowocheImages = [await getBlobUrl("montag.webp"), await getBlobUrl("dienstag.webp"), await getBlobUrl("mittwoch.webp"), await getBlobUrl("donnerstag.webp"), await getBlobUrl("freitag.webp")]

        return(
            <div className="flex flex-col p-5 md:pt-5 pt-0 gap-5 overflow-auto max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] scrollbar-none">
                <AbiMottoDisplay image={abimottoUrl} zeile1={abimotto.title} zeile2={abimotto.addition}/>
                <MottoWocheDisplay mottos={mottowoche} mottoImages={mottowocheImages}/>
                <AbipulliDisplay frontUrl={abipulliFrontUrl} backUrl={abipulliBackUrl}/>
            </div>
        );
    }

    const abimottoExists = await getBlobExists("abimotto.webp")
    const abipulliFrontExits = await getBlobExists("abipulli_front.webp")
    const abipulliBackExits = await getBlobExists("abipulli_back.webp")

    const mottowocheExists = [await getBlobExists('montag.webp'), await getBlobExists('dienstag.webp'), await getBlobExists('mittwoch.webp'), await getBlobExists('donnerstag.webp'), await getBlobExists('freitag.webp')]

    return(
        <div className="flex flex-col p-5 md:pt-5 pt-0 gap-5 overflow-auto max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] scrollbar-none">
            <EditAbimotto token={token} exists={abimottoExists} zeile1={abimotto['title']} zeile2={abimotto.addition}/>
            <EditMottowoche token={token} mottowoche={mottowoche} exists={mottowocheExists}/>
            <EditAbipulli token={token} exists1={abipulliFrontExits} exists2={abipulliBackExits}/>
        </div>
    )
    
}



export default Mottos;