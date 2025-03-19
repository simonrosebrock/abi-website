'use client'
import Image from "next/image"
import { toCapitalized } from "@/app/lib/miniFuncs"

type Motto = {type: string, title: string, addition: string, date: string}

export default function MottoWocheDisplay({mottos, mottoImages}: {mottos: Motto[], mottoImages: string[]}) {
  return(
    <div className="carousel carousel-center gap-4 w-auto flex p-4 min-h-40">
      {
        mottos.map((motto, index) => (
          <MottoCard key={`${motto}-${index}`} day={toCapitalized(motto.type)} motto={motto.title} date={motto.date} additions={motto.addition} image={mottoImages[index]}/>
        ))
      }
        {/* <MottoCard day="Montag" motto="Nationalitäten" date="07.04.25" additions="" image="/Nationalitäten.jpg"/>
        <MottoCard day="Dienstag" motto="Gruppenkostüme" date="08.04.25" additions="" image="/Gruppenkostüme.jpg"/>
        <MottoCard day="Mittwoch" motto="Filme/Serien/ Videospiele" date="09.04.25" additions="Everything but a Backpack" image="/FilmSerieVideospiele.png"/>
        <MottoCard day="Donnerstag" motto="Kindheitshelden" date="10.04.25" additions="" image="/Kindheitshelden.jpg"/>
        <MottoCard day="Freitag" motto="Mafia" date="11.04.25" additions="Chaos Tag und Aula Programm" image="/Mafia.jpg"/> */}
      <NoMottoCard date={mottos[0].date}/>
    </div>
  )
}

export function MottoCard({day, motto, date, additions, image}: {day: string, motto: string, date: string, additions: string, image: string}) {
  const now = new Date().setHours(0,0,0,0);
  const splitDate = date.split(".");
  const mottoDate = new Date(`20${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`).setHours(0,0,0,0);

 if (now < mottoDate) {
  return(<></>);
 }

  return(
    <div className="carousel-item w-[234px] h-[334px] bg-white rounded-box flex flex-col items-center p-4 overflow-hidden border-black border-2">
        <h1 className="text-2xl font-mono text-abi-black flex justify-center">{day}</h1>
        <div className="border-2 border-gray-300 rounded-md w-[200px] h-[150px] mt-4 flex items-center">
          <Image src={image} alt="image" width={200} height={150} className="w-full h-full object-cover rounded-md"></Image>
        </div>
        <h2 className="text-3xl font-bold text-abi-black flex justify-center text-center mt-4">{motto}</h2>
        { additions === "" ? <></> : 
        <div className="relative">
          <span className="text-4xl font-bold text-red-500 absolute rotate-[0.6rad]"
          style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.4), 0 0 10px rgba(255, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.1)' }}>&</span>
          <h2 className="text-red-600 font-bold text-xl text-balance ml-10"
          style={{ textShadow: '0 0 5px rgba(255, 0, 0, 0.4), 0 0 10px rgba(255, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.1)' }}>{additions}</h2>
        </div>
        }
        <span className="absolute right-4 bottom-3 text-gray-500 text-sm">{date}</span>
    </div>
  )
}

export function NoMottoCard({date}: {date: string}) {
  const now = new Date().setHours(0,0,0,0);
  const splitDate = date.split(".");
  const firstDay = new Date(`20${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`).setHours(0,0,0,0);
  if (now >= firstDay) {
    return(<></>);
  }
  return(
      <span className="-rotate-12 font-bold text-sky-400 mt-10">Geheim bis es soweit ist!</span>
  )
}