'use server'
import { getUsersAdmin } from "@/app/lib/dbConnection";
import { getAuth } from "@/app/lib/getAuth";
import AccountList from "@/app/ui/accounts/accountList";
import AddAccount from "@/app/ui/accounts/addAccount";

const Accounts = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];
    const userList: {name: string, token: string}[] = await getUsersAdmin()
    if (role !== "admin") return <></>

    return(
        <div className="flex flex-col h-full p-5 md:pt-5 pt-0 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] gap-5">
            <AddAccount/>
            <AccountList userList={userList}/>
        </div>
    );
}

export default Accounts;