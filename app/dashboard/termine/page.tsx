
import { Appointment } from "@/app/ui/dashboard/Appointment";
import { getTermine } from "@/app/lib/getTermine";
import { QueryResultRow } from "@vercel/postgres";
import { getAuth } from "@/app/lib/getAuth";



const Termine = async() => {
    const termine: QueryResultRow = await getTermine();
    const [token, role, user] = await getAuth();


    return(
        <div className="grow flex flex-wrap gap-5 p-5 max-h-[calc(100vh-103px)] lg:max-h-[calc(100vh-40px)] overflow-auto scrollbar-none justify-center lg:justify-normal">
            {termine.map((termin: QueryResultRow, index: any) => (
                <Appointment key={index} title={termin.title} description={termin.description} ort={termin.ort} date={termin.date} start_time={termin.start_time} end_time={termin.end_time} persons={termin.helfer} user={user} />
            ))}
        </div>
    );
    
}

export default Termine;