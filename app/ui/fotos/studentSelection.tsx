'use client'

import { getPrettyStudent } from '@/app/lib/miniFuncs';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function StudentSelection({studentEntries, fileCount}: {studentEntries: string[], fileCount: {[key: string]: number}}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    
    const student = searchParams.get('student');

    const newStudentEntries = studentEntries.slice(0, -1);
    const prettyStudentEntries = newStudentEntries.map(student =>
        student = getPrettyStudent(student)
    );
    

    return(
        <select className="select select-bordered flex font-semibold w-[125px] h-[50px] xs:w-auto xs:h-[80px] text-lg border border-gray-200 " onChange={(e) => {
            params.set('student', `${e.target.value}`);
            params.set('page', '1' )
            replace(`${pathname}?${params.toString()}`);
        }} value={(student as string)}>
            <option value="all" className="font-semibold">{"Alle Bilder | " + fileCount.all}</option>
            {
                newStudentEntries.map((student, index) => (
                    <option value={student} className="font-semibold" key={student}>{`${prettyStudentEntries[index]} | ${fileCount[student]}`}</option>
                ))
            }
            
        </select> 
    );
}