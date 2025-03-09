import { getCleanUser } from "@/app/lib/miniFuncs";
import EditAccount from "./editAccount";
import DeleteAccount from "./deleteAccount";


export default function AccountList({userList}: {userList: {name: string, token: string}[]}) {


    return(
        <div className="flex flex-col max-w-[600px] bg-white rounded-2xl overflow-auto h-auto">
            {
                userList.map((user, index) => (
                    <div className={`flex items-center pl-2 pr-2 min-h-[50px] w-full ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`} key={user.name}>
                        <span className="text-abi-black">
                            {
                                getCleanUser(user.name)
                            }
                        </span>
                        <div className="flex gap-2 ml-auto">
                            <EditAccount account={user.name} token={user.token}/>
                            <DeleteAccount account={user.name} token={user.token}/>
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}