import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex items-center mt-10 relative">
        <div className="flex justify-center scale-[80%] sm:scale-100 absolute left-1/2 transform -translate-x-1/2">
          <span className="text-8xl text-abi-black">ABI 25</span>
          <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
        </div>
        <Link href={"/dashboard"} className="btn btn-primary w-64 h-20 text-3xl text-white ml-auto mr-10">Login</Link>
      </div>
    </>
  );
}
{/* <div className="flex flex-col items-center mt-20 sm:mt-40 sm:flex-row sm:justify-around space-y-4">
<Link href={"/abimotto"} className="btn bg-white text-abi-gray w-64 h-20 text-3xl">Abimotto</Link>
<Link href={"/mottowoche"} className="btn bg-white text-abi-gray w-64 h-20 text-3xl">Mottowoche</Link>
</div> */}