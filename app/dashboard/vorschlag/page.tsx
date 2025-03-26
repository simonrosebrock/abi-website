'use server'
import { getVorschlaege } from "@/app/lib/dbConnection";
import { getAuth } from "@/app/lib/getAuth";
import AddKategorie from "@/app/ui/vorschlag/addKategorie";
import KategorieView from "@/app/ui/vorschlag/kategorieView";

type Kategorie = {
    kategorie_id: string,
    kategorie_name: string,
    kategorie_enabled: boolean,
    'vorschläge': {
        id: string,
        likes: string[],
        author: string,
        vorschlag: string
    }[]
}

const Vorschlag = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];

    const vorschlaege: Kategorie[] = await getVorschlaege() as Kategorie[];
    return(
        <div className="flex flex-col h-full p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] gap-5">
            {
                 role === "admin" ? <div className="w-full"><AddKategorie/></div> : <></>
            }
            <div className="flex grow gap-4 overflow-auto flex-wrap">
                {
                    vorschlaege.map((element, index) => {
                            if (element.kategorie_enabled || role === "admin") {
                                return(
                                    <KategorieView key={element.kategorie_id} kategorie={element} username={user} token={token}/>
                                )
                            }
                            
                    })
                }
            </div>
        </div>
    );
}

export default Vorschlag;