
import { Appointment } from "@/app/ui/dashboard/Appointment";
import { getTermine } from "@/app/lib/getTermine";
import { QueryResultRow } from "@vercel/postgres";


const Termine = async() => {
    const termine: QueryResultRow = await getTermine();
    console.log(termine[0]);
    return(
        <>
            {termine.map((termin: QueryResultRow, index: any) => (
                <Appointment key={index} title={termin.title} description={termin.description} ort={termin.ort} date={termin.date} start_time={termin.start_time} end_time={termin.end_time} personen={["Simon", "Marek", "David"]} />
            ))}
        </>
        
    );
    
}

export default Termine;