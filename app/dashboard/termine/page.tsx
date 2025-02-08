// 'use client'
import { v4 } from "uuid";

import { Appointment } from "@/app/ui/termine/Appointment";
import { NewAppointment } from "@/app/ui/termine/NewAppointment";
import { getTermine, getUsers } from "@/app/lib/dbConnection";
import { QueryResultRow } from "@vercel/postgres";
import { getAuth } from "@/app/lib/getAuth";
// import { useState, useEffect } from "react";



const Termine = async () => {
    // const [loaded, setLoaded] = useState<boolean>(false) 

    //const [termine, setTermine] = useState<QueryResultRow>(await getTermine());
    // const [termine, setTermine] = useState<QueryResultRow>({});

    const termine:QueryResultRow = await getTermine();

    const setTermine: any = ""
    // const [token, setToken] = useState<string>("");
    // const [role, setRole] = useState<string>("");
    // const [user, setUser] = useState<string>("");

    // const [users, setUsers] = useState<string[]>([]);

    var [token, role, user] = await getAuth();
    var users: string[] = await getUsers();

    // useEffect(() => {
    //     console.log("hi")
    //     async function getData() {
    //         setTermine(await getTermine());
    //         var [token_temp, role_temp, user_temp] = await getAuth();
    //         setToken(token_temp);
    //         setRole(role_temp);
    //         setUser(user_temp);
    //         setUsers(await getUsers());
    //         setLoaded(true);
    //     }
    //     getData()
        
    // }, [])

    //console.log(termine);

    return(
        <div className="grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            {
                user === "admin" ? <NewAppointment termine={termine} setTermine={setTermine} /> : <></>
            }
            {termine.map((termin: QueryResultRow, index: any) => {
                var id = v4();
                return (
                    <Appointment key={termin.id} id={id} termin_id={termin.id} title={termin.title} description={termin.description} ort={termin.ort} date={termin.date} start_time={termin.start_time} end_time={termin.end_time} persons={termin.helfer} user={user} users={users} />
                )
            } )}
            
        </div>
    );

    // if (loaded) {
    //     return(
    //         <div className="grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
    //             {
    //                 user === "admin" ? <NewAppointment termine={termine} setTermine={setTermine} /> : <></>
    //             }
    //             {termine.map((termin: QueryResultRow, index: any) => (
    //                 <Appointment key={index} termin_id={termin.id} title={termin.title} description={termin.description} ort={termin.ort} date={termin.date} start_time={termin.start_time} end_time={termin.end_time} persons={termin.helfer} user={user} users={users} />
    //             ))}
                
    //         </div>
    //     );
    // }
    // return (
    //     <div className="grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //         <div className="skeleton w-[250px] h-[250px] rounded-lg"></div>
    //     </div>
    // );
    
    
}

export default Termine;

