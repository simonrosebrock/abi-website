import { v4 } from "uuid";

import { Appointment } from "@/app/ui/termine/Appointment";
import { NewAppointment } from "@/app/ui/termine/NewAppointment";
import { getTermine, getUsers } from "@/app/lib/dbConnection";
import { QueryResultRow } from "@vercel/postgres";
import { getAuth } from "@/app/lib/getAuth";
import { getCleanUser } from '@/app/lib/miniFuncs';


const Termine = async () => {
    const auth = await getAuth()
    if (!auth) {
        return(<></>)
    }
    const [token, role, user] = auth as [string, string, string];

    const termine:QueryResultRow = await getTermine();

    const setTermine: any = ""
    var users: string[] = await getUsers();

    return(
        <div className="grow flex flex-wrap gap-5 p-5 max-h-[calc(100dvh-103px)] lg:max-h-[calc(100dvh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            {
                role === "admin" ? <NewAppointment termine={termine} setTermine={setTermine} /> : <></>
            }
            {termine.map((termin: QueryResultRow, index: any) => {
                var id = v4();
                return (
                    <Appointment key={termin.id} id={id} termin_id={termin.id} title={termin.title} description={termin.description} ort={termin.ort} date={termin.date} start_time={termin.start_time} end_time={termin.end_time} persons={termin.helfer} user={user === "admin" ? user:getCleanUser(user)} users={users.map(user => getCleanUser(user))} />
                )
            } )}
            
        </div>
    );
}

export default Termine;

