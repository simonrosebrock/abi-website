import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <div className="wrapper">
      <div className="flex justify-center mt-10 scale-[80%] sm:scale-100">
        <span className="text-8xl text-abi-black">ABI 25</span>
        <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
      </div>
      <div className="flex flex-col items-center mt-20 sm:mt-40 sm:flex-row sm:justify-around space-y-4">
        <Link href={"/abimotto"} className="btn bg-white text-abi-gray w-64 h-20 text-3xl">Abimotto</Link>
        <Link href={"/mottowoche"} className="btn bg-white text-abi-gray w-64 h-20 text-3xl">Mottowoche</Link>
      </div>
      <div className="flex mt-40 justify-center">
        <Link href={"/dashboard"} className="btn btn-primary w-64 h-20 text-3xl text-white">Dashboard</Link>
      </div>
    </div>
    </>
  );
}
