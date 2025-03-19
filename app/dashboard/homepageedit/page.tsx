'use server'
import { getAuth } from "@/app/lib/getAuth"

const HomePageEdit = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    if (user !== "admin") return <></>

    return(
        <></>
    );
}

export default HomePageEdit;