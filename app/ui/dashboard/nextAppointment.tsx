'use client';

import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';


export function NextAppointment() {  //{ header }: { header: string }
    const [days, setDays] = useState<number>()
    const [hours, setHours] = useState<number>()
    const [minutes, setMinutes] = useState<number>()
    const [seconds, setSeconds] = useState<number>()

    useEffect(() => {
        var intervalId = setInterval(() => {
            var countDownDate = new Date("Jul 15, 2024 08:00:00").getTime();
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
                <span className="text-[#05004E] text-xl">Nächster Termin</span>
                
                <div className='h-[206px] flex'>
                    <div className='flex flex-col'>
                        <span className="text-abi-gray text-md">Waffelverkauf Decathlon</span>
                        <span className="text-abi-gray text-md mt-auto">Mo, 15 Jul 2024</span>
                        <span className="text-abi-gray text-md">08:00 - 10:00 Uhr</span>
                    </div>
                    
                    <div className="grid grid-flow-row gap-5 text-center auto-cols-max scale-50 w-[70px] origin-top-right float-right">
                        <div className="flex flex-col p-2 bg-[#DCFCE7] rounded-box text-abi-black">
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