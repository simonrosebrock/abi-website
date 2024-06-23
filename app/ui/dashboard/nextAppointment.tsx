'use client';

import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import { getDateString } from '@/app/lib/miniFuncs';
import { getClosestTermin } from '@/app/lib/dbConnection';

type Personen = {
    [key: string]: string[];
};

type AppointmentProps = {
    title: string;
    ort: string;
    date: Date;
    start_time: string;
    end_time: string;
    persons: Personen;
};

export function NextAppointment({title, ort, date, start_time, end_time, persons}: AppointmentProps) {
    const [days, setDays] = useState<number>()
    const [hours, setHours] = useState<number>()
    const [minutes, setMinutes] = useState<number>()
    const [seconds, setSeconds] = useState<number>()

    start_time = start_time.slice(0, -3);
    end_time = end_time.slice(0, -3);

    var gruppen = Object.keys(persons)

    useEffect(() => {
        var intervalId = setInterval(() => {
            var countDownDate = new Date(date).getTime();
            var now = new Date().getTime();
            var distance = countDownDate - now;

            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
            
            if (distance < 0) {
                clearInterval(intervalId);
            }
        }, 1000)
    }, [])

    return(
        <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-lg p-2 flex flex-col">
                <h3 className="text-[#05004E] text-xl">Nächster Termin</h3>
                
                <div className='h-[206px] flex'>
                    <div className='flex flex-col'>
                        <h4 className="text-abi-gray text-md">{title}</h4>
                        <span className="text-abi-gray text-md">{ort}</span>
                        <div className='mt-auto mb-auto'>
                            {
                                gruppen.map((gruppe, index) => (
                                    <div key={`${gruppe}-${index}`} className="w-[165px] text-abi-gray text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                        <span className="text-red-500">•</span>
                                        <span>{` ${persons[gruppe].join(", ")}`}</span>
                                    </div>
                                ))
                            }
                        </div>
                        
                        <span className="text-abi-gray text-md">{getDateString(date)}</span>
                        <span className="text-abi-gray text-md">{`${start_time} - ${end_time} Uhr`}</span>
                    </div>
                    
                    <div className="grid grid-flow-row gap-5 text-center auto-cols-max scale-50 w-[70px] origin-top-right float-right z-0 ml-auto">
                        <div className="flex flex-col p-2 bg-[#dcfce7] rounded-box text-abi-black">
                            <span className="countdown font-mono text-5xl">
                            <span style={{"--value":days} as CSSProperties}></span>
                            </span>
                            days
                        </div> 
                        <div className="flex flex-col p-2 bg-[#DCFCE7] rounded-box text-abi-black">
                            <span className="countdown font-mono text-5xl">
                            <span style={{"--value":hours} as CSSProperties}></span>
                            </span>
                            hours
                        </div> 
                        <div className="flex flex-col p-2 bg-[#DCFCE7] rounded-box text-abi-black">
                            <span className="countdown font-mono text-5xl">
                            <span style={{"--value":minutes} as CSSProperties}></span>
                            </span>
                            min
                        </div> 
                        <div className="flex flex-col p-2 bg-[#DCFCE7] rounded-box text-abi-black">
                            <span className="countdown font-mono text-5xl">
                            <span style={{"--value":seconds} as CSSProperties}></span>
                            </span>
                            sec
                        </div>
                    </div>
            </div>

        </div>
    );
}